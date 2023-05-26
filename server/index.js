import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import { users, posts } from "./data/index.js";

import { Server } from 'socket.io';

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({origin: process.env.WEBSITE_DOMAIN}));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// socket io
import http from 'http';

const server = http.Server(app);
const io = new Server(server, {
  cors: {
    origin: process.env.WEBSITE_DOMAIN // Replace "*" with the appropriate origin URL, my website domain
  }
});

const MESSAGES_TO_KEEP=20; // the number of messages we're keeping on server, not persistant. 
const messagesBuffer = [];

io.on('connection', (socket) => {
  console.log('A user connected.');
  for (let i = 0; i < messagesBuffer.length; i++ ) {
    io.to(socket.id).emit('message', messagesBuffer[i]);
  }

  // Handle incoming chat messages
  socket.on('message', (message) => {
    console.log('Received message:', message);
    
    io.emit('message', message); // Broadcast the message to all connected clients

    if(messagesBuffer.length >= MESSAGES_TO_KEEP)
      messagesBuffer.shift();
    messagesBuffer.push(message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });
});


/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));

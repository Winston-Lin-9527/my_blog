import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Grid, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import io from 'socket.io-client';
import { useTheme } from '@emotion/react';
import SendIcon from '@mui/icons-material/Send'

var socket = null;

function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const scrollRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    socket = io(process.env.REACT_APP_SERVER_URL);
    // Listen for incoming chat messages
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      // Clean up the socket connection when the component unmounts
      socket.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   // Scroll to the bottom of the list when messages change
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  //   }
  // }, [messages]);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [])

  const handleSendMessage = () => {
    if (messageInput.length > 0) {
      const date = new Date();
      // new Date(updatedAt).toLocaleString('en-GB', { second: 'numeric', minute: 'numeric', hour: 'numeric', day: 'numeric', month: 'long', year: 'numeric' })
      socket.emit('message', `(${date.toLocaleString()}) Guest: ${messageInput}`);
      setMessageInput('');
    }
  };

  return (
    <Box
      style={{
        // overflow: 'auto',
        // maxHeight: '10rem',
        // height: '10rem',
        // width: '30%'
        // border: '1px solid #ccc',
      }}
      width='30%'
    >
      <h3>Leave a message</h3>
      <div
        style={{
          overflow: 'auto',
          border: '1px solid #ccc',
          backgroundColor: theme.palette.neutral.light,
          borderRadius: "1rem",
          padding: "0.5rem",
          maxHeight: '10rem',
          height: '10rem',
        }}
        ref={scrollRef}
      >
        {messages.map((message, index) => (
          // <Paper elevation={9} style={{margin: '3px'}}>
          <Typography key={index}>
            {message}
          </Typography>
          // {/* </Paper> */}
        ))}
      </div>
      <Grid container direction='row' marginTop='0.1rem' spacing={1} alignItems="center" columns={10}>
        <Grid item xs={8}>
          <TextField
            label="Type a message"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter')
                handleSendMessage();
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <Button onClick={handleSendMessage} variant="contained">
            Send
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChatWidget;


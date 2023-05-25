// import { Typography } from "@mui/material";
// import { Box, typography } from "@mui/system";

// const IntroBanner = () => {
//     return (
//         <>
//           <Box sx={{ border: 1, m: 5, p: 5}}>
//             <Typography fontSize={20}>
//               Hi this is Winston Lin's blog, i may write some things on here occasionally
//             </Typography>
//           </Box>
//         </>
//     )
// }

// export default IntroBanner;

import React, { useState } from 'react';
import { Avatar, Typography, Box, Button, IconButton, Tooltip } from '@mui/material';
import { Navigate, Link } from 'react-router-dom';
import PopUp from './Popup/Popup';
import { Twitter, GitHub, LinkedIn } from '@mui/icons-material';


const IntroBanner = ({ name, title, description }) => {

  // controls if popup displays
  const [popUp, setPopUp] = useState(false)

  return (
    <>
      <Box display="flex" alignItems="start" justifyContent="start">
        <Avatar src={process.env.PUBLIC_URL + 'assets/myavatar.png'} alt={name} sx={{ width: 80, height: 80, marginRight: 2 }} />
        <Box>
          <Typography variant="h6" component="div">
            {name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {title}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {description}
          </Typography>
          <Box pt='0.5rem' display="flex" justifyContent="flex-start" gap="1rem">
            {/* <img width={25} height={25} src={process.env.PUBLIC_URL + "/assets/twitter.png"} alt="image" />
            <img width={25} height={25} src={process.env.PUBLIC_URL + "/assets/linkedin.png"} alt="image" /> */}
            <Tooltip title="Github">
              <IconButton
                component="a"
                href="https://github.com/Winston-Lin-9527"
                target="_blank">
                <GitHub sx={{ fontSize: "25px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Linkedin">
              <IconButton
                component="a"
                href="https://www.linkedin.com/in/winston-l-82992a23b"
                target="_blank"
              >
                <LinkedIn sx={{ fontSize: "25px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Twitter">
              <IconButton>
                <Twitter sx={{ fontSize: "25px" }} />
              </IconButton>
            </Tooltip>
            <Button
              // component="a"
              // href="https://www.google.com"
              // target="_blank"
              variant='outlined'
              color="primary"
              onClick={() => setPopUp(true)}
            >
              My resume
            </Button>
          </Box>
        </Box>
      </Box>
      {popUp && <PopUp setPopUp={setPopUp} />}
    </>
  );
};

export default IntroBanner;

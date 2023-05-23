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

import React from 'react';
import { Avatar, Typography, Box } from '@mui/material';

const IntroBanner = ({ name, title, description }) => {
  return (
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
        <img src={process.env.PUBLIC_URL + "/assets/twitter.png"} alt="image" />
        <img src={process.env.PUBLIC_URL + "/assets/linkedin.png"} alt="image" />
      </Box>
    </Box>
  );
};

export default IntroBanner;

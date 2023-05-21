import { Typography } from "@mui/material";
import { Box, typography } from "@mui/system";

const IntroBanner = () => {
    return (
        <>
          <Box sx={{ border: 1, m: 5, p: 5}}>
            <Typography fontSize={20}>
              Hi this is Winston Lin's blog, i may write some things on here occasionally
            </Typography>
          </Box>
        </>
    )
}

export default IntroBanner;
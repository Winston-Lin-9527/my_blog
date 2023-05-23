import React from 'react';
// styling
import './Popup.css';
import { Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// images

const PopUp = ({ setPopUp }) => {
  // function that takes boolean as param to conditionally display popup

  return (
    <div className="PopUp">
      {/* x close window */}
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          variant='contained'
          color="primary"
          className="popup-x"
          onClick={() => setPopUp(false)}
          style={{
            borderRadius: '1em'
          }}
        >
          <CloseIcon />
        </Button>
      </Box>
      <object data="http://africau.edu/images/default/sample.pdf" type="application/pdf" width="100%" height="100%">
        <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>
      </object>
      <div className="pu-content-container">
        {/* <h1>Add more bones?</h1> */}
        {/* <object data="http://africau.edu/images/default/sample.pdf" type="application/pdf" width="100%" height="100%">
                    <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>
                </object> */}
      </div>
      {/* button controls */}
      {/* <div className="pu-button-container">
                <button onClick={()=> setPopUp(false)}> MORE BONES! </button>
                <button onClick={()=> setPopUp(false)}> No, thank you. </button>
            </div> */}
    </div>
  );
}

export default PopUp;
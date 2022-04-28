import React, { MutableRefObject, useRef } from "react";
import Slider from '@mui/material/Slider';
import ZoomAdd from  '@mui/icons-material/Add';
import ZoomMinus from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';




interface IProps {
    waveformRef : MutableRefObject<null>
}


const AudioSample : React.FC<IProps> = ({waveformRef}) => {

    return (
        <>
        <div ref={waveformRef} style={{
            width: "150vh",
            height: "100vh",
            margin: "200px auto 0 auto",
            maxWidth: "100%"
          }}  >
          </div>  

          <Button>Hello</Button>

        

         

          
        
        </>
        
    );
};

export default AudioSample;
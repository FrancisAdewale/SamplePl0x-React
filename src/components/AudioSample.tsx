import React, { MutableRefObject, useRef, useState } from "react";
import ZoomAdd from  '@mui/icons-material/Add';
import ZoomMinus from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';




interface IProps {
    waveformRef : MutableRefObject<null>
    handleChange : (e: React.MouseEvent<HTMLButtonElement>, newVal: number | number[]) => void
    handleSampling: (e: React.MouseEventHandler<HTMLButtonElement>) => void
}


const AudioSample : React.FC<IProps> = ({waveformRef, handleChange, handleSampling}) => {


    return (
        
        <div ref={waveformRef} style={{
            width: "150vh",
            height: "100vh",
            margin: "200px auto 0 auto",
            maxWidth: "100%"
          }}  >
              
              {
                  waveformRef.current &&

                   <Slider 
                    size="small"
                    spacing={2}
                    sx={{
                        width: "300px",
                        color: 'black',
                        margin: "0px auto",
                        display: "flex",
                    }}
                    onChange={handleChange}
                    onChangeCommitted={handleChange}
                   
                />

              }

              {waveformRef.current && <Button onClick={handleSampling}>Sample Audio</Button>}
               


          </div>  

          
        

         

          
        
       
        
    );
};

export default AudioSample;
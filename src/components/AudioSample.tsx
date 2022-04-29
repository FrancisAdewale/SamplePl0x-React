import React, { MutableRefObject, useRef, useState } from "react";
import ZoomAdd from  '@mui/icons-material/Add';
import ZoomMinus from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';




interface IProps {
    waveformRef : MutableRefObject<null>
    handleChange : (e: React.MouseEvent<HTMLButtonElement>, newVal: number | number[]) => void
}


const AudioSample : React.FC<IProps> = ({waveformRef, handleChange}) => {

    const [value, setValue] = useState(0)

    // const handleChange = (event: Event, newValue: number | number[]) => {
    //     setValue(newValue as number);
    //   };

    //   const handleChangeCommit = (event: Event, newValue: number | number[]) => {
    //       console.
    //     // setValue(newValue as number);
    //   };

    
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
               


          </div>  

          
        

         

          
        
       
        
    );
};

export default AudioSample;
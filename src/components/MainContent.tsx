import React, { useRef, useState } from "react";
import sampleImg from "../imgs/sample.png";

interface IProps {
    updateSong : (arg: string | ArrayBuffer | null | undefined) => void
}

const MainContent : React.FC<IProps> = ({updateSong}) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const [chosenSongData, setChosenSongData] = useState<string | ArrayBuffer | null | undefined>("")

    const handleCapture = (event : React.ChangeEvent<HTMLInputElement>) : void => {

        if (event.target.files && event.target.files[0]) {
                let reader = new FileReader();
                reader.onload = (e) => {
  
                const data = e.target!.result;
                setChosenSongData(data);
                updateSong(data)

                };
                
                reader.readAsDataURL(event.target.files[0]);
              }


    }

    
    const handleClick = () : void => {
        if (inputRef && inputRef.current) {

            inputRef.current.click();
            
        }
    }

    return (
        <main>
            <img src={sampleImg} className="sample-img" onClick={handleClick}/>
            <input type="file" ref={inputRef} style={{display: "none"}} onChange={handleCapture}/>
            <h1>Upload song to sample</h1>
        </main>
    );
}

export default MainContent;
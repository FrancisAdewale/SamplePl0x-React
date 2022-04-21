import React, { useRef } from "react";
import sampleImg from "../imgs/sample.png";

interface IProps {
    song : ""
}

const MainContent : React.FC<IProps> = ({song}) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const handleCapture = (event : React.ChangeEvent<HTMLInputElement>) : void => {

        if (event.target.files && event.target.files[0]) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    console.log(e.target?.result)
                    
                };
                reader.readAsDataURL(event.target.files[0]);
              }
        



    }
    const handleClick = () : void => {
        if (inputRef && inputRef.current) {
            console.log(inputRef.current.click());
        }
    }

    return (
        <main>
            <img src={sampleImg} className="sample-img" onClick={handleClick}/>
            <input type="file" ref={inputRef} style={{display: "none"}} onChange={(e) => handleCapture(e)}/>
            <h1>Upload song to sample</h1>
        </main>
    );
}

export default MainContent;
import React from "react";
import sampleImg from "../imgs/sample.png";

const MainContent = () => {
    return (
        <main>
            <img src={sampleImg} className="sample-img"/>
            <h1>Upload song to sample</h1>
        </main>
    );
}

export default MainContent;
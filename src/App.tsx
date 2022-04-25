import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import MainContent from './components/MainContent';
import useSound from 'use-sound';





const App: React.FC = () => {

  var audioCtx = new (window.AudioContext)();
  var source = audioCtx.createBufferSource();
  var dest = audioCtx.createMediaStreamDestination();
  var mediaRecorder = new MediaRecorder(dest.stream);

  
  


  const [song, setSong] = useState<string | ArrayBuffer | null | undefined>(null)

  const updateSong = (newSong: string | ArrayBuffer | null | undefined):void => {
    setSong(newSong)
  


    // audioCtx.decodeAudioData(song as ArrayBuffer, buffer => {
    //   source.buffer = buffer;
    //   source.connect(dest);
    //   mediaRecorder.start();
    //   source.start(audioCtx.currentTime, 3);
    // }, e => {
    //   console.log(`error with decoding: ${e}`)
    // })
}

useEffect(() => {
   var request = new XMLHttpRequest();

    request.open('GET', song as string, true);

    request.responseType = 'arraybuffer';

    request.onload = function() {
      var audioData = request.response;
  
      audioCtx.decodeAudioData(audioData, function(buffer) {
          source.buffer = buffer;
  
          source.connect(audioCtx.destination);
          source.loop = true;
          source.start()
        },
  
        function(e){ console.log("Error with decoding audio data" + e); });
  
    }

    request.send();
  console.log(song)
}, [song]);



  return (
    <div className='app-container'>
      <Header />
      <MainContent updateSong={updateSong}/>
    </div>
  )
}

export default App;

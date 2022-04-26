import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import MainContent from './components/MainContent';
import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from 'wavesurfer.js/src/plugin/timeline';


const App: React.FC = () => {

  const [uploadSong, setUploadedSong] = useState(false)

  var audioCtx = new (window.AudioContext)();
  var source = audioCtx.createBufferSource();
  var dest = audioCtx.createMediaStreamDestination();
  var mediaRecorder = new MediaRecorder(dest.stream);

  const [song, setSong] = useState<string | ArrayBuffer | null | undefined>(null)
  const [songUploaded, setSongUploaded] = useState<boolean>(false)

  const updateSong = (newSong: string | ArrayBuffer | null | undefined):void => {
    setSong(newSong)
    setUploadedSong(true)


}

useEffect(() => {
   var request = new XMLHttpRequest();
   
    request.open('GET', song as string, true);

    request.responseType = 'arraybuffer';

    request.onload = function() {
      var audioData = request.response;
  
      audioCtx.decodeAudioData(audioData, function(buffer) {
          source.buffer = buffer;

          var wavesurfer = WaveSurfer.create({
            container: '#waveform',
            waveColor: '#14213D',
            progressColor: '#FCA311',
            cursorColor: "red",
            cursorWidth: 4,
            plugins : [
              TimelinePlugin.create({
                container: '#wave-timeline',
            }),

            ]
           
         
        });
        
        wavesurfer.load(song as string);

        wavesurfer.on('ready', function () {
         
      });
  
        },
  
        function(e){ console.log("Error with decoding audio data" + e); });
  
    }

    request.send();
  console.log(song)
}, [song]);

console.log(uploadSong)



  return (
    <div className='app-container'>
      <Header />

      {
      uploadSong

      ?

        <div id='waveform' style={{
          width: "150vh",
          height: "100vh",
          margin: "200px auto 0 auto"
        }}></div>
      
      :

      <MainContent updateSong={updateSong}/> 

      

      }

      <div id='wave-timeline' style={{
          width: "150vh",
          margin: "0 auto"
        }}></div>
    </div>
  )
}

export default App;

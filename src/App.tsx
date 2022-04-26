import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import MainContent from './components/MainContent';
import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';




const App: React.FC = () => {

  const [uploadSong, setUploadedSong] = useState(false)

  var audioCtx = new (window.AudioContext)();
  var source = audioCtx.createBufferSource();
  var dest = audioCtx.createMediaStreamDestination();
  var mediaRecorder = new MediaRecorder(dest.stream);

  const [wavesurferObj, setWaveSurferObj] = useState<WaveSurfer | null>();


  const [song, setSong] = useState<string | ArrayBuffer | null | undefined>(null)
  const [songUploaded, setSongUploaded] = useState<boolean>(false)

  const updateSong = (newSong: string | ArrayBuffer | null | undefined):void => {
    setSong(newSong)
    setUploadedSong(true)


}

useEffect(() => {
          setWaveSurferObj(WaveSurfer.create({
            container: '#waveform',
            waveColor: '#14213D',
            progressColor: '#FCA311',
            responsive: true,
            plugins : [
            RegionsPlugin.create({
              dragSelection: {
                slop: 3,
                
            }
              
            })

            ]
           
         
        }));

        wavesurferObj?.regions.enableDragSelection({})

      
        
        wavesurferObj?.init()
        
        wavesurferObj?.load(song as string);

        wavesurferObj?.on('ready', () => {
         
      });

      wavesurferObj?.on('region-dblclick', () => {

        wavesurferObj?.regions.clear()

      });
  
   

}, []);




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

import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import MainContent from './components/MainContent';
import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
import { on } from 'stream';




const App: React.FC = () => {

  const [uploadSong, setUploadedSong] = useState(false);
  const waveformRef = useRef(null);
  const [wavesurferObj, setWaveSurferObj] = useState<WaveSurfer>();
  const [song, setSong] = useState<string | ArrayBuffer | null | undefined>(null);
  const [songUploaded, setSongUploaded] = useState<boolean>(false);
  const [duration, setDuration] = useState(0); 

  const updateSong = (newSong: string | ArrayBuffer | null | undefined):void => {
    setSong(newSong)
    setUploadedSong(true)

}

useEffect(() => {

  if(waveformRef.current) {

    setWaveSurferObj(WaveSurfer.create({
      container: waveformRef.current,
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
    }))
  }
}, [song]);

useEffect(() => {
  wavesurferObj?.init();
  wavesurferObj?.load(song as string);
  wavesurferObj?.regions.enableDragSelection({})
  wavesurferObj?.on('ready', () => {      
  });

  wavesurferObj?.on('region-dblclick', region => {
   region.remove()
   
});

wavesurferObj?.on('region-created', region => {
  const regions = region.wavesurfer.regions.list;
  console.log(regions);


})

}, [wavesurferObj]);




  return (
    <div className='app-container'>
      <Header />

      {
      uploadSong
      ?
        <div ref={waveformRef} style={{
          width: "150vh",
          height: "100vh",
          margin: "200px auto 0 auto"
        }} ></div>
      :
      <MainContent updateSong={updateSong}/> 
      }
    </div>
  )
}

export default App;

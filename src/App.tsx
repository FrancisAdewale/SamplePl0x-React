import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import MainContent from './components/MainContent';
import AudioSample from './components/AudioSample';
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
  const [duration, setDuration] = useState<number>(0); 
  const [zoom, setZoom] = useState<number>(0); 


  const updateSong = (newSong: string | ArrayBuffer | null | undefined):void => {
    setSong(newSong);
    setUploadedSong(true);
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
  wavesurferObj?.on('loading', (X) => {
    console.log(X);

  })

  wavesurferObj?.load(song as string);
  wavesurferObj?.regions.enableDragSelection({});
  wavesurferObj?.on('ready', () => { 
    setDuration(Math.floor(wavesurferObj?.getDuration()));
    console.log(wavesurferObj?.getDuration());
  });


  wavesurferObj?.getDuration()

  wavesurferObj?.on('region-dblclick', region => {
   region.remove();
   
});


}, [wavesurferObj]);

useEffect(() => {
   wavesurferObj?.zoom(zoom);
}, [zoom, wavesurferObj]);

const updateZoom = (e: React.MouseEvent<HTMLButtonElement>, newVal: number | number[]) => {
  console.log(newVal as number);
  setZoom(newVal as number);

}

  return (
    <div className='app-container'>
      <Header />

      {
      uploadSong
      ?
      
        <AudioSample waveformRef={waveformRef} handleChange={updateZoom}/>
        
      :
      <MainContent updateSong={updateSong}/> 
      }

    </div>
  )
}

export default App;

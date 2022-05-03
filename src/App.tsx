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
};

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


  wavesurferObj?.getDuration();

  wavesurferObj?.on('region-dblclick', region => {
   region.remove();
   
});

 wavesurferObj?.on('region-updated', (region) => {
                const regions = region.wavesurfer.regions.list;
                const keys = Object.keys(regions);
                if (keys.length > 1) {
                    regions[keys[0]].remove();
                }
            });


}, [wavesurferObj]);

useEffect(() => {
   wavesurferObj?.zoom(zoom);
}, [zoom, wavesurferObj]);

useEffect(() => {
  if (duration && wavesurferObj) {
      //default length
      wavesurferObj.addRegion({
          start: Math.floor(duration / 2) - Math.floor(duration) / 5, 
          end: Math.floor(duration / 2), 
          color: 'hsla(0, 0%, 0%, 0.6)' 
      });
  }
}, [duration, wavesurferObj]);



const updateZoom = (e: React.MouseEvent<HTMLButtonElement>, newVal: number | number[]) => {
  console.log(newVal as number);
  setZoom(newVal as number);

};


const sampleAudio = (e: React.MouseEventHandler<HTMLButtonElement>) => {
  if (wavesurferObj) {

    console.log("Audio Button Clicked");
      // get start and end points of the selected region
      const region =
          wavesurferObj.regions.list[
              Object.keys(wavesurferObj.regions.list)[0]
          ];

      if (region) {
          const start = region.start;
          const end = region.end;

          // obtain the original array of the audio
          // const original_buffer = wavesurferObj.backend.buffer;

          // // create a temporary new buffer array with the same length, sample rate and no of channels as the original audio
          // const new_buffer = wavesurferObj.backend.ac.createBuffer(
          //     original_buffer.numberOfChannels,
          //     original_buffer.length,
          //     original_buffer.sampleRate
          // );

          // // create 2 indices:
          // // left & right to the part to be trimmed
          // const first_list_index = start * original_buffer.sampleRate;
          // const second_list_index = end * original_buffer.sampleRate;
          // const second_list_mem_alloc =
          //     original_buffer.length - end * original_buffer.sampleRate;

          // // create a new array upto the region to be trimmed
          // const new_list = new Float32Array(parseInt(first_list_index));

          // // create a new array of region after the trimmed region
          // const second_list = new Float32Array(
          //     parseInt(second_list_mem_alloc)
          // );

          // // create an array to combine the 2 parts
          // const combined = new Float32Array(original_buffer.length);

          // // 2 channels: 1-right, 0-left
          // // copy the buffer values for the 2 regions from the original buffer

          // // for the region to the left of the trimmed section
          // original_buffer.copyFromChannel(new_list, 1);
          // original_buffer.copyFromChannel(new_list, 0);

          // // for the region to the right of the trimmed section
          // original_buffer.copyFromChannel(
          //     second_list,
          //     1,
          //     second_list_index
          // );
          // original_buffer.copyFromChannel(
          //     second_list,
          //     0,
          //     second_list_index
          // );

          // // create the combined buffer for the trimmed audio
          // combined.set(new_list);
          // combined.set(second_list, first_list_index);

          // // copy the combined array to the new_buffer
          // new_buffer.copyToChannel(combined, 1);
          // new_buffer.copyToChannel(combined, 0);

          // // load the new_buffer, to restart the wavesurfer's waveform display

          // wavesurferObj.loadDecodedBuffer(new_buffer);
          
          // const blob = new Blob([new_buffer], {type: "audio/wav"});
          // const href = URL.createObjectURL(blob)
          
          // const a = Object.assign(document.createElement("a"), {href, style: "display:none",  download:"Demo.mp3"});
          
          // document.body.appendChild(a)
          
          // a.click()
          // URL.revokeObjectURL(href)
          // a.remove();
      }
  }
};  

  return (
    <div className='app-container'>
      <Header />

      {
      uploadSong
      ?
      
        <AudioSample waveformRef={waveformRef} handleChange={updateZoom} handleSampling={sampleAudio}/>
        
      :
      <MainContent updateSong={updateSong}/> 
      }

    </div>
  )
}

export default App;

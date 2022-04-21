import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import MainContent from './components/MainContent';

interface IState {
  songUrl : ""
}

const [song, setSong] = useState<IState>()



function App() {



  return (
    <div className='app-container'>
      <Header />
      <MainContent song={song} setSong={setSong} />
    </div>
  )
}

export default App;

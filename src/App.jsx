import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import './App.css'
import MainMap from './Map';

function App() {
  
    return (
      <APIProvider apiKey={"API KEY HERE"}>
          <MainMap/>
      </APIProvider>
    );
}

export default App

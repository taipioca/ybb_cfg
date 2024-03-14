import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import './App.css'
import MapPage from './MapPage'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

function App() {
  
    return (
      <APIProvider apiKey={""}>

          <MapPage/>

      </APIProvider>
    );
}

export default App

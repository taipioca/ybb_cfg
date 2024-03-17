import React, { useEffect, useState } from "react"
import {Map, useMapsLibrary, useMap} from '@vis.gl/react-google-maps';
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import getLocations from "../utilites";
import SingleMarker from "./SingleMarker";
import { DeckGlOverlay } from "./Overlay";
import { BitmapLayer } from '@deck.gl/layers';
const MainMap = () => {
    const layer = new BitmapLayer({
        id: 'bitmap-layer',
        bounds: [-71.1605, 42.242689, -71.003461 , 42.3489],
        image: '../public/redliningmap.png'
      });
    useEffect(()=>{
        getLocations().then((response)=>{setLocations(response)})
    },[])
    const [locations, setLocations] = useState(false);
    let markers;
    if (locations){
        markers = locations.map((location, key)=>{
            return(
            <SingleMarker key={key} location={location}/>
            )
        })
    }
    return(
    <div className='mappy'>
        <Map
        mapId={'828c076a50ba3ed0'}
        defaultCenter={{lat: 42.3601, lng: -71.0589}}
        defaultZoom={11}
        gestureHandling={'greedy'}
        disableD
        disableDefaultUI
        >
        {/* <DeckGlOverlay layers={[layer]} /> */}
        {markers}
        </Map>
    </div>)
    }

export default MainMap;
import React, { useEffect, useState } from "react"
import {AdvancedMarker, InfoWindow, Map, Marker, useMarkerRef} from '@vis.gl/react-google-maps';
import getLocations from "../utilites";

const MainMap = () => {
    useEffect(()=>{
        getLocations().then((response)=>{setLocations(response)})
    },[])
    const [markerRef, marker] = useMarkerRef();
    const [locations, setLocations] = useState(false);
    let markers;
    if (locations){
        markers = locations.map((location)=>{
            return(
            <>
            <Marker ref={markerRef} label={location.type} position={location.address}/>
            {/* {location.description ? <InfoWindow anchor={marker}><p>{location.description}</p></InfoWindow>: null} */}
            </>
            )
        })
    }
    return(
    <div className='mappy'>
        <Map
        defaultCenter={{lat: 42.3601, lng: -71.0589}}
        defaultZoom={11}
        gestureHandling={'greedy'}
        disableD
        defaultUI={true}
        >
        {markers}
        </Map>
    </div>)
    }

export default MainMap;
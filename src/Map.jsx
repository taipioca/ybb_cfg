import React, { useEffect, useState } from "react"
import {Map, useMapsLibrary, useMap} from '@vis.gl/react-google-maps';
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import {createKeys, getLocations} from "../utilites";
import SingleMarker from "./SingleMarker";
import { DeckGlOverlay } from "./Overlay";
import { PolygonLayer } from "deck.gl";
import getLayer from "./GenerateLayers";
import Legend from "./Legend";
import { getNeighborhoodData } from "../utilites";
const MainMap = () => {
    const [locations, setLocations] = useState(false);
    const [overlay, setOverlay] = useState(false)
    const [neighborhoodData, setNeighborhoodData] = useState(false)
    const [filter, setFilter] = useState(false)
    const [keys, setKeys] = useState(false)
    const [filters, setFilters] = useState(false)
    let markers;
    
    useEffect(()=>{
        getLocations().then((response)=>{setLocations(response)})
        getNeighborhoodData().then((data)=>{
            setNeighborhoodData(data)
            setFilters(data.filters)
            getLayer(data).then((layer)=>{setOverlay(layer)})
        })
    },[])

    useEffect(()=>{
        if (neighborhoodData && filter){
            getLayer(neighborhoodData, filter).then((layer)=>{setOverlay(layer)})
            setKeys(createKeys(neighborhoodData.maxes[filter])
            )
        }
        else if (neighborhoodData) {
            setKeys(false)
            getLayer(neighborhoodData).then((layer)=>{setOverlay(layer)})
        }
    }, [filter])

    if (locations){
        markers = locations.map((location, key)=>{
            return(
            <SingleMarker key={key} location={location}/>
            )
        })
    }
    return(
    <div className='mappy'>
        <button style={{backgroundColor: "grey"}}onClick={()=>{
            if (!filter) setFilter("Median Household Income (2015)")
            else setFilter(false)
            }}>press me to show Median Household Income (2015)</button>
        <Map
        mapId={'828c076a50ba3ed0'}
        defaultCenter={{lat: 42.3200, lng: -71.0589}}
        defaultZoom={11.5}
        gestureHandling={'greedy'}
        defaultTilt={100}
        >
        {overlay ? <DeckGlOverlay layers={[overlay]} /> : null}
        {markers}
        {keys ? <Legend filter={{title:filter, keys: keys}}/>: null}
        </Map>
    </div>
    )
}

export default MainMap;
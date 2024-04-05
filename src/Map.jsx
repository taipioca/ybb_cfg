import React, { useEffect, useState } from "react"
import {Map, useMap} from '@vis.gl/react-google-maps';
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import {createKeys, getLocations} from "../utilites";
import SingleMarker from "./SingleMarker";
import { DeckGlOverlay } from "./Overlay";
import { PolygonLayer } from "deck.gl";
import getLayer from "./GenerateLayers";
import Legend from "./Legend";
import { getNeighborhoodData } from "../utilites";
import NeighborhoodModal from "./NeighborhoodInfoWindow";
const MainMap = ({setFilters, activeFilter}) => {
    const [locations, setLocations] = useState(false);
    const [overlay, setOverlay] = useState(false)
    const [neighborhoodData, setNeighborhoodData] = useState(false)
    const [keys, setKeys] = useState(false)
    const [clickedNeighborhood, setClickedNeighborhood] = useState(false)
    const [location, setLocation] = useState()
    const [cursor, setCursor] = useState(false)
    const map = useMap()
    let markers;

    useEffect(()=>{
        getLocations().then((response)=>{setLocations(response)})
        getNeighborhoodData().then((data)=>{
            setNeighborhoodData(data)
            setFilters([...data.filters, "None"])
            getLayer(data, setClickedNeighborhood, setLocation, setCursor).then((layer)=>{setOverlay(layer)})
        })
    },[])

    useEffect(()=>{
        if (map){
        if (cursor) map.setOptions({draggableCursor: "pointer"})
        else map.setOptions({draggableCursor: ""})}
    },[cursor])

    useEffect(()=>{
        if (neighborhoodData && activeFilter){
            getLayer(neighborhoodData, setClickedNeighborhood, setLocation, setCursor, activeFilter).then((layer)=>{setOverlay(layer)})
            setKeys(createKeys(neighborhoodData.maxes[activeFilter])
            )
        }
        else if (neighborhoodData) {
            setKeys(false)
            getLayer(neighborhoodData, setClickedNeighborhood, setLocation, setCursor).then((layer)=>{setOverlay(layer)})
        }
    }, [activeFilter])

    if (locations){
        markers = locations.map((location, key)=>{
            return(
            <SingleMarker key={key} location={location} map={map}/>
            )
        })
    }
    return(
    <div className='mappy'>
        {/* <button style={{backgroundColor: "grey"}}onClick={()=>{
            if (!activeFilter) setActiveFilter("Median Household Income (2015)")
            else setActiveFilter(false)
            }}>press me to show Median Household Income (2015)</button> */}
        <Map
        mapId={'828c076a50ba3ed0'}
        defaultCenter={{lat: 42.3200, lng: -71.0589}}
        defaultZoom={12}
        gestureHandling={'greedy'}
        defaultTilt={100}
        disableDoubleClickZoom
        >
        {overlay ? <DeckGlOverlay layers={[overlay]}/> : null}
        {clickedNeighborhood ? <NeighborhoodModal location={location} neighborhood={clickedNeighborhood} map={map} setNeighborhood={setClickedNeighborhood}/>: null}
        {markers}
        {keys ? <Legend filter={{title:activeFilter, keys: keys, source: neighborhoodData["sources"][activeFilter]}}/>: null}
        </Map>
    </div>
    )
}

export default MainMap;

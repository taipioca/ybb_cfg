import { InfoWindow } from "@vis.gl/react-google-maps";
import React from "react";
import NeighborhoodInfoWindowComponent from "./NeighborhoodWindowComponent";
import "./NeighborhoodInfoWindow.css";
const NeighborhoodModal = ({neighborhood, setNeighborhood, map, location})=>{
    map.setCenter(location);
    map.setZoom(13)
    const handleClose = ()=>{
        setNeighborhood(false)
        map.setCenter({lat: 42.3200, lng: -71.0589})
        map.setZoom(12)
    }
    return (
        location ? 
        <InfoWindow maxWidth={"fit-content"} onCloseClick={handleClose} position={location}>
            <NeighborhoodInfoWindowComponent neighborhood={neighborhood}/>
        </InfoWindow>: null
    )
}

export default NeighborhoodModal;
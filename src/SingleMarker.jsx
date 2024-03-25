import React, { useEffect, useState } from "react"
import {AdvancedMarker, InfoWindow, useMarkerRef} from '@vis.gl/react-google-maps';
import { IconHome, IconMapPin, IconSchool } from "@tabler/icons-react";
import LocationInfoWindowComponent from "./LocationInfoWindow";

const SingleMarker = ({location, map}) => {
    const [markerRef, marker] = useMarkerRef();
    const [infowindowOpen, setInfowindowOpen] = useState(false);
    const icons = {House: <IconHome fill={"blue"} color={"white"}/>, School: <IconSchool fill={"purple"} color={"white"}/>, Other: <IconMapPin fill={"green"} color={"white"}/>}
    return(
        <>
        <AdvancedMarker ref={markerRef} label={location.type} position={location.position} onClick={()=>{
          setInfowindowOpen((prevWindowState)=>!prevWindowState)
          map.setCenter(location.position)
          map.setZoom(13)
          }}>
            {icons[location.type]}
        </AdvancedMarker>
        {location.description && infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={"fit-content"}
          onCloseClick={() => {
            setInfowindowOpen(false)
            map.setCenter({lat: 42.3200, lng: -71.0589})
            map.setZoom(12)
          }}>
          <LocationInfoWindowComponent location={location}/>
        </InfoWindow>
      )}
        </>
        )
    }

export default SingleMarker;


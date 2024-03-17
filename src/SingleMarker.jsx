import React, { useEffect, useState } from "react"
import {AdvancedMarker, InfoWindow, useMarkerRef} from '@vis.gl/react-google-maps';
import getLocations from "../utilites";
import { IconHome, IconMapPin, IconSchool } from "@tabler/icons-react";

const SingleMarker = ({location}) => {
    const [markerRef, marker] = useMarkerRef();
    const [infowindowOpen, setInfowindowOpen] = useState(false);
    const icons = {House: <IconHome fill={"blue"} color={"white"}/>, School: <IconSchool fill={"purple"} color={"white"}/>, Other: <IconMapPin fill={"green"} color={"white"}/>}
    return(
        <>
        <AdvancedMarker ref={markerRef} label={location.type} position={location.address} onClick={()=>{setInfowindowOpen((prevWindowState)=>!prevWindowState)}}>
            {icons[location.type]}
        </AdvancedMarker>
        {location.description && infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}>
          <p>{location.description}</p>
        </InfoWindow>
      )}
        </>
        )
    }

export default SingleMarker;


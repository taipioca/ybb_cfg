import React, { useEffect, useState } from "react"
import {AdvancedMarker, InfoWindow, useMarkerRef} from '@vis.gl/react-google-maps';
import { IconApple, IconHeartHandshake, IconHome, IconMapPin } from "@tabler/icons-react";
import LocationInfoWindowComponent from "./info_windows/LocationInfoWindow";
import CustomIcon from "./modules/CustomIcon";

const SingleMarker = ({location, map, markers}) => {
    const [markerRef, marker] = useMarkerRef();
    const [infowindowOpen, setInfowindowOpen] = useState(false);
    // built-in icons
    const icons = {"Affordable Housing": <IconHome fill={"blue"} color={"white"}/>, "Community Partners": <IconHeartHandshake fill={"purple"} color={"white"}/>,  "Sustainable Food Systems": <IconApple fill={"green"}/>, other: <IconMapPin fill={"orange"} color={"white"}/>}
    return(
        <>
        <AdvancedMarker ref={markerRef} label={location.type} position={location.position} onClick={()=>{
          setInfowindowOpen((prevWindowState)=>!prevWindowState)
          map.setCenter(location.position)
          map.setZoom(13)
          }}>
            {markers[location.type] ? <CustomIcon image={markers[location.type]}/> :  (icons[location.type] ? icons[location.type]: icons.other)}
        </AdvancedMarker>
        {location.address && infowindowOpen && (
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


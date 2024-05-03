import { useEffect, useState } from "react";
import { cleanStat } from "../utilites";
import "./Infowindow.css";
const NeighborhoodInfoWindowComponent = ({neighborhood})=>{
    const statistics = Object.entries(neighborhood).map((entry)=>{
        if (entry[0]!= "name"){
            return(
                <p key={neighborhood+entry}><strong>{entry[0]}:</strong> {cleanStat(entry[1])}</p>
            )}
    })
    return(
    <div className="info-window-container">
        <div className="image-container">
            <img src={`../neighborhood_imgs/${neighborhood.name}.jpeg`}/>
        </div>
        <div className="info-container">
            <h1>{neighborhood.name}</h1>
            {statistics}
        </div>
    </div>)
}

export default NeighborhoodInfoWindowComponent;
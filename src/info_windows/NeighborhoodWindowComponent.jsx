import { useEffect, useState } from "react";
import { cleanStat } from "../../utilites";
import "./Infowindow.css";
const NeighborhoodInfoWindowComponent = ({ neighborhood }) => {
  const statistics = Object.entries(neighborhood).map((entry) => {
    if (entry[0] != "name" && entry[0] !="image") {
      return (
        <div className="row-container">
          <p className="stat-name">{entry[0]}:</p>
          <p className="stat-style">{cleanStat(entry[1])}</p>
        </div>
      );
    }
    return null;
  });
  return (
    <div className="info-window-container">
        <div className="image-container">
            <img src={neighborhood.image ? neighborhood.image : `../neighborhood_imgs/${neighborhood.name}.jpeg`}/>
        </div>
        <div className="info-container">
            <h1>{neighborhood.name}</h1>
            {statistics}
        </div>
    </div>)
}

export default NeighborhoodInfoWindowComponent;

import "./MapPage.css";
import MainMap from "./Map";
import Dropdown from "./modules/Dropdown"; // make sure to import the Dropdown component
import React, { useState } from "react";

const MapPage = () => {
  const [selectedKey, setSelectedKey] = useState("select_overlay");

  return (
    <div className="map-page">
      <div className="Filters">
        <img src="https://static1.squarespace.com/static/57c8793737c5815de7211a69/t/5f735805247890308cea26de/1601394700668/YBB+footer+logo-04.png?format=1500w" alt="Logo" />
        <Dropdown selectedKey={selectedKey} setSelectedKey={setSelectedKey} /> 
      </div>
      <div className="MainMap">
        <MainMap filter={selectedKey} />
      </div>
    </div>
  );
};

export default MapPage;
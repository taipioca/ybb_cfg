import "./MapPage.css";
import MainMap from "./Map";
import Filters from "./Filters";
import React, { useState } from "react";
import { getLocations } from "../utilites";

const MapPage = () => {
  const [activeFilter, setActiveFilter] = useState("Select Filter");
  const [filters, setFilters] = useState(["Redlining Overlay", "Urban Heat Islands Overlay"]);
  const [locations, setLocations] = useState(false)
  const [categories, setCategories] = useState([])
  const [activeCategories, setActiveCategories] = useState([])
  useState(()=>{
    getLocations().then((response)=>{
      setLocations(response[0])
      setCategories(response[1])
      setActiveCategories(response[1])
    })
  }, [])
  return (
    <div className="map-page">
      <div className="Filters">
        <img
          src="https://static1.squarespace.com/static/57c8793737c5815de7211a69/t/5f735805247890308cea26de/1601394700668/YBB+footer+logo-04.png?format=1500w"
          alt="Logo" className="logo-container"
        />
        <Filters
          filters={filters}
          setActiveFilter={setActiveFilter}
          activeFilter={activeFilter}
          categories={categories}
          activeCategories={activeCategories}
          setActiveCategories={setActiveCategories}
        />
      </div>
      <div className="MainMap">
        <MainMap
          filters={filters}
          setFilters={setFilters}
          activeCategories={activeCategories}
          activeFilter={activeFilter}
          locations={locations}
        />
      </div>
    </div>
  );
};

export default MapPage;

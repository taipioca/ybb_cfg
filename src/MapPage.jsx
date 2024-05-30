import "./MapPage.css";
import MainMap from "./Map";
import Filters from "./Filters";
import React, { useState } from "react";
import { getLocations } from "../utilites";

const MapPage = () => {
  const [activeFilter, setActiveFilter] = useState("Select Filter");
  const [filters, setFilters] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [locations, setLocations] = useState(false)
  const [categories, setCategories] = useState([])
  const [activeCategories, setActiveCategories] = useState([])
  const [icons, setIcons] = useState({})
  const [fetchingLocations, setFetchingLocations] = useState("Fetching locations...")
  useState(()=>{
    getLocations().then((response)=>{
      if (response){
      setLocations(response[0])
      setCategories(response[1])
      setActiveCategories(response[1])
      setIcons(response[2])}
      else{
        setLocations(null)
      }
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
      <>
      <div className="MainMap">
      {fetchingLocations ? <p className="fetchingNoti">{overlay ? "": "Generating overlay, "}{fetchingLocations}</p>: null}
        <MainMap
          filters={filters}
          setFilters={setFilters}
          activeCategories={activeCategories}
          activeFilter={activeFilter}
          overlay={overlay}
          setOverlay={setOverlay}
          locations={locations}
          icons={icons}
          setFetchingLocations={setFetchingLocations}
        />
      </div>
      </>
    </div>
  );
};

export default MapPage;

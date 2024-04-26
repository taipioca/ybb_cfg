import "./MapPage.css";
import MainMap from "./Map";
import Filters from "./Filters";
import React, { useState } from "react";

const MapPage = () => {
  const [activeFilter, setActiveFilter] = useState("Select Filter");
  const [filters, setFilters] = useState(null);

  return (
    <div className="map-page">
      <div className="Filters">
        <img
          src="https://static1.squarespace.com/static/57c8793737c5815de7211a69/t/5f735805247890308cea26de/1601394700668/YBB+footer+logo-04.png?format=1500w"
          alt="Logo"
        />
        <Filters
          filters={filters}
          setActiveFilter={setActiveFilter}
          activeFilter={activeFilter}
        />
      </div>
      <div className="MainMap">
        <MainMap
          filters={filters}
          setFilters={setFilters}
          activeFilter={activeFilter}
        />
      </div>
    </div>
  );
};

export default MapPage;

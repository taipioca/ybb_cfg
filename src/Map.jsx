import React, { useEffect, useState } from "react";
import { Map, useMap } from "@vis.gl/react-google-maps";
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { createKeys, getLocations } from "../utilites";
import SingleMarker from "./SingleMarker";
import { DeckGlOverlay } from "./Overlay";
import { PolygonLayer } from "deck.gl";
import getLayer from "./GenerateLayers";
import Legend from "./Legend";
import { getNeighborhoodData } from "../utilites";
import NeighborhoodModal from "./NeighborhoodInfoWindow";
const MainMap = ({ setFilters, activeFilter, activeCategories, locations }) => {
  const [overlay, setOverlay] = useState(false);
  const [neighborhoodData, setNeighborhoodData] = useState(false);
  const [keys, setKeys] = useState(false);
  const [clickedNeighborhood, setClickedNeighborhood] = useState(false);
  const [location, setLocation] = useState();
  const [cursor, setCursor] = useState(false);
  const map = useMap();
  const [markers, setMarkers] = useState(null);

  useEffect(() => {
    getNeighborhoodData().then((data) => {
      setNeighborhoodData(data);
      setFilters([...data.filters, "Redlining Overlay", "None"]);
      getLayer(data, setClickedNeighborhood, setLocation, setCursor).then(
        (layer) => {
          setOverlay(layer);
        }
      );
    });
  }, []);

  useEffect(() => {
    if (map) {
      if (cursor) map.setOptions({ draggableCursor: "pointer" });
      else map.setOptions({ draggableCursor: "" });
    }
  }, [cursor]);

  useEffect(() => {
    if (neighborhoodData && activeFilter) {
      getLayer(
        neighborhoodData,
        setClickedNeighborhood,
        setLocation,
        setCursor,
        activeFilter
      ).then((layer) => {
        setOverlay(layer);
      });
      setKeys(createKeys(neighborhoodData.maxes[activeFilter]));
    } else if (neighborhoodData) {
      setKeys(false);
      getLayer(
        neighborhoodData,
        setClickedNeighborhood,
        setLocation,
        setCursor
      ).then((layer) => {
        setOverlay(layer);
      });
    }
  }, [activeFilter]);

  useEffect(() => {
    if (locations) {
      setMarkers(
        locations.map((location, key) => {
          if (activeCategories.includes(location.type)) {
            return <SingleMarker key={key} location={location} map={map} />;
          }
        })
      );
    }
  }, [locations, activeCategories]);

  return (
    <div className="mappy">
      <Map
        mapId={"828c076a50ba3ed0"}
        defaultCenter={{ lat: 42.31, lng: -71.0891 }}
        defaultZoom={12}
        gestureHandling={"greedy"}
        defaultTilt={100}
        disableDoubleClickZoom
      >
        {overlay ? <DeckGlOverlay layers={[overlay]} /> : null}
        {clickedNeighborhood ? (
          <NeighborhoodModal
            location={location}
            neighborhood={clickedNeighborhood}
            map={map}
            setNeighborhood={setClickedNeighborhood}
          />
        ) : null}
        {markers}
        {keys ? (
          <Legend
            filter={{
              title: activeFilter,
              keys: keys,
              source: neighborhoodData["sources"][activeFilter],
            }}
          />
        ) : null}
      </Map>
    </div>
  );
};

export default MainMap;

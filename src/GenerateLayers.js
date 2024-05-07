import { PolygonLayer } from "@deck.gl/layers";
import { COORDINATE_SYSTEM, TileLayer } from "deck.gl";
const getLayer = async (
  neighborhoodData,
  setNeighborhood,
  setLocation,
  setCursor,
  filter = false
) => {
  if (filter == "Redlining Overlay") {
    return getRedliningLayer();
  }

  const neighborhoods = await fetch("/neighborhoods.json").then((data) =>
    data.json()
  );
  const polygonData = [];
  let currentNeighborhood;
  let currentNeighborhoodElvation;
  let currentNeighborhoodColor;
  Object.keys(neighborhoods).forEach(function (neighborhood_name, _) {
    currentNeighborhood = neighborhoodData[neighborhood_name];
    currentNeighborhoodElvation =
      filter && currentNeighborhood[filter]
        ? (currentNeighborhood[filter] / neighborhoodData.maxes[filter]) * 1000
        : 0;
    currentNeighborhoodColor =
      filter && currentNeighborhood[filter]
        ? [
            80 +
              (currentNeighborhood[filter] / neighborhoodData.maxes[filter]) *
                150,
            30 +
              (currentNeighborhood[filter] / neighborhoodData.maxes[filter]) *
                90,
            110 +
              (currentNeighborhood[filter] / neighborhoodData.maxes[filter]) *
                150,
          ]
        : [200, 200, 200];
    polygonData.push({
      contours: neighborhoods[neighborhood_name],
      neighborhood: neighborhood_name,
      color: currentNeighborhoodColor,
      elavation: currentNeighborhoodElvation,
      neighborhood_data: currentNeighborhood,
    });
  });

  const layer = new PolygonLayer({
    coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
    id: "neighborhoods",
    data: polygonData,
    pickable: true,
    stroked: true,
    filled: true,
    // extruded: filter ? true: false,
    // extruded: filter ? true: false,
    wireframe: true,
    getPolygon: (d) => d.contours,
    getLineColor: filter ? [255, 255, 255] : [0, 0, 0],
    getLineColor: filter ? [255, 255, 255] : [0, 0, 0],
    getFillColor: (d) => d.color,
    // getElevation: d-> d.elevation,
    // getElevation: d-> d.elevation,
    getLineWidth: 30,
    onHover: (info, event) => {
      if (info.object) setCursor(true);
      else setCursor(false);
    },
    onClick: (info, event) => {
      setNeighborhood({
        ...info.object.neighborhood_data,
        name: info.object.neighborhood,
      });
      setLocation({ lng: info.coordinate[0], lat: info.coordinate[1] });
    },
  });
  return layer;
};

const getRedliningLayer = async () => {
  const redlining_colors = {
    A: [38, 113, 45],
    B: [16, 32, 145],
    C: [214, 154, 64],
    D: [96, 32, 138],
  };
  const districts = await fetch("src/redlining.json").then((data) =>
    data.json()
  );
  const polygonData = [];
  let currentDistrictColor;
  // For each neighborhood calculating the elevation, fill color
  Object.keys(districts).forEach(function (district, _) {
    currentDistrictColor = redlining_colors[districts[district].grade];
    polygonData.push({
      contours: districts[district].coords,
      color: currentDistrictColor,
    });
  });

  const layer = new PolygonLayer({
    coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
    id: "redlining",
    data: polygonData,
    pickable: false,
    stroked: true,
    filled: true,
    wireframe: true,
    getPolygon: (d) => d.contours,
    getLineColor: [255, 255, 255],
    getFillColor: (d) => d.color,
    getLineWidth: 30,
  });
  return layer;
};

export default getLayer;

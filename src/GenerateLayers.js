import { PolygonLayer } from "@deck.gl/layers";
import { COORDINATE_SYSTEM, TileLayer } from "deck.gl";
const getLayer = async (
  neighborhoodData,
  setNeighborhood,
  setLocation,
  setCursor,
  filter = false
) => {
  /*
  Returns the desired layer given a filter and the neighborhood data
  Also, reacts to clicks on layer via setNeighborhood, setLocation, and setCursor functions
  */
  if (filter == "Redlining Overlay") {
    return getRedliningLayer();
  }

  // Getting the dictionary mapping neighborhood names to polygon shapes
  const neighborhoods = await fetch("/neighborhoods.json").then((data) =>
    data.json()
  );
  const polygonData = [];
  let currentNeighborhood;
  let currentNeighborhoodColor;
  Object.keys(neighborhoods).forEach(function (neighborhood_name, _) {
    currentNeighborhood = neighborhoodData[neighborhood_name];
    // Setting color by scaling by factor representing the current neighborhoods filter stat relative to the max among the Boston neighborhoods
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
    // Adding this neighborhood's polygon to list of polygon data
    polygonData.push({
      contours: neighborhoods[neighborhood_name],
      neighborhood: neighborhood_name,
      color: currentNeighborhoodColor,
      neighborhood_data: currentNeighborhood,
    });
  });

  // Creating layer from polygons
  const layer = new PolygonLayer({
    coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
    id: "neighborhoods",
    data: polygonData,
    pickable: true,
    stroked: true,
    filled: true,
    wireframe: true,
    getPolygon: (d) => d.contours,
    getLineColor: filter ? [255, 255, 255] : [0, 0, 0],
    getFillColor: (d) => d.color,
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
  /*
  Returns redling layer utilizing redlining.json
  */
  const redlining_colors = {
    A: [38, 113, 45],
    B: [16, 32, 145],
    C: [214, 154, 64],
    D: [96, 32, 138],
  };
  const districts = await fetch("/redlining.json").then((data) =>
    data.json()
  );
  const polygonData = [];
  let currentDistrictColor;
  // For each neighborhood getting shape based on coords in redlining.json and fill color based on grade
  Object.keys(districts).forEach(function (district, _) {
    currentDistrictColor = redlining_colors[districts[district].grade];
    polygonData.push({
      contours: districts[district].coords,
      color: currentDistrictColor,
    });
  });

  // Creating layer from neighborhoods
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

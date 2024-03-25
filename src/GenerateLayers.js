import { PolygonLayer } from '@deck.gl/layers';
import { COORDINATE_SYSTEM } from 'deck.gl';
const getLayer = async (neighborhoodData, setNeighborhood, setLocation, setCursor, filter=false) =>{
    const neighborhoods = await fetch('src/neighborhoods.json').then((data)=>data.json());
    const polygonData = [];
    let currentNeighborhood;
    let currentNeighborhoodElvation;
    let currentNeighborhoodColor;
    // For each neighborhood calculating the elevation, fill color
    Object.keys(neighborhoods).forEach(function(neighborhood_name, _) {
        currentNeighborhood = neighborhoodData[neighborhood_name];
        currentNeighborhoodElvation = (filter && currentNeighborhood[filter]) ? 
        (currentNeighborhood[filter]/neighborhoodData.maxes[filter])*1000 
        : 0
        currentNeighborhoodColor = (filter && currentNeighborhood[filter]) ? 
        [(currentNeighborhood[filter]/neighborhoodData.maxes[filter])*255, 0, 0]
        : [200, 200, 200]
        polygonData.push({
            contours: neighborhoods[neighborhood_name], 
            neighborhood: neighborhood_name, 
            color: currentNeighborhoodColor,
            elavation: currentNeighborhoodElvation,
            neighborhood_data: currentNeighborhood
        })
      });
  
  const layer = new PolygonLayer({
    coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
    id: "neighborhoods",
    data: polygonData,
    pickable: true,
    stroked: true,
    filled: true,
    extruded: filter ? true: false,
    wireframe: true,
    getPolygon: d => d.contours,
    getLineColor: [0, 0, 0],
    getFillColor: d=> d.color,
    getElevation: d => d.elavation,
    getLineWidth: 30,
    onHover: (info, event)=>{
      if (info.object) setCursor(true);
      else setCursor(false);},
    onClick: (info, event)=>{
      setNeighborhood({...info.object.neighborhood_data, name: info.object.neighborhood})
      setLocation({lng: info.coordinate[0], lat: info.coordinate[1]})
    },
  });
  return layer;
}

  export default getLayer;
import { cleanStat } from "../utilites";
import "./Infowindow.css";
import "./LocationInfoWindow.css";
const LocationInfoWindowComponent = ({ location }) => {
  // const statistics = Object.entries(location).map((entry)=>{
  //     if (entry[0]!= "name"){
  //         return(
  //             <p><strong>{entry[0]}:</strong> {cleanStat(entry[1])}</p>
  //         )}
  //     return null;
  // })
  return (
    <div className="info-window-container">
      {/* <div className="image-container">
        <img src="https://placehold.co/600x400" />
      </div> */}
      <div className="info-container">
        <h1>{location.address}</h1>
        <p>Project Type: {location.description}</p>
      </div>
    </div>
  );
};

export default LocationInfoWindowComponent;

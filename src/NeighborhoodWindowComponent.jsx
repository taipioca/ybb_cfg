import { cleanStat } from "../utilites";
import "./Infowindow.css";
const NeighborhoodInfoWindowComponent = ({neighborhood})=>{
    const statistics = Object.entries(neighborhood).map((entry)=>{
        if (entry[0]!= "name"){
            return(
                <p><strong>{entry[0]}:</strong> {cleanStat(entry[1])}</p>
            )}
        return null;
    })
    return(
    <div className="info-window-container">
        <div className="image-container">
            <img src="https://placehold.co/600x400"/>
        </div>
        <div className="info-container">
            <h1>{neighborhood.name}</h1>
            {statistics}
        </div>
    </div>)
}

export default NeighborhoodInfoWindowComponent;
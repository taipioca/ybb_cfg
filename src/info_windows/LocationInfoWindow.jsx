import "./Infowindow.css";
const LocationInfoWindowComponent = ({location})=>{
    return(
    <div className="info-window-container">
        {location.image ? <div className="image-container">
            <img src={location.image}/>
        </div>: null}
        <div className={"info-container" + (location.image ? "": " no-image")}>
            <h1>{location.name ? location.name: location.address}</h1>
            <div className="type-address">
            <p className="type"><strong>{location.type}</strong></p>
            {location.name ? <p className="address">{location.address}</p>: null}
            </div>
            {location.description ? <p>Description: {location.description}</p>: null}
        </div>
    </div>)
}

export default LocationInfoWindowComponent;

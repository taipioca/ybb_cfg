import React from "react";
import "./CustomIcon.css"
const CustomIcon =  ({image}) => (
    <div className="icon-container">
        <img className="image-icon-container" src={image}/>
    </div>
)

export default CustomIcon;
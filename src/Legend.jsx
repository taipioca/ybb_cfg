import React from "react";
import "./Legend.css"
const Legend = ({filter}) =>{
    const keys = filter.keys.map((key, index)=>{
        return(
            <div key={index} className="filter-key-contain">
                <div className="filter-key-color" style={{"backgroundColor" : key.color}}/>
                <p>{key.name}</p>
            </div>
        )
    })
    return(
    <div className="Legend-Contain">
        <div className="Inner-Legend-Contain">
            <p className="filter-key-contain">{filter.title}</p>
            {keys}
        </div>
        <p className="source-contain">{filter.source}</p>
    </div>)
}

export default Legend;
const RedliningLegend = () =>{
    const redlining_colors = {"A": [38, 113, 45], "B": [16, 32, 145], "C": [214, 154, 64], "D": [96, 32, 138]}
        const keys = [];
        Object.keys(redlining_colors).forEach(function(grade, _) {
            keys.push(
            <div key={_} className="filter-key-contain">
                <div className="filter-key-color" style={{"backgroundColor" : `rgb(${redlining_colors[grade].join()})`}}/>
                <p>{grade}</p>
            </div>)
        });
    return(
    <div className="Legend-Contain">
        <div className="Inner-Legend-Contain">
            <p className="filter-key-contain">{"Redlining Overlay"}</p>
            {keys}
        </div>
        <p className="source-contain">Source: Boston Area Research Initiative</p>
    </div>)
}

export default RedliningLegend
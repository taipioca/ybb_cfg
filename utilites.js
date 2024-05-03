async function getLocations() {
    const response = await fetch("http://localhost:1793/api/getlocations");
    const [locations, categories] = await response.json();
    return [locations, categories]
}
async function getNeighborhoodData(){
    const response = await fetch("http://localhost:1793/api/getdata");
    const neighborhoodData = response.json();
    return neighborhoodData
}
const cleanNumber =  (x)=> {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const createKeys = (max)=>{
    if (max < 1) {
        max=100 * max
        return ([{
            name: `${Math.ceil((max*.75)/5)*5}% >=`,
            color: "rgb(191, 0, 0)"
        },
        {
            name: `${Math.ceil((max*.5)/5)*5}% >=`,
            color: "rgb(128, 0, 0)"
        },
        {
            name: `${Math.ceil((max*.2)/5)*5}% <=`,
            color: "rgb(64, 0, 0)"
        }
    ])
    }
    return(
        [{
            name: `$${cleanNumber(Math.ceil((max*.75)/1000)*1000)} >=`,
            color: "rgb(191, 0, 0)"
        },
        {
            name: `$${cleanNumber(Math.ceil((max*.5)/1000)*1000)} >=`,
            color: "rgb(128, 0, 0)"
        },
        {
            name: `$${cleanNumber(Math.ceil((max*.25)/1000)*1000)} <=`,
            color: "rgb(64, 0, 0)"
        }
    ]
    )
}

const cleanStat = (number)=>{
    if (number < 1) return `${Math.ceil(number*100)}%`
    return `$${cleanNumber(number)}`

}
export {getLocations, getNeighborhoodData, createKeys, cleanStat};
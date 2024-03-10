async function getLocations() {
    const response = await fetch("http://localhost:1793/api/getlocations");
    const locations = response.json();
    return locations
}
export default getLocations;
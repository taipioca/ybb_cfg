const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:1793"
    : "https://ybb-cfg24.vercel.app";

async function getLocations() {
  const response = await fetch(`${API_URL}/api/getlocations`);
  const [locations, categories] = await response.json();
  return [locations, categories];
}

async function getNeighborhoodData() {
  const response = await fetch(`${API_URL}/api/getdata`);
  const neighborhoodData = response.json();
  return neighborhoodData;
}

const cleanNumber = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const createKeys = (max) => {
  if (max < 1) {
    max = 100 * max;
    return [
      {
        name: `More than ${Math.ceil((max * 0.75) / 5) * 5}%`,
        color: "rgb(205, 98, 230)",
      },
      {
        name: `More than ${Math.ceil((max * 0.5) / 5) * 5}%`,
        color: "rgb(155, 60, 183)",
      },
      {
        name: `Less than ${Math.ceil((max * 0.2) / 5) * 5}%`,
        color: "rgb(80, 30, 110)",
      },
      {
        name: `Not Reported`,
        color: "rgb(200,200,200)",
      },
    ];
  }
  return [
    {
      name: `More than $${cleanNumber(Math.ceil((max * 0.75) / 1000) * 1000)}`,
      color: "rgb(205, 98, 230)",
    },
    {
      name: `More than $${cleanNumber(Math.ceil((max * 0.5) / 1000) * 1000)}`,
      color: "rgb(155, 60, 183)",
    },
    {
      name: `Less than $${cleanNumber(Math.ceil((max * 0.25) / 1000) * 1000)}`,
      color: "rgb(80, 30, 110)",
    },
    {
      name: `Not Reported`,
      color: "rgb(200,200,200)",
    },
  ];
};

const cleanStat = (number) => {
  if (number < 1) return `${Math.ceil(number * 100)}%`;
  return `$${cleanNumber(number)}`;
};
export { getLocations, getNeighborhoodData, createKeys, cleanStat };

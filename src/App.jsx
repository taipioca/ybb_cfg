import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import "./App.css";
import MapPage from "./MapPage";
import "@mantine/core/styles.css";
import { NextUIProvider } from "@nextui-org/react";
import "./styles/styles.css";

function App() {
  return (
    <NextUIProvider>
      <APIProvider apiKey={"AIzaSyA1bygRbhRnPdGvBsStyhb4DUje1CTeVLA"}>
        <MapPage />
      </APIProvider>
    </NextUIProvider>
  );
}

export default App;

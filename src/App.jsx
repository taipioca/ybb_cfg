import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import "./App.css";
import MapPage from "./MapPage";
import "@mantine/core/styles.css";
import { NextUIProvider } from "@nextui-org/react";
import "./styles/styles.css";

function App() {
  return (
    <NextUIProvider>
      <APIProvider apiKey={"KEY HERE"}>
        <MapPage />
      </APIProvider>
    </NextUIProvider>
  );
}

export default App;

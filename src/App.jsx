import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import "./App.css";
import MapPage from "./MapPage";
import "@mantine/core/styles.css";
import { NextUIProvider } from "@nextui-org/react";
import "./styles/styles.css";

function App() {
  return (
    <NextUIProvider>
      <APIProvider apiKey={"AIzaSyBD1iSn_2W19A-fvlnJLH2Wv_NG8t6E0fs"}>
        <MapPage />
      </APIProvider>
    </NextUIProvider>
  );
}

export default App;

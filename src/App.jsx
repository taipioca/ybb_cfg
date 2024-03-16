import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import "./App.css";
import MapPage from "./MapPage";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import {NextUIProvider} from "@nextui-org/react";
import "./styles/styles.css"

function App() {
  return (
    <NextUIProvider>

      <APIProvider apiKey={"AIzaSyAigfTB0Xn0hrPkyB4sK4LaA_F5MX-9R5I"}>
        <MapPage />
      </APIProvider>
    </NextUIProvider>
  );
}

export default App;

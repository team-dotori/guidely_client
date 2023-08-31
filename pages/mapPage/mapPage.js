import React, { useEffect, useState } from "react";
import AppBar from "./searchBar";
import NavBar from "./navBar";

export default function MapPage() {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=92bb256a169ec9bf1e3db68e8f38a607&libraries=services&autoload=false`;
    script.onload = () => {
      setMapLoaded(true);
    };
    document.head.appendChild(script);
  }, []);
  
  useEffect(() => {
    if (mapLoaded) {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
      });
    }
  }, [mapLoaded]);

    
    const style = {
    map: {
        width: "100vw",
        height: "90vh",
        marginTop: "10vh",
        zIndex: "-100"
    },
};

  return (
    <div>
      <AppBar />
      <div id="map" style={style.map} />
      <NavBar />
    </div>
  );
}

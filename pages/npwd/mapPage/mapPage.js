import React, { useEffect, useState } from "react";
import AppBar from "./searchBar";
import NavBar from "./navBar";
import ReactModal from "react-modal";
import PlaceDetail from "./placeDetail";

export default function MapPage() {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_JAVASCRIPT_KEY}&autoload=false`;
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
      zIndex: "0",
    },

    modal: {
      position: "absolute",
      inset: "78% 0 0 50%",
      transform: "translateX(-50%)", // 모달을 가로 방향으로 중앙 정렬
      width: "100%",
      height: "21.5%",
      borderRadius: "13.5px 13.5px 0 0",
      backgroundColor: "white",
      border: "none",
      boxShadow: "-4px -4px 8px rgba(0, 0, 0, 0.2)",
      boxSizing: "border-box",
      paddingTop: "5%",
    },
  };

  return (
    <div>
      <AppBar />
      <div id="map" style={style.map} />
      <NavBar />
      <ReactModal
        isOpen={false}
        style={{ content: style.modal }}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        //onRequestClose={() => setIsOpen(old => !old)}
      >
        <PlaceDetail></PlaceDetail>
      </ReactModal>
    </div>
  );
}

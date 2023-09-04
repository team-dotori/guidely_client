import React, { useEffect, useState } from "react";
import {
  AppBar_Main,
  AppBar_RouteSelection,
} from "@/components/npwd/mapPage/searchBar";
import NavBar from "@/components/npwd/mapPage/navBar";
import ReactModal from "react-modal";
import PlaceDetail from "@/components/npwd/mapPage/placeDetail";
import { defaultLatLon } from "@/public/constants/constant";
import { riskEnumTable } from "@/public/constants/enumTable";

export default function MapPage() {
  const [mode, setMode] = useState(0); // 0: 지도 | 1: 위치선택 -> 모달창 | 2: 경로 선택 | 3: 네비게이션

  const [currentLocation, setCurrentLocation] = useState();

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

  function renderTop() {
    switch (mode) {
      case 0:
        return <AppBar_Main />;
      case 1:
        return <AppBar_RouteSelection />;
    }
  }

  function renderBottom() {
    switch (mode) {
      case 0:
        return <NavBar />;
      case 1:
        return (
          <ReactModal
            isOpen={false}
            style={{ content: style.modal }}
            ariaHideApp={false}
            shouldCloseOnOverlayClick={true}
            //onRequestClose={() => setIsOpen(old => !old)}
          >
            <PlaceDetail></PlaceDetail>
          </ReactModal>
        );
        break;
    }
  }

  return (
    <div>
      {renderTop()}
      <Map setCurrentLocation={setCurrentLocation} />
      {renderBottom()}
    </div>
  );
}

function Map({ setCurrentLocation }) {
  //location 핀들 가져오기
  useEffect(() => {
    fetch("/api/guidely/api/location")
      .then((res) => res.json())
      .then((data) => {
        setLocationList(data);
      });
  }, []);

  const [locationList, setLocationList] = useState([]);
  useEffect(() => {
    if (locationList.length > 0) {
      console.log(locationList);
      setMarker(locationList);
    }
  }, [locationList]);

  //
  const [kakaoMap, setKakaoMap] = useState();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_JAVASCRIPT_KEY}&autoload=false&libraries=clusterer`;
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(
            defaultLatLon.lat,
            defaultLatLon.lon
          ),
          level: 3,
        };
        setKakaoMap(new window.kakao.maps.Map(container, options));
      });
    };
    document.head.appendChild(script);
  }, []);

  // const tempMarkers = [
  //   {
  //     type: "INSIDE",
  //     risk: "LOW",
  //     count: 3,
  //     coor: { lat: 33.451701, lon: 126.571667 },
  //   },
  //   {
  //     type: "OUTSIDE",
  //     risk: "HIGH",
  //     count: 8,
  //     coor: { lat: 33.451701, lon: 126.570667 },
  //   },
  //   {
  //     type: "INSIDE",
  //     risk: "HIGH",
  //     count: 5,
  //     coor: { lat: 33.450701, lon: 126.571667 },
  //   },
  //   {
  //     type: "OUTSIDE",
  //     risk: "MEDIUM",
  //     count: 18,
  //     coor: { lat: 33.450701, lon: 126.570667 },
  //   },
  //   {
  //     type: "INSIDE",
  //     risk: "LOW",
  //     count: 12,
  //     coor: { lat: 33.449701, lon: 126.570667 },
  //   },
  // ];

  useEffect(() => {
    if (kakaoMap) {
    }
  }, [kakaoMap]);

  function setMarker(newLocations) {
    var clusterer = new window.kakao.maps.MarkerClusterer({
      map: kakaoMap, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      gridSize: 30, // 클러스터의 격자 크기. 화면 픽셀 단위이며 해당 격자 영역 안에 마커가 포함되면 클러스터에 포함시킨다
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 5, // 클러스터 할 최소 지도 레벨
      // styles: [
      //   {
      //     width: "53px",
      //     height: "52px",
      //     color: "#fff",
      //     textAlign: "center",
      //     lineHeight: "54px",
      //   },
      // ],
    });
    clusterer.clear();

    const customMarkers = newLocations.map((val) => {
      const content = customMarkerContent({
        type: val.type,
        risk: riskEnumTable[Math.round(val.riskMean)],
        count: val.countDeclaration,
      });
      const position = new window.kakao.maps.LatLng(
        val.latitude,
        val.longitude
      );

      return new window.kakao.maps.CustomOverlay({
        position: position,
        content: content,
        clickable: true,
      });
    });

    // 클러스터러에 마커들을 추가합니다
    clusterer.addMarkers(customMarkers);

    // tempMarkers.forEach((marker) => {
    //   setMarker(marker);
    // });
  }

  const style = {
    map: {
      width: "100vw",
      height: "90vh",
      zIndex: "1",
    },

    markerText: {
      position: "absolute",
      fontSize: "16.61px",
      fontWeight: 600,
      color: "#181818",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return <div id="map" style={style.map}></div>;
}

function customMarkerContent({ type, risk, count }) {
  return `
    <div style="position: relative">
      <img
        src="/icons/markers/${type}_${risk}.svg"
        style="
          display: absolute;
          width: ${type === "INSIDE" ? "32px" : "26px"};
          height: ${type === "INSIDE" ? "32px" : "26px"};
          filter: drop-shadow(0px 2.44px 2.44px rgba(0, 0, 0, 0.10));
        "
      />
      <div
        style="
          position: absolute;
          font-size: 16.61px;
          font-weight: 600;
          color: #181818;
          top: 50%;
          left: 50%;
          transform: ${
            type === "INSIDE"
              ? "translate(-56%, -60%);"
              : "translate(-50%, -65%);"
          };
        "
      >
        ${count}
      </div>
    </div>
  `;
}

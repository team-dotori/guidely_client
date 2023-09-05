import React, { useEffect, useState } from "react";
import {
  AppBar_Main,
  AppBar_RouteSelection,
} from "@/components/npwd/mapPage/topBar";
import {
  NavBar,
  PlaceDetail,
  RouteSearchResult,
} from "@/components/npwd/mapPage/bottomBar";
import { defaultLatLon } from "@/public/constants/constant";
import { riskEnumTable } from "@/public/constants/enumTable";
import { getDistanceBetweenCoor } from "@/public/functions/coordinate";

export default function MapPage() {
  const [mode, setMode] = useState(0); // 0: 지도 | 1: 위치 상세 | 2: 신고내역 조회 | 3: 경로 선택 | 4: 네비게이션

  const [currentLocation, setCurrentLocation] = useState(null);
  useEffect(() => {
    setMode(currentLocation !== null ? 1 : 0);
  }, [currentLocation]);

  const [sourceSearchItem, setSourceSearchItem] = useState(null);
  const [destinationSearchItem, setDestinationSearchItem] = useState(null);

  const [routeInfo, setRouteInfo] = useState(null);

  // const [customBack, setCustomBack] = useState();
  // useEffect(() => {
  //   // 뒤로가기 제어
  //   (() => {
  //     history.pushState(null, "", location.href);
  //     window.addEventListener("popstate", customBack);
  //   })();

  //   return () => {
  //     window.removeEventListener("popstate", customBack);
  //   };
  // }, [customBack]);
  // useEffect(() => {
  //   switch (mode) {
  //     case 0:
  //       setCustomBack(null);
  //       break;
  //     case 1:
  //       setCustomBack(() => {
  //         setMode(0);
  //       });
  //       break;
  //     case 2:
  //       setCustomBack(() => {
  //         setMode(1);
  //       });
  //       break;
  //     case 3:
  //       setCustomBack(() => {
  //         setMode(1);
  //       });
  //       break;
  //   }
  // }, [mode]);

  const style = {
    map: {
      width: "100vw",
      height: "100vh",
      zIndex: "0",
    },
  };

  function renderTop() {
    switch (mode) {
      case 0:
      case 1:
      case 2:
        return <AppBar_Main />;
      case 3:
        return (
          <AppBar_RouteSelection
            setSourceSearchItem={setSourceSearchItem}
            setDestinationSearchItem={setDestinationSearchItem}
          />
        );
    }
  }

  function renderBottom() {
    switch (mode) {
      case 0:
        return <NavBar />;
      case 1:
        return <PlaceDetail currentLocation={currentLocation} />;
      case 2:
      case 3:
        return routeInfo ? <RouteSearchResult routeInfo={routeInfo} /> : null;
    }
  }

  return (
    <div>
      {renderTop()}
      <Map
        setCurrentLocation={setCurrentLocation}
        sourceSearchItem={sourceSearchItem}
        destinationSearchItem={destinationSearchItem}
        setRouteInfo={setRouteInfo}
        style={style.map}
      />
      {renderBottom()}
    </div>
  );
}

function Map({
  setCurrentLocation,
  sourceSearchItem,
  destinationSearchItem,
  setRouteInfo,
}) {
  const [clusterer, setClusterer] = useState(null);
  function initClusterer({ minLevel }) {
    setClusterer(
      new window.kakao.maps.MarkerClusterer({
        map: kakaoMap, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        gridSize: 30, // 클러스터의 격자 크기. 화면 픽셀 단위이며 해당 격자 영역 안에 마커가 포함되면 클러스터에 포함시킨다
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: minLevel, // 클러스터 할 최소 지도 레벨
        // styles: [
        //   {
        //     width: "53px",
        //     height: "52px",
        //     color: "#fff",
        //     textAlign: "center",
        //     lineHeight: "54px",
        //   },
        // ],
      })
    );
  }

  //////////////////////////////// 지도 모드일 때
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
      initClusterer({ minLevel: 5 });
    }
  }, [locationList]);
  useEffect(() => {
    if (clusterer) {
      setMarker(locationList);
    }
  }, [clusterer]);

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

  const [curClickedLocation, setCurClickedLocation] = useState();
  useEffect(() => {
    if (kakaoMap) {
      kakao.maps.event.addListener(kakaoMap, "click", function (mouseEvent) {
        // 클릭한 위도, 경도 정보를 가져옵니다
        var latlng = mouseEvent.latLng;
        setCurClickedLocation({
          lat: latlng.Ma,
          lon: latlng.La,
        });
      });
    }
  }, [kakaoMap]);
  useEffect(() => {
    if (curClickedLocation) {
      const nearlestDisInd = searchForClickedLocation();
      if (nearlestDisInd !== -1) {
        setCurrentLocation(locationList[nearlestDisInd]);
      } else {
        setCurrentLocation(null);
      }
    }
  }, [curClickedLocation]);
  function searchForClickedLocation() {
    const nearlestDis = locationList
      .map((val, ind) => {
        return {
          dis: getDistanceBetweenCoor(
            val.latitude,
            val.longitude,
            curClickedLocation.lat,
            curClickedLocation.lon
          ),
          ind: ind,
        };
      })
      .sort((a, b) => a.dis - b.dis)[0];
    if (nearlestDis.dis < 50) {
      return nearlestDis.ind;
    } else {
      return -1;
    }
  }

  function setMarker(newLocations) {
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
        clickable: false,
      });
    });

    // 클러스터러에 마커들을 추가합니다
    clusterer.addMarkers(customMarkers);

    // tempMarkers.forEach((marker) => {
    //   setMarker(marker);
    // });
  }

  //////////////////////////////// 위치선택 모드일 때
  useEffect(() => {
    if (sourceSearchItem && destinationSearchItem) {
      searchRoute();
    }
  }, [sourceSearchItem, destinationSearchItem]);

  function searchRoute() {
    fetch(`/api/tmap/searchRoute?version=1&format=json&callback=result`, {
      method: "POST",
      headers: {
        appkey: process.env.TMAP_APPKEY,
      },
      body: JSON.stringify({
        startX: sourceSearchItem.longitude,
        startY: sourceSearchItem.latitude,
        endX: destinationSearchItem.longitude,
        endY: destinationSearchItem.latitude,
        reqCoordType: "WGS84GEO",
        resCoordType: "WGS84GEO",
        startName: sourceSearchItem.placeName,
        endName: destinationSearchItem.placeName,
      }),
    })
      .then((res) => {
        switch (res.status) {
          case 200:
            return res.json();
          default:
            alert("경로를 찾을 수 없습니다.");
            break;
        }
      })
      .then((data) => {
        if (data) {
          setRouteInfo({
            totalDistance: data.features[0].properties.totalDistance,
            totalTime: data.features[0].properties.totalTime,
            totalDeclarationCount: 16,
            locationList: [
              {
                type: "INSIDE",
                riskMean: 0.7,
                countDeclaration: 3,
                percentageFromStart: 10,
              },
              {
                type: "OUTSIDE",
                riskMean: 1.5,
                countDeclaration: 8,
                percentageFromStart: 40,
              },
              {
                type: "INSIDE",
                riskMean: 2,
                countDeclaration: 5,
                percentageFromStart: 70,
              },
            ],
          });
          let newPoints = [];
          let newLines = [];
          data.features.forEach((element) => {
            if (element.geometry.type === "Point") {
              newPoints.push({
                lon: element.geometry.coordinates[0],
                lat: element.geometry.coordinates[1],
                circle: createCricle({
                  lon: element.geometry.coordinates[0],
                  lat: element.geometry.coordinates[1],
                }),
              });
            } else if (element.geometry.type === "LineString") {
              newLines.push({
                points: element.geometry.coordinates.map((val) => {
                  return {
                    lon: val[0],
                    lat: val[1],
                  };
                }),
                distance: element.properties.distance,
                line: cerateLine({
                  points: element.geometry.coordinates.map((val) => {
                    return {
                      lon: val[0],
                      lat: val[1],
                    };
                  }),
                }),
              });
            }
          });

          setPoints(newPoints);
          setLines(newLines);
        }
      });
  }

  const [points, setPoints] = useState([]);
  useEffect(() => {
    if (points.length > 0) {
      setPointsOnMap({ points });
      mapPostionReset({ points });
    }
  }, [points]);

  function setPointsOnMap({ points }) {
    points.forEach((point) => {
      point.circle.setMap(kakaoMap);
    });
  }

  const [lines, setLines] = useState([]);
  useEffect(() => {
    setLinesOnMap({ lines });
  }, [lines]);

  function setLinesOnMap({ lines }) {
    lines.forEach((line) => {
      line.line.setMap(kakaoMap);
    });
  }

  function createCricle({ lon, lat }) {
    return new window.kakao.maps.Circle({
      center: new window.kakao.maps.LatLng(lat, lon), // 원의 중심좌표 입니다
      radius: 10, // 미터 단위의 원의 반지름입니다
      // strokeWeight: 1, // 선의 두께입니다
      // strokeColor: "#75B8FA", // 선의 색깔입니다
      strokeOpacity: 0, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      // strokeStyle: "dashed", // 선의 스타일 입니다
      fillColor: "#4F4BEB", // 채우기 색깔입니다
      fillOpacity: 1, // 채우기 불투명도 입니다
    });
  }
  function cerateLine({ points }) {
    // 지도에 표시할 선을 생성합니다
    return new kakao.maps.Polyline({
      path: points.map((val) => new kakao.maps.LatLng(val.lat, val.lon)), // 선을 구성하는 좌표배열 입니다
      strokeWeight: 3, // 선의 두께 입니다
      strokeColor: "#4F4BEB", // 선의 색깔입니다
      strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "solid", // 선의 스타일입니다
    });
  }
  function mapPostionReset({ points }) {
    let bounds = new window.kakao.maps.LatLngBounds();
    points.forEach((point) => {
      bounds.extend(new kakao.maps.LatLng(point.lat, point.lon));
    });

    kakaoMap.setBounds(bounds);
  }

  const style = {
    map: {
      width: "100vw",
      height: "100vh",
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

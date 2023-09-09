import React, { useEffect, useState } from "react";
import {
  AppBar_Main,
  AppBar_RouteSelection,
} from "@/components/npwd/mapPage/topBar";
import {
  NavBar,
  PlaceDetail,
  RouteSearchResult,
  ReportList,
} from "@/components/npwd/mapPage/bottomBar";
import { defaultLatLon } from "@/public/constants/constant";
import { riskEnumTable } from "@/public/constants/enumTable";
import {
  getDistanceBetweenCoor,
  getCurrentPostion,
} from "@/public/functions/coordinate";
import { getCookie } from "@/public/functions/cookie";

export default function MapPage() {
  const [mode, setMode] = useState(0); // 0: 지도 | 1: 위치 상세 | 2: 신고내역 조회 | 3: 경로 선택 | 4: 네비게이션
  useEffect(() => {}, [mode]);

  const [currentLocation, setCurrentLocation] = useState(null);
  useEffect(() => {
    setMode(currentLocation !== null ? 1 : 0);
  }, [currentLocation]);

  const [sourceSearchItem, setSourceSearchItem] = useState(null);
  const [destinationSearchItem, setDestinationSearchItem] = useState(null);

  const [routeInfo, setRouteInfo] = useState(null);

  function searchLocation(callBackFuction, query) {
    fetch(`/api/kakao/map/searchByKeyword?query=${query}`, {
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data["documents"].length !== 0) {
          const resultList = data["documents"].map((val) => {
            return {
              placeName: val.place_name,
              latitude: parseFloat(val.y),
              longitude: parseFloat(val.x),
            };
          });
          callBackFuction(resultList);
        }
      });
  }

  function setCurrentSearchItemByCurrentLocation() {
    getCurrentPostion(
      (position) => {
        fetch(
          `/api/kakao/map/addressByCoor?x=${position.coords.longitude}&y=${position.coords.latitude}`,
          {
            headers: {
              Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.documents.length > 0) {
              searchLocation((resultList) => {
                setSourceSearchItem(resultList[0]);
              }, data.documents[0].address.address_name);
            }
          });
      },
      (error) => {
        alert(error);
      }
    );
  }

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
            sourceSearchItem={sourceSearchItem}
            destinationSearchItem={destinationSearchItem}
            setSourceSearchItem={setSourceSearchItem}
            setDestinationSearchItem={setDestinationSearchItem}
            searchLocation={searchLocation}
          />
        );
    }
  }

  function renderBottom() {
    switch (mode) {
      case 0:
        return <NavBar />;
      case 1:
        return (
          <PlaceDetail
            currentLocation={currentLocation}
            setMode={setMode}
            setDestinationSearchItem={setDestinationSearchItem}
            setCurrentSearchItemByCurrentLocation={
              setCurrentSearchItemByCurrentLocation
            }
          />
        );
      case 2:
        return (
          <ReportList currentLocation={currentLocation} setMode={setMode} />
        );
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
        mode={mode}
        setMode={setMode}
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
  mode,
  setMode,
}) {
  useEffect(() => {
    switch (mode) {
      case 0:
        clearMap();
        getPins();
      case 3:
        clearMap();
        break;
    }
  }, [mode]);
  function clearMap() {
    clusterer && clusterer.clear();
    clearCircleAndLines();
  }

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
  function getPins() {
    fetch("/api/guidely/api/location", {
      headers: {
        accessToken: getCookie("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLocationList(data);
      });
  }

  const [locationList, setLocationList] = useState([]);
  useEffect(() => {
    if (locationList.length > 0) {
      initClusterer({ minLevel: 5 });
    }
  }, [locationList]);
  useEffect(() => {
    if (clusterer && locationList.length > 0) {
      setMarker(locationList);
    }
  }, [clusterer, locationList]);

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
        if (mode === 1) {
          setMode(0);
        }
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
    if (nearlestDis !== undefined && nearlestDis.dis < 50) {
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
      clearMap();
      searchRoute();
    }
  }, [sourceSearchItem, destinationSearchItem]);

  async function getPinFromPoint({ lat, lon }) {
    return fetch(
      `/api/guidely/api/location/navigation?latitude=${lat}&longitude=${lon}`,
      {
        headers: {
          accessToken: getCookie("accessToken"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // riskMean: 0.7,
        // countDeclaration: 3,
        let totRiskMean = 0;
        let totCountDeclaration = 0;
        data.map((val) => {
          totCountDeclaration += val.countDeclaration;
          totRiskMean += val.riskMean;
        });
        setLocationList(data);
        return { totRiskMean, totCountDeclaration };
      });
  }

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
        startName: "출발지",
        endName: "도착지",
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
      .then(async (data) => {
        if (data) {
          let newPoints = [];
          let newLines = [];
          let newLocationList = [];
          let curDisAccum = 0;

          for (let element of data.features) {
            if (element.geometry.type === "Point") {
              newPoints.push({
                lon: element.geometry.coordinates[0],
                lat: element.geometry.coordinates[1],
                circle: createCricle({
                  lon: element.geometry.coordinates[0],
                  lat: element.geometry.coordinates[1],
                }),
              });
              const pinInfo = await getPinFromPoint({
                lat: element.geometry.coordinates[1],
                lon: element.geometry.coordinates[0],
              });

              if (pinInfo.totCountDeclaration > 0) {
                newLocationList.push({
                  type: "INSIDE",
                  riskMean: pinInfo.totRiskMean / pinInfo.totCountDeclaration,
                  countDeclaration: pinInfo.totCountDeclaration,
                  percentageFromStart:
                    (curDisAccum / data.features[0].properties.totalDistance) *
                    100,
                });
              }
            } else if (element.geometry.type === "LineString") {
              curDisAccum += element.properties.distance;
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
          }

          setPoints(newPoints);
          setLines(newLines);
          setRouteInfo({
            totalDistance: data.features[0].properties.totalDistance,
            totalTime: data.features[0].properties.totalTime,
            totalDeclarationCount: 16,
            locationList: newLocationList,
          });
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
  function clearCircleAndLines() {
    points.forEach((point) => {
      point.circle.setMap(null);
    });
    lines.forEach((line) => {
      line.line.setMap(null);
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

import React, { useState, useEffect } from "react";
import AppBar from "@/components/pwd/reportSearchPage/appbar";
//import SearchBar from "@/components/npwd/mapPage/searchBar"

// 멈춤 없는거
// import BottomBar from "@/components/pwd/reportSearchPage/bottomBar";

// 멈춤 있는거
import BottomBar from "@/components/pwd/signalPage/bottomBar";
import Path from "@/components/pwd/naviPage/pathinfo";
import Notif from "@/components/pwd/naviPage/notification";
import { getCookie } from "@/public/functions/cookie";

export default function PutLocation() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const sourceLat = url.searchParams.get("sourceLat");
    const sourceLon = url.searchParams.get("sourceLon");
    const destinationLat = url.searchParams.get("destinationLat");
    const destinationLon = url.searchParams.get("destinationLon");
    searchRoute({
      sourceLat,
      sourceLon,
      destinationLat,
      destinationLon,
    });

    if (sourceLat && sourceLon && destinationLat && destinationLon) {
    } else {
      alert("출발지와 목적지가 올바르지 않습니다.");
    }
  }, []);

  const [routeInfo, setRouteInfo] = useState([]); // 경로 정보

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
        return data;
      });
  }

  function searchRoute({
    sourceLat,
    sourceLon,
    destinationLat,
    destinationLon,
  }) {
    fetch(`/api/tmap/searchRoute?version=1&format=json&callback=result`, {
      method: "POST",
      headers: {
        appkey: process.env.TMAP_APPKEY,
      },
      body: JSON.stringify({
        startX: sourceLon,
        startY: sourceLat,
        endX: destinationLon,
        endY: destinationLat,
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
          let newRouteInfo = [];
          for (let element of data.features) {
            if (element.geometry.type == "Point") {
              newRouteInfo.push({
                type: "Path",
                info: element.properties.description,
              });
              getPinFromPoint({
                lat: element.geometry.coordinates[1],
                lon: element.geometry.coordinates[0],
              }).then((data) => {
                for (let dat in data) {
                  newRouteInfo.push({
                    type: "Notif",
                    info: dat.buildingName + ", " + dat.countDeclaration + "건",
                    location: dat,
                  });
                }
              });
            }
          }
          setRouteInfo(newRouteInfo);
        }
      });
  }

  const style = {
    background: {
      backgroundColor: "black",
    },

    backgrd: {
      backgroundColor: "black",
      zIndex: "0",
      overflow: "hidden",
    },
    bottomPart: {
      display: "flex",
      justifyContent: "center",
      alignItem: "center",
      height: "10vh",
      width: "100%",
      color: "white",
      backgroundColor: "black",
      zIndex: "1",
    },
    updownBtn: {
      display: "flex",
      //border: '1px solid white',
      fontSize: "17px",
      fontWeight: "300",
      margin: "0 7% 3% 7%",
    },
    previewIcon: {
      width: "15px",
      height: "22px",
      marginRight: "10px",
      transform: "rotate(90deg)",
    },
    nextIcon: {
      width: "15px",
      height: "22px",
      marginRight: "10px",
      transform: "rotate(-90deg)",
    },
  };

  const chunkSize = 6; // 세 개씩 묶기 위한 그룹 크기

  // 배열을 chunkSize 만큼씩 묶어주는 함수
  function chunkArray(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }

  return (
    <div style={style.background}>
      <AppBar></AppBar>
      <div style={style.backgrd}>
        {routeInfo.map((val, ind) => {
          if (val.type == "Path") {
            return <Path key={ind} info={val.info} />;
          }
        })}
      </div>
      <div style={{ height: "74px" }} />
      {/* <div style={style.bottomPart}>
        <div style={style.updownBtn}>
          <img src="/icons/left.svg" style={style.previewIcon} />
          이전목록
        </div>
        <div style={style.updownBtn}>
          <img src="/icons/left.svg" style={style.nextIcon} />
          다음목록
        </div>
      </div> */}
      <BottomBar
        beforeOnClick={() => {
          window.location.href = "/pwd/naviPage/putLocations";
        }}
      ></BottomBar>
    </div>
  );
}

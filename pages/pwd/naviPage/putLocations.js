import React, { useState } from "react";
import AppBar from "@/components/pwd/reportSearchPage/appbar";

// 멈춤 없는거
import BottomBar from "@/components/pwd/reportSearchPage/bottomBar";

// 멈춤 있는거
// import BottomBar from "@/components/pwd/signalPage/bottomBar";

export default function PutLocation() {
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

  const [sourceQuery, setSourceQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");
  const [sourceItem, setSourceItem] = useState(null);
  const [destinationItem, setDestinationItem] = useState(null);

  const style = {
    depart: {
      height: "18vh",
      width: "86%",
      backgroundColor: "#4F4BEB",
      color: "white",
      fontSize: "30px",
      fontWeight: "700",
      padding: "10% 7% 7% 7%",
    },
    arrival: {
      height: "18svh",
      width: "86%",
      backgroundColor: "#FCFF59",
      fontSize: "30px",
      fontWeight: "700",
      padding: "10% 7% 7% 7%",
    },
    getStart: {
      height: "30vh",
      width: "100%",
      backgroundColor: "black",
      display: "flex",
      alignText: "center",
      justifyContent: "center",
    },
    walkingIcon: {
      width: "22px",
      height: "44px",
      margin: "27% 5% 0 0",
    },
    getstartText: {
      color: "white",
      fontSize: "30px",
      fontWeight: "700",
      marginTop: "28%",
    },
    searchingW: {
      width: "90%",
      height: "20px",
      padding: "17px",
      fontSize: "20px",
      borderRadius: "20px",
      border: "none",
      margin: "4% 0 2% 0",
    },
    searchingB: {
      width: "90%",
      height: "20px",
      padding: "17px",
      fontSize: "20px",
      borderRadius: "20px",
      border: "none",
      margin: "4% 0 2% 0",
      backgroundColor: "black",
      color: "white",
    },
    nowLocation: {
      fontSize: "14px",
      fontWeight: "700",
      color: "white",
      backgroundColor: "black",
      width: "120px",
      height: "20px",
      display: "flex",
      justifyContent: "center",
      alignItem: "center",
      padding: "10px",
      borderRadius: "20px",
      marginTop: "10px",
    },
    searchIcons: {
      position: "absolute",
      right: "40px",
      marginTop: "30px",
      width: "23px",
      height: "23px",
    },
    searchbarCon: {
      display: "flex",
    },
  };
  return (
    <>
      <AppBar></AppBar>
      <div>
        <div style={style.depart}>
          출발지
          <br />
          <div style={style.searchbarCon}>
            <input
              style={style.searchingW}
              value={sourceItem ? sourceItem.placeName : sourceQuery}
              onChange={(val) => {
                setSourceQuery(val.target.value);
              }}
              onFocus={() => {
                setSourceItem(null);
              }}
            />
            <img
              src="/icons/search_big_black.svg"
              style={style.searchIcons}
              onClick={() => {
                searchLocation((resultList) => {
                  setSourceItem(resultList[0]);
                }, sourceQuery);
              }}
            />
          </div>
          <div style={style.nowLocation}>
            <img src="/icons/locationpin.svg" />
            현위치로 설정
          </div>
        </div>
        <div style={style.arrival}>
          목적지
          <br />
          <div style={style.searchbarCon}>
            <input
              style={style.searchingB}
              value={
                destinationItem ? destinationItem.placeName : destinationQuery
              }
              onChange={(val) => {
                setDestinationQuery(val.target.value);
              }}
              onFocus={() => {
                setDestinationItem(null);
              }}
            />
            <img
              src="/icons/search_white.svg"
              style={style.searchIcons}
              onClick={() => {
                searchLocation((resultList) => {
                  setDestinationItem(resultList[0]);
                }, destinationQuery);
              }}
            />
          </div>
        </div>
        <div
          style={style.getStart}
          onClick={() => {
            location.href = `/pwd/naviPage/naviPage?sourceLat=${sourceItem.latitude}&sourceLon=${sourceItem.longitude}&destinationLat=${destinationItem.latitude}&destinationLon=${destinationItem.longitude}`;
          }}
        >
          <img src="/icons/walking.svg" style={style.walkingIcon} />
          <div style={style.getstartText}>길안내시작</div>
        </div>
      </div>
      <BottomBar
        beforeOnClick={() => {
          window.location.href = "/pwd/homePage";
        }}
      />
    </>
  );
}

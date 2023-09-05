import React from "react";
import AppBar from "@/components/pwd/reportSearchPage/appbar";
//import SearchBar from "@/components/npwd/mapPage/searchBar"

// 멈춤 없는거
// import BottomBar from "@/components/pwd/reportSearchPage/bottomBar";

// 멈춤 있는거  
import BottomBar from "@/components/pwd/signalPage/bottomBar";
import Path from "@/components/pwd/naviPage/pathinfo";
import Notif from "@/components/pwd/naviPage/notification";


export default function PutLocation(){


  const style = {
    backgrd: {
      display: "fixed",
      backgroundColor: "black",
      height: "73svh",
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
    <>
      <AppBar></AppBar>
      <div style={style.backgrd}>
        <Path info="100m 직진 후 좌회전"></Path>
        <Notif info="100m 직진 후 좌회전"></Notif>
        <Path info="100m 직진 후 좌회전"></Path>
        <Path info="100m 직진 후 좌회전"></Path>
        <Notif info="100m 직진 후 좌회전"></Notif>
        <Notif info="100m 직진 후 좌회전"></Notif>
      </div>
      <div style={style.bottomPart}>
        <div style={style.updownBtn}>
          <img src="/icons/left.svg" style={style.previewIcon} />
          이전목록
        </div>
        <div style={style.updownBtn}>
          <img src="/icons/left.svg" style={style.nextIcon} />
          다음목록
        </div>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}
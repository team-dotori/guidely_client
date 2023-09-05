import React, { useEffect, useState } from "react";
import Badge from "@/components/npwd/myPage/badgePage/badge";
import BigBadge from "@/components/npwd/myPage/badgePage/represBadge";
import BadgeDetail from "@/components/npwd/myPage/badgePage/badgeDetail";
import ReactModal from "react-modal";
import AppBar from "@/components/npwd/myPage/badgePage/topBar";

function BadgePage() {

  const [badgeList, setBadgeList] = useState();
  const [ifDisabled, setifDisabled] = useState(undefined);

  useEffect(()=>{
    fetch("/api/guidely/api/users/badges", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // JSON 데이터가 파싱되어 data 변수에 저장됨
        console.log(data)
        if (data !== undefined){
          setBadgeList(data.map((val)=>{
            console.log(val);
            return val;
          }))
        } else{
          console.log("데이터를 가져오는 중 오류 발생");
        }
  
      })
    },[])


    useEffect(()=>{
      console.log(badgeList);
    }, [badgeList])
  


  const bigbadge = {
    name: "이달의 신입사원",
    date: "2023.08.22",
    badgeImageName: "nonewbieKing",
    level: 3,
  };
  const badges = [
    {
      name: "병아리",
      date: badgeList[0].collectData,
      badgeImageName: "nonewbieKing",
      acq: badgeList[0].state,
      level: acq ? badgeList[0].level : "",
    },
    { name: "신고 5회", 
      date: badgeList[1].collectData,
      badgeImageName: "exploreKing", 
      acq: badgeList[1].state,
      level: acq ? badgeList[1].level : "",
    },
    {
      name: "소통 5회",
      date: badgeList[2].collectData,
      badgeImageName: "communicate",
      acq: badgeList[2].state,
      level: acq ? badgeList[2].level : "",
    },
    { name: "점자왕", 
      date: badgeList[3].collectData,
      badgeImageName: "dotKing", 
      acq: badgeList[3].state,
      level: acq ? badgeList[3].level : "",
    },
    {
      name: "초보탈출",
      date: badgeList[4].collectData,
      badgeImageName: "nonewbieKing",
      acq: badgeList[4].state,
      level: acq ? badgeList[4].level : "",
    },
    {
      name: "빠른성장상",
      date: badgeList[5].collectData,
      badgeImageName: "growingKing",
      acq: badgeList[5].state,
      level: acq ? badgeList[5].level : "",
    },
    {
      name: "안전지킴이",
      date: badgeList[6].collectData,
      badgeImageName: "safeKing",
      acq: badgeList[6].state,
      level: acq ? badgeList[6].level : "",
    },
    {
      name: "콜럼버스",
      date: badgeList[7].collectData,
      badgeImageName: "unnamed1",
      acq: badgeList[7].state,
      level: acq ? badgeList[7].level : "",
    },
    {
      name: "몰라...",
      date: badgeList[8].collectData,
      badgeImageName: "unnamed2",
      acq: badgeList[8].state,
      level: acq ? badgeList[8].level : "",
    },
    // 더 많은 뱃지 데이터 추가 가능
  ];

  const chunkSize = 3; // 세 개씩 묶기 위한 그룹 크기

  // 배열을 chunkSize 만큼씩 묶어주는 함수
  function chunkArray(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }

  const badgeGroups = chunkArray(badges, chunkSize);
  const [isOpen, setIsOpen] = useState(false);
  const [openedData, setOpenedData] = useState(null);

  const style = {
    hrstyle: {
      width: "100%",
      margin: "0px",
      borderTop: "0.3px solid lightgray",
    },
    modal: {
      position: "absolute",
      inset: "60% 0 0 50%",
      transform: "translateX(-50%)", // 모달을 가로 방향으로 중앙 정렬
      width: "100%",
      height: "40%",
      borderRadius: "13.5px 13.5px 0 0",
      backgroundColor: "white",
      border: "none",
      boxShadow: "-4px -4px 8px rgba(0, 0, 0, 0.2)",
      boxSizing: "border-box",
      paddingTop: "5%",
    },
    bar: {
      marginTop: "10vh",
    },
  };

  return (
    <div>
      <AppBar pagename="활동배지" />
      <div style={style.bar} />
      <BigBadge
        name={bigbadge.name}
        date={bigbadge.date}
        badgeImageName={bigbadge.badgeImageName}
        level={bigbadge.level}
      />
      {/* {레벨 어쩔거???} */}
      <hr style={style.hrstyle} />
      {badgeGroups.map((group, index) => (
        <div key={index} style={{ display: "flex", justifyContent: "center" }}>
          {group.map((badge, badgeIndex) => (
            <Badge
              key={badgeIndex}
              name={badge.name}
              date={badge.date}
              badgeImageName={badge.badgeImageName}
              acq={badge.acq}
              level={badge.level}
              setIsOpen={setIsOpen}
              setOpenedData={setOpenedData}
            />
          ))}
        </div>
      ))}

      <ReactModal
        isOpen={isOpen}
        style={{ content: style.modal }}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setIsOpen((old) => !old)}
      >
        {openedData && (
          <BadgeDetail
            name={openedData.name}
            level={openedData.level}
            badgeImageName={openedData.badgeImageName}
            acq={openedData.acq}
          />
        )}
      </ReactModal>
    </div>
  );
}

export default BadgePage;

import React from "react";

export default function PlaceDetail() {
  const style = {
    container: {
      display: "flex",
      flexDirection: "column",
      textAlign: "left",
      width: "100%",
      height: "90%",
    },
    placeTitle: {
      fontSize: "18px",
      fontWeight: "700",
      paddingBottom: "3%",
    },
    address: {
      display: "flex",
      fontSize: "13px",
      paddingBottom: "4%",
      color: '#4B4B4B'
    },
    reportInfo: {
      display: "flex",
      fontSize: "13px",
      paddingBottom: "4%",
      fontWeight: '600',
      color: '#181818'
    },
    btnArr: {
      display: "flex",
      border: "1px solid gray",
      margin: "auto",
      width: "100%",
      height: "fit-content",
    },
    btn: {
      flex: 1,
      textAlign: "center",
      borderRight: "1px solid gray",
      fontSize: "10px",
      display: "flex", // 아이콘과 텍스트를 함께 표시하기 위해 추가
      flexDirection: "column", // 아이콘 위에 텍스트 배치를 위해 추가
      alignItems: "center", // 아이콘과 텍스트를 가운데 정렬
      paddingTop: "7px",
      paddingBottom: "5px",
    },
    lastBtn: {
      flex: 1,
      textAlign: "center",
      fontSize: "10px",
      display: "flex", // 아이콘과 텍스트를 함께 표시하기 위해 추가
      flexDirection: "column", // 아이콘 위에 텍스트 배치를 위해 추가
      alignItems: "center", // 아이콘과 텍스트를 가운데 정렬
      paddingTop: "5px",
      paddingBottom: "1px",
    },
    icon: {
      marginBottom: "5px", // 아이콘 아래 여백 조정
    },

    reportMark: {
      width: "16px",
      height: "16px",
      backgroundColor: "#FF6A61",
      borderRadius: "8px 8px 8px 0",
      textAlign: "center",
      border: "1px solid #181818",
      margin: "0 5px 0 0",
    },
  };

  return (
    <div style={style.container}>
      <div style={style.placeTitle}>카카오 근린공원</div>
      <div style={style.address}>주소 어쩌고 저쩌고 대구광역시</div>
      <div style={style.reportInfo}>
        <div style={style.reportMark}>0</div>
        **개의 신고가 있는 장소입니다.</div>
      <div style={style.btnArr}>
        <div style={style.btn}>
          <img src="/icons/reportlist.svg" style={style.icon} alt="신고내역 아이콘" />
          신고내역
        </div>
        <div style={style.btn}>
          <img src="/icons/report.svg" style={style.icon} alt="신고하기 아이콘" />
          신고하기
        </div>
        <div style={style.lastBtn}>
          <img src="/icons/arrival.svg" style={style.icon} alt="목적지 설정 아이콘" />
          목적지 설정
        </div>
      </div>
    </div>
  );
}

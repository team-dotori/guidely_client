import React, { useState } from "react";

export default function NavBar() {
  const style = {
    container: {
      position: 'absolute',
      width: '100%',
      height: '10%',
      backgroundColor: 'white',
      top: '90%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '13.5px 13.5px 0 0',
    },

    button: {
      width: '15%',
      margin: '5px',
      padding: '10px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      fontSize: '10px',
      display: 'flex', // 요소들을 가로로 배치하는 속성 추가
      flexDirection: 'column', // 요소들을 세로로 정렬하기 위한 속성 추가
      alignItems: 'center', // 가운데 정렬
      textAlign: 'center', // 가운데 정렬
    },
    iconstyle: {
      marginBottom: '10px',
      height: '20px'
    },
    Bbutton: {
      border: 'none',
      backgroundColor: 'transparent',
      margin: '0 10px',
      padding: '5px 10px',
      cursor: 'pointer',
      marginBottom: '30px',
      display: 'flex', // 요소들을 가로로 배치하는 속성 추가
      flexDirection: 'column', // 요소들을 세로로 정렬하기 위한 속성 추가
      alignItems: 'center', // 가운데 정렬
      textAlign: 'center', // 가운데 정렬
    },
    Bimg:{
      marginBottom: '12px',
      width: '55px'
    },
    buttonText:{
      fontSize : '10px',
      marginBottom: '10px'
    }

  };

  return (
    <div style={style.BtmPadding}>
      <div style={style.container}>
        {/* 지도버튼 */}
        <button style={style.button}>
          <img src="/icons/navbar/map.svg" style={style.iconstyle} />
          <div style={style.buttonText}>지도</div>
        </button>
        {/* 게시판버튼 */}
        <button style={style.button}>
          <img src="/icons/navbar/board.svg" style={style.iconstyle} />
          <div style={style.buttonText}>게시판</div>
        </button>
        {/* 점자스캔 버튼 */}
        <button style={style.Bbutton}>
          <img
            style={style.Bimg}
            src="/icons/navbar/dotscanner.svg"
            alt="Guidely Icon"/>
          <div style={style.buttonText}>GUIDELY</div>
        </button>
        {/* 신고버튼 */}
        <button style={style.button}>
          <img src="/icons/navbar/report.svg" style={style.iconstyle} />
          <div style={style.buttonText}>신고</div>
        </button>
        {/* 내정보 버튼 */}
        <button style={style.button}>
          <img src="/icons/navbar/myinfo.svg" style={style.iconstyle} />
          <div style={style.buttonText}>내정보</div>
        </button>
      </div>
    </div>
  );
}

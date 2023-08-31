import React, { useState} from "react";

export default function NavBar() {
  const [activeButton, setActiveButton] = useState(null);

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
      borderRadius:'13.5px 13.5px 0 0'
    },
    button: {
      margin: '0 10px', // 조정 가능한 간격
      padding: '5px 10px', // 버튼 내용과 여백 조정 가능
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      width: 'fit-content',
      backgroundColor: 'transparent'
    },

    activeButtonStyle:{
      fontWeight: '700',
    },

    Bbutton:{
      border: 'none',
      backgroundColor: 'transparent',
      margin: '0 10px', // 조정 가능한 간격
      padding: '5px 10px', // 버튼 내용과 여백 조정 가능
      cursor: 'pointer',
    },
  };
  const handleButtonClick = (buttonName) =>{
    setActiveButton(buttonName);
  }

  return (
    <div>
      <div style={style.container}>
        {/* 지도버튼 */}
          <button
            style={{
            ...style.button,
            ...(activeButton === 'map' && style.activeButtonStyle), // 버튼이 눌려지면 스타일 변경
            }}
            onClick={() => handleButtonClick('map')}>
          <img
            src="/icons/navbar/map.svg"/>
          <div>지도</div></button>

        {/* 게시판버튼 */}
        <button style={{
            ...style.button,
            ...(activeButton === 'map' && style.activeButtonStyle), // 버튼이 눌려지면 스타일 변경
            }}
            onClick={() => handleButtonClick('map')}>
          <img
            src="/icons/navbar/board.svg"/>
          <div>게시판</div></button>
        {/* 점자스캔 버튼 */}
        <button style={style.Bbutton}>
        <img
            src="/icons/navbar/dotscanner.svg"/>
          <div>GUIDELY</div></button>
        {/* 신고버튼 */}
        <button style={style.button}>
          <img
            src="/icons/navbar/report.svg"/>
        <div>신고</div></button>
        {/* 내정보 버튼 */}
        <button style={style.button}>
          <img
            src="/icons/navbar/myinfo.svg"/>
          <div>내정보</div></button>
      </div>
    </div>
  );
}

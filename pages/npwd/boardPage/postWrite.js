import React, {useState} from "react";
import AppBar from "@/components/npwd/boardPage/topBar";
import CatBar from "./catBar"


export default function postWrite () {
    const [selectedButton, setSelectedButton] = useState(null);
    const pressed = selectedButton;


    const style={
        container1:{
            display:  pressed ? 'none' : '',
            width: '80%',
            height: '100px',
            backgroundColor: '#fcfcfc',
            // border: '1px solid gray',
            margin: 'auto',
            borderRadius: '20px',
            textAlign: 'center',
            paddingTop: '10%',
            paddingBottom: '5%',
            marginTop:'5%'
        },
        bigTitle:{
            color: '#000',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: 'normal',
            marginBottom: '2%'
        },
        smallTitle:{
            color: '#000',
            fontSize: '13px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
            marginBottom: '5%',
            marginTop: '3%'
        },
        btns:{
            // width: '77px',
            height: '36px',
            margin: '2%',
            border: 'none',
            borderRadius: '19px',
            padding: '0 10% 0 10%',
        },
        selectedBtn: {
            backgroundColor: "#4F4BEB", // 선택된 버튼의 색상을 여기에 설정하세요.
            color: "#F8F9FA", // 선택된 버튼의 텍스트 색상
        },


        btnCont:{
            paddingLeft: '2%',
            width: '90%'
        },

        newbtns:{
            // width: '77px',
            height: '36px',
            margin: '3% 2% 3% 2%',
            border: 'none',
            borderRadius: '19px',
            // padding: '0 5% 0 5%',
            width: '45px'
        },

        textContainer:{
            width: '80%',
            height: '200px',
            backgroundColor: '#F8F9FA',
            border: 'none',
            borderRadius: '20px',
            //textAlign: 'center',
            fontWeight: '600',
            fontSize: '16px',
            padding: '0 5% 0 5%',
            margin: '0 5% 0 5%'
        },

        cntl:{
            display:  pressed ? '' : 'none',
        },

        changeColor:{
            filter: 'brightness(0) invert(1)',
       },

       submitBtn:{
        width : '116px',
        height: '36px',
        display: 'flex',
        padding: '11px 32px',
        justifyContent: 'center',
        alignItems: 'center',
        //gap: '49px',
        border: 'none',
        borderRadius: '19px',
        backgroundColor: '#C9CCD4',
        marginLeft: '65%',
        marginTop: '2%'
       }
    };

    const handleButtonClick = (buttonName) => {
            setSelectedButton(buttonName);
          };

    console.log(pressed)


    
    return (
      <>
        <AppBar pagename={"게시글 작성"}></AppBar>
        <CatBar></CatBar>
        <div style={style.container1}>
          <div style={style.bigTitle}>게시글 작성 유형을 선택해주세요.</div>
          <div style={style.smallTitle}>다양한 방법으로 소통해보세요 !</div>
          <div>
            <button
              style={{
                ...style.btns,
                ...(selectedButton === "text" && style.selectedBtn), // 선택된 버튼일 때 스타일을 적용
              }}
              onClick={() => handleButtonClick("text")}>
              글
            </button>
            <button
              style={{
                ...style.btns,
                ...(selectedButton === "voice" && style.selectedBtn), // 선택된 버튼일 때 스타일을 적용
              }}
              onClick={() => handleButtonClick("voice")}>
              음성
            </button>
          </div>
        </div>
        <div style={style.cntl}>
          <div style={style.btnCont}>
            <button
              style={{
                ...style.newbtns,
                ...(selectedButton === "text" && style.selectedBtn), // 선택된 버튼일 때 스타일을 적용
              }}
              onClick={() => handleButtonClick("text")}>
              <img src="/icons/edit.svg" style={pressed === "text" ? style.changeColor : null} />
            </button>
            <button
              style={{
                ...style.newbtns,
                ...(selectedButton === "voice" && style.selectedBtn), // 선택된 버튼일 때 스타일을 적용
              }}
              onClick={() => handleButtonClick("voice")}>
              <img src="/icons/voice.svg" style={pressed === "voice" ? style.changeColor : null}/>
            </button>
          </div>
          <input style={style.textContainer}></input>
          <button style={style.submitBtn}>작성완료</button>
        </div>
      </>
    );
}
import React, { useEffect, useState } from "react";
import TruncatedText from "./TruncatedText";
import Image from "next/image";

export default function Post({ text, id, time, type, count, picurl }) {
  const [isLiked, setIsLiked] = useState(false);

  const style = {
    postbox: {
      backgroundColor: "#F1F3F5",
      width: "70vw",
      height: "120px",
      margin: "auto",
      marginBottom: "5%",
      borderRadius: "20px",
      padding: "4%",
    },
    profilebox: {
      display: "flex",
      alignItems: "center",
      height: "40px",
      marginTop: "0",
    },
    profile: {
      display: "flex",
      backgroundColor: "#4F4BEB",
      width: "30px",
      height: "30px",
      borderRadius: "15px",
      marginRight: "10px",
    },
    userid: {
      fontFamily: "Pretendard",
      fontWeight: "700",
      fontSize: "14px",
      whiteSpace: "nowrap",
      display: "inline",
      marginRight: "auto",
    },
    deleteButton: {
      border: "none",
    },
    contents: {
      paddingTop: "0.5%",
      paddingBottom: "5%",
      height: "37px",
      fontSize: "13px",
    },
    soundimgBox: {
      position: "relative",
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      marginTop: "7%",
    },
    soundimg: {
      flex: 1,
      position: "absolute",
      marginRight: "5px",
      marginLeft: "5px",
    },
  };

  const imgstyle = {
    maxWidth: "100%",
    maxHeight: "100%",
  };

  const bottomstyle = {
    display: "flex",
    justifyContent: "space-between",

    date: {
      fontSize: "11px",
      flex: 1,
      textAlign: "left",
    },
    heart: {
      flex: 1,
      textAlign: "right",
      cursor: "pointer",
    },
    heartcnt: {
      textAlign: "right",
      fontSize: "11px",
      opacity: "0.8",
      padding: "1%",
      fontWeight: "300",
    },
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div style={style.postbox}>
      <div style={style.profilebox}>
        <div style={style.profile}>
          {/* <img src={picurl} style={imgstyle} alt="pf" /> */}
        </div>
        <p style={style.userid}>
          <strong>{id}</strong>
        </p>
        <button style={{ ...style.deleteButton, display: "" }}>
          <Image
            src="/icons/cancel.svg"
            width={10}
            height={10}
            alt="삭제하기"
          />
        </button>
      </div>
      <hr></hr>
      <div style={style.contents}>
        {type === "text" ? (
          <TruncatedText text={text} maxLength={30} />
        ) : (
          <div style={style.soundimgBox}>
            <img style={style.soundimg} src="/img/nocolorLine.svg" />
            <img style={style.soundimg} src="/img/coloredLine.svg" />
          </div>
        )}
      </div>
      <div style={bottomstyle}>
        <div style={bottomstyle.date}>{time}</div>
        <div style={bottomstyle.heartcnt}>{count}</div>
        <div style={style.heart} onClick={handleLikeClick}>
          {isLiked ? (
            <img
              src="/img/blueheart.svg"
              alt="Heart1"
              style={{ width: "20px", height: "20px" }}
            />
          ) : (
            <img
              src="/img/whiteheart.svg"
              alt="Heart2"
              style={{ width: "20px", height: "20px" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

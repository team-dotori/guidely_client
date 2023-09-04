import React, { useState } from "react";
import TruncatedText from "@/components/npwd/boardPage/TruncatedText";


export default function Post({ text, id, time, type, count, picurl }) {
  const [isLiked, setIsLiked] = useState(false);

  const style = {
    postbox: {
      backgroundColor: "#F1F3F5",
      width: "80vw",
      height: "150px",
      margin: "auto",
      marginBottom: "5%",
      borderRadius: "20px",
      padding: "5%",
    },
    profilebox: {
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      height: "40px",
      gridColumnGap: "10px",
      marginTop: "0",
    },
    profile: {
      width: "40px",
      height: "40px",
    },
    userid: {
      fontFamily: "InterBold",
      fontSize: "14px",
      marginTop: "10px",
      whiteSpace: "nowrap",
      display: "inline",
      fontWeight: '700'
    },
    contents: {
      //display: type === "sound" ? "none": null,
      height: "50px",
      fontSize: "24px",
      fontWeight: '400',
      marginBottom: type === "sound" ? '0':'10%',
    },
    soundimgBox: {
      position: "relative",
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      marginTop: "10%",
    },
    soundimg: {
      //flex: 1,
      position: "absolute",
      top: '0px',
      margin: '0 5px 30px 5px'
    },
  };

  const imgstyle = {
    maxWidth: "100%",
    maxHeight: "100%",
  };

  const bottomstyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: '10px',

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
    heartcnt:{
      textAlign: "right",
      fontSize: '11px',
      opacity: '0.8',
      padding: '1%',
      fontWeight: '300'
    }
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div style={style.postbox}>
      <div style={style.profilebox}>
        <div style={style.profile}>
          <img src={picurl} style={imgstyle} alt="pf" />
        </div>
        <p style={style.userid}>
          <strong>{id}</strong>
        </p>
      </div>
      <hr></hr>
      <div style={style.contents}>
        {type === "text" ? (
          <TruncatedText text={text} maxLength={37} />
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

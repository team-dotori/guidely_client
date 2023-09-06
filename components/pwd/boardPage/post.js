import React, { useRef, useState } from "react";
import TruncatedText from "@/components/npwd/boardPage/TruncatedText";

export default function Post({
  toDetail,
  text,
  id,
  time,
  type,
  count,
  picurl,
  mode,
}) {
  const [isLiked, setIsLiked] = useState(false);

  const [isOnPlay, setIsOnPlay] = useState(false);
  function toggleIsOnPlay() {
    setIsOnPlay(!isOnPlay);
  }
  const handlePlayClick = () => {
    if (isOnPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };
  const audioRef = useRef(null);

  const style = {
    postbox: {
      backgroundColor: mode === "detail" ? "#FCFF59" : "#F1F3F5",
      width: "80vw",
      height: "auto",
      margin: "auto",
      marginBottom: "5%",
      borderRadius: "20px",
      padding: "5%",
    },
    profilebox: {
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      height: "30px",
      gridColumnGap: "10px",
      marginTop: "0",
      marginBottom: "1%",
    },
    profile: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "black",
    },
    userid: {
      fontFamily: "InterBold",
      fontSize: "14px",
      marginTop: "10px",
      whiteSpace: "nowrap",
      display: "inline",
      fontWeight: "700",
    },
    contents: {
      //display: type === "sound" ? "none": null,
      height: "auto",
      fontSize: "24px",
      fontWeight: "400",
      lineHeight: "28px",
      marginBottom: type === "sound" ? "0" : "5%",
    },
    soundBox: {
      position: "relative",
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      marginTop: "7%",
    },

    soundBtn: {
      border: "none",
      backgroundColor: "black",
      color: "white",
      fontSize: "14px",
      fontWeight: "700",
      padding: "3% 5% 3% 5%",
      borderRadius: "20px",
      margin: "1%",
      width: "50%",
    },
    iconStyle: {
      width: "13px",
      height: "13px",
      margin: "0% 10% 0 0",
      //alignItems: "center",
      //justifyContent: "center",
    },
    hrStyle: {
      width: "80vw",
      border: "0.5px solid black",
      marginTop: "5%",
    },
  };

  const imgstyle = {
    maxWidth: "100%",
    maxHeight: "100%",
  };

  const bottomstyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",

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
      <div style={style.profilebox} onClick={toDetail}>
        <div style={style.profile}>
          {/* <img src={picurl} style={imgstyle} alt="pf" /> */}
        </div>
        <p style={style.userid}>
          <strong>{id}</strong>
        </p>
      </div>
      <hr style={style.hrStyle} />
      <div style={style.contents}>
        {type === "text" ? (
          mode === "list" ? (
            <TruncatedText text={text} maxLength={37} />
          ) : (
            <div>{text}</div>
          )
        ) : type === "sound" ? (
          <div style={style.soundBox}>
            {!isOnPlay ? (
              <button style={style.soundBtn} onClick={handlePlayClick}>
                <img style={style.iconStyle} src="/icons/play.svg" />
                게시물 듣기
              </button>
            ) : (
              <button style={style.soundBtn} onClick={handlePlayClick}>
                <img src="/icons/pause.svg" style={style.iconStyle} />
                듣기 멈춤
              </button>
            )}{" "}
            <audio
              src={text}
              ref={audioRef}
              onPlay={toggleIsOnPlay}
              onPause={toggleIsOnPlay}
            />
          </div>
        ) : null}
      </div>

      <div style={bottomstyle}>
        <div style={bottomstyle.date}>{time}</div>
        <div style={bottomstyle.heartcnt}>{count}</div>
        <div
          style={style.heart}
          onClick={mode === "list" ? null : handleLikeClick}
        >
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

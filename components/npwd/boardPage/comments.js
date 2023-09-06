import React, { useRef, useState } from "react";
import Image from "next/image";

export default function Comments({
  userid,
  timeinfo,
  contents,
  type,
  heartcnt,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const style = {
    whole: {
      display: "flex",
      margin: "5% 0 5% 3%",
    },
    container: {
      marginLeft: "3%",
      width: "70%",
    },
    profile: {
      display: "flex",
      backgroundColor: "#FCFF59",
      width: "30px",
      height: "30px",
      borderRadius: "15px",
      margin: "1% 0 0 5%",
    },
    topPart: {
      display: "flex",
      alignItems: "center",
    },
    username: {
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "normal",
      opacity: "0.8",
    },
    timeinfo: {
      fontSize: "11px",
      fontStyle: "normal",
      fontWeight: "300",
      lineHeight: "normal",
      opacity: "0.6",
      marginLeft: "5%",
    },
    contents: {
      fontSize: "13px",
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: "normal",
      margin: "4% 0 4% 0",
    },
    audioBox: {
      display: "flex",
      alignItems: "center",
      margin: "4% 0 4% 0",
    },

    bottomPart: {
      display: "flex",
    },
    heartcnt: {
      textAlign: "right",
      fontSize: "11px",
      opacity: "0.8",
      padding: "1%",
      fontWeight: "300",
    },
    reply: {
      fontSize: "11px",
      fontStyle: "normal",
      fontWeight: "300",
      lineHeight: "normal",
      opacity: "0.6",
      padding: "1%",
      marginLeft: "10%",
    },
    heart: {},
  };

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

  return (
    <div style={style.whole}>
      <div style={style.profile}></div>
      <div style={style.container}>
        <div style={style.topPart}>
          <div style={style.username}>{userid}</div>
          <div style={style.timeinfo}>{timeinfo}</div>
        </div>
        {type === "text" ? (
          <div style={style.contents}>{contents}</div>
        ) : (
          <div style={style.audioBox}>
            {isOnPlay ? (
              <Image
                src="/icons/pause_blue.svg"
                alt="일시정지"
                width={11.14}
                height={13}
                onClick={handlePlayClick}
              />
            ) : (
              <Image
                src="/icons/play.svg"
                alt="재생"
                width={11.14}
                height={13}
                onClick={handlePlayClick}
              />
            )}{" "}
            <div style={{ width: "13.86px" }} />
            <Image
              src="/icons/audio.svg"
              alt="음성 파일"
              width={59}
              height={19.44}
            />
            <audio
              src={contents}
              ref={audioRef}
              onPlay={toggleIsOnPlay}
              onPause={toggleIsOnPlay}
            />
          </div>
        )}
        {/* <div style={style.bottomPart}>
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
          <div style={style.heartcnt}>{heartcnt}</div>
          <div style={style.reply}>답글달기</div>
        </div> */}
      </div>
    </div>
  );
}

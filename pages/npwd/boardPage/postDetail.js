import React, { useState, useEffect } from "react";
import AppBar from "@/components/npwd/boardPage/topBar";
import TruncatedText from "@/components/npwd/boardPage/TruncatedText";
import Comment from "@/components/npwd/boardPage/comments";
import PutComm from "@/pages/npwd/boardPage/inputComment"


export default function Post({ text, userid, time, type, count, picurl }) {
  const [isLiked, setIsLiked] = useState(false);

  const comment = [
    {
        userid:"아이디",
        timeinfo:"1분전",
        contents:"어쩌고 저쩌고",
        heartcnt: "1개"
    },
    {
        userid:"아이디",
        timeinfo:"1분전",
        contents:"어쩌고 저쩌고",
        heartcnt: "1개"
    },
    {
        userid:"아이디",
        timeinfo:"1분전",
        contents:"어쩌고 저쩌고",
        heartcnt: "1개"
    },
    {
        userid:"아이디",
        timeinfo:"1분전",
        contents:"어쩌고 저쩌고",
        heartcnt: "1개"
    },
    {
      userid:"아이디",
      timeinfo:"1분전",
      contents:"어쩌고 저쩌고",
      heartcnt: "1개"
  },
  {
    userid:"아이디",
    timeinfo:"1분전",
    contents:"어쩌고 저쩌고",
    heartcnt: "1개"
  },


  ]

  const style = {
    postbox: {
      marginTop: "25%",
      // backgroundColor: "#F1F3F5",
      height: "120px",
      marginBottom: "5%",
      padding: "4%",
    },
    profilebox: {
      padding: "0 5% 0 5%",
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
    },
    contents: {
      padding: "5% 5% 7% 5%",
      height: "max-content",
      fontSize: "16px",
      fontWeight: "400",
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
    borderRadius: "20px"
  };

  const bottomstyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: '3%',
    padding: "0 10% 0 5%",
 
    time: {
      fontSize: "11px",
      flex: 1,
      textAlign: "left",
      marginLeft: '4%'
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
    hrStyle: {
      margin: "auto",
      width: "100%",
      border: "0.3px solid rgba(0, 0, 0, 0.25)", // 수정
    },
    commTitle: {
      fontFamily: "Inter",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "normal",
      margin: "6% 0 10% 8%",
    },
  };

  const inputstyle={
    position: 'fixed',
    bottom: 0, // 화면 아래에 고정
    width: '100%',
    backgroundColor: 'white', // 원하는 배경색 설정
    padding: '10px', // 원하는 패딩 설정
    borderTop: '1px solid #ccc', // 상단 경계선 설정
  }

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };


  return (
    <>
      <AppBar pagename={"자세히보기"}></AppBar>
      <div style={style.postbox}>
        {/* 게시물 데이터를 사용하여 렌더링 */}
        <div style={style.profilebox}>
          <div style={style.profile}>
            <img src='/img/haerin.jpeg' style={imgstyle} alt="pf" />
          </div>
          <p style={style.userid}>
            <strong>아이디</strong>
          </p>
        </div>
        <div style={style.contents}>
          {/* {type === "text" ? (
            <TruncatedText text="hi" maxLength={30} />
          ) : (
            <div style={style.soundimgBox}>
              <img style={style.soundimg} src="/img/nocolorLine.svg" />
              <img style={style.soundimg} src="/img/coloredLine.svg" />
            </div>
          )} */}
          hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi
        </div>
      </div>
        <div style={bottomstyle}>
          <div style={bottomstyle.time}>time</div>
          <div style={bottomstyle.heartcnt}>count</div>
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
        <hr style={bottomstyle.hrStyle} />
        <div style={bottomstyle.commTitle}>댓글</div>
        {/* 댓글 데이터를 사용하여 렌더링 */}
        {comment.map((comment, index) => (
          <Comment
            key={index}
            userid={comment.userid}
            timeinfo={comment.timeinfo}
            contents={comment.contents}
            heartcnt={comment.heartcnt}
          />
        ))}
        <div style={{height:'20px'}}/>
        <PutComm></PutComm>
    </>
  );
}
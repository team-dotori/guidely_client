import React, { useState, useEffect, useRef } from "react";
import AppBar from "@/components/npwd/boardPage/topBar";
import TruncatedText from "@/components/npwd/boardPage/TruncatedText";
import Comment from "@/components/npwd/boardPage/comments";
import PutComm from "@/components/npwd/boardPage/inputComment";
import { parsePassedTimeToString } from "@/public/functions/time";

export default function Post() {
  const [isLiked, setIsLiked] = useState(false);

  const [curPost, setCurPost] = useState(null);
  const [commentList, setCommentList] = useState(null);
  const [curLikeCount, setCurLikeCount] = useState(null);

  const [postId, setPostId] = useState(-1);

  useEffect(() => {
    setPostId(new URL(window.location.href).searchParams.get("postId"));
  }, []);

  useEffect(() => {
    if (postId === -1) return;
    if (postId === null) return alert("알 수 없는 게시글입니다.");

    fetch(`/api/guidely/api/posts/${postId}`)
      .then((res) => res.json())
      .then((res) => {
        setCurPost(res);
      });

    fetch(`/api/guidely/api/posts/${postId}/comments`)
      .then((res) => res.json())
      .then((res) => {
        setCommentList(res);
      });

    fetch(`/api/guidely/api/heart/posts/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: getCookie("userId"),
        postId: postId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setIsLiked(res.alreadyLike);
      });
  }, [postId]);

  useEffect(() => {
    if (curPost === null) return;
    setCurLikeCount(curPost.likeCount);
  }, [curPost]);

  function setLike() {
    fetch("/api/guidely/api/heart/posts", {
      method: isLiked ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: getCookie("userId"),
        postId: curPost.postId,
      }),
    }).then((res) => {
      switch (res.status) {
        case 200:
        case 201:
          setIsLiked(!isLiked);
          setCurLikeCount(curLikeCount + (isLiked ? -1 : 1));
          break;
      }
    });
  }

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
      display: "flex",
      backgroundColor: "#4F4BEB",
      width: "30px",
      height: "30px",
      borderRadius: "15px",
      margin: "1% 0 0 5%",
    },
    userid: {
      fontFamily: "Pretendard",
      fontWeight: "700",
      fontSize: "14px",
      marginTop: "10px",
      whiteSpace: "nowrap",
      display: "inline",
      fontWeight: "700",
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
    borderRadius: "20px",
  };

  const bottomstyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "3%",
    padding: "0 10% 0 5%",

    time: {
      fontSize: "11px",
      flex: 1,
      textAlign: "left",
      marginLeft: "4%",
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
      fontFamily: "Pretendard",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "normal",
      margin: "6% 0 10% 8%",
    },
  };

  const inputstyle = {
    position: "fixed",
    bottom: 0, // 화면 아래에 고정
    width: "100%",
    backgroundColor: "white", // 원하는 배경색 설정
    padding: "10px", // 원하는 패딩 설정
    borderTop: "1px solid #ccc", // 상단 경계선 설정
  };

  const handleLikeClick = () => {
    setLike();
  };

  const audioRef = useRef(null);
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

  return (
    <div>
      <AppBar
        pagename={"자세히보기"}
        onBackClick={() => {
          location.href = "/npwd/boardPage";
        }}
      />

      {curPost !== null && commentList !== null && curLikeCount !== null ? (
        <>
          <div style={style.postbox}>
            {/* 게시물 데이터를 사용하여 렌더링 */}
            <div style={style.profilebox}>
              <div style={style.profile}></div>
              <p style={style.userid}>
                <strong>{curPost.nickname}</strong>
              </p>
            </div>
            <div style={style.contents}>
              {curPost.type === "TEXT" ? (
                <TruncatedText text={curPost.content.text} maxLength={30} />
              ) : (
                <div style={style.soundimgBox} onClick={handlePlayClick}>
                  <img style={style.soundimg} src="/img/nocolorLine.svg" />
                  <img style={style.soundimg} src="/img/coloredLine.svg" />
                  <audio
                    ref={audioRef}
                    src={curPost.content.voiceUrl ?? ""}
                    onPlay={toggleIsOnPlay}
                    onPasue={toggleIsOnPlay}
                  />
                </div>
              )}
            </div>
          </div>
          <div style={bottomstyle}>
            <div style={bottomstyle.time}>
              {Math.round(
                (Date.now() - Date.parse(curPost.createdDate)) / (1000 * 60)
              ).toString() + "분전"}
            </div>
            <div style={bottomstyle.heartcnt}>{curLikeCount}</div>
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
          {commentList.map((comment, index) => (
            <Comment
              key={index}
              userid={comment.nickname}
              timeinfo={parsePassedTimeToString(comment.createdDate)}
              contents={
                comment.type === "TEXT"
                  ? comment.content.text
                  : comment.content.voiceUrl ?? ""
              }
              type={comment.type}
              heartcnt={comment.heartcnt}
            />
          ))}
          <div style={{ height: "20px" }} />
          <PutComm commentList={commentList} setCommentList={setCommentList} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

function getCookie(cName) {
  cName = cName + "=";
  var cookieData = document.cookie;
  var start = cookieData.indexOf(cName);
  var cValue = "";
  if (start != -1) {
    start += cName.length;
    var end = cookieData.indexOf(";", start);
    if (end == -1) end = cookieData.length;
    cValue = cookieData.substring(start, end);
  }
  return cValue;
}

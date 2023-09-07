import React, { useState, useEffect } from "react";
import AppBar from "@/components/pwd/reportSearchPage/appbar";

import Comment from "@/components/pwd/boardPage/comments";

import PutComm from "@/components/pwd/boardPage/inputComment";
// 멈춤 없는거
import BottomBar from "@/components/pwd/reportSearchPage/bottomBar";
import Post from "@/components/pwd/boardPage/post";
import { parsePassedTimeToString } from "@/public/functions/time";

export default function PostDetail() {
  const [isLiked, setIsLiked] = useState(false);

  const [curPost, setCurPost] = useState(null);
  const [commentList, setCommentList] = useState(null);
  const [curLikeCount, setCurLikeCount] = useState();

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
        console.log(res);
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

  const handleLikeClick = () => {
    setLike();
  };

  const comment = [
    {
      userid: "아이디",
      timeinfo: "1분전",
      contents:
        "댓글이 존나 길다면??댓글이 존나 길다면? 댓글이 존나 길다면? 댓글이 존나 길다면? 댓글이 존나 길다면? 댓글이 존나 길다면? 댓글이 존나 길다면? 댓글이 존나 길다면?",
      heartcnt: "1개",
    },
    {
      userid: "아이디",
      timeinfo: "1분전",
      contents: "어쩌고 저쩌고",
      heartcnt: "1개",
    },
    {
      userid: "아이디",
      timeinfo: "1분전",
      contents: "어쩌고 저쩌고",
      heartcnt: "1개",
    },
    {
      userid: "아이디",
      timeinfo: "1분전",
      contents: "어쩌고 저쩌고",
      heartcnt: "1개",
    },
    {
      userid: "아이디",
      timeinfo: "1분전",
      contents: "어쩌고 저쩌고",
      heartcnt: "1개",
    },
    {
      userid: "아이디",
      timeinfo: "1분전",
      contents: "어쩌고 저쩌고",
      heartcnt: "1개",
    },
  ];

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
      width: "85vw",
      border: "0.5px solid black",
    },
    commTitle: {
      fontFamily: "Inter",
      fontSize: "24px",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "normal",
      margin: "6% 0 5% 8%",
    },
  };

  return (
    <>
      <AppBar></AppBar>
      <div style={{ height: "1vh" }} />
      {curPost !== null && commentList !== null && curLikeCount !== null ? (
        <>
          <Post
            toDetail={null}
            key={curPost.postId}
            text={
              curPost.type === "TEXT"
                ? curPost.content.text
                : curPost.content.voiceUrl
            }
            id={curPost.nickname}
            postId={curPost.postId}
            time={parsePassedTimeToString(curPost.createdDate)}
            type={curPost.type === "TEXT" ? "text" : "sound"}
            count={curLikeCount}
            isLiked={isLiked}
            handleLikeClick={handleLikeClick}
            mode="detail"
          />
          <div style={bottomstyle.commTitle}>
            <img src="/icons/comment.svg" />
            댓글
          </div>
          <hr style={bottomstyle.hrStyle} />
          {/* 댓글 데이터를 사용하여 렌더링 */}
          {commentList.map((comment, index) => (
            <Comment
              key={index}
              userid={comment.nickname}
              timeinfo={parsePassedTimeToString(comment.createdDate)}
              contents={
                comment.type === "TEXT"
                  ? comment.content.text
                  : comment.content.voiceUrl
              }
              type={comment.type}
              heartcnt={comment.heartcnt}
            />
          ))}
          <div style={{ height: "15vh" }} />
          <PutComm
            commentList={commentList}
            setCommentList={setCommentList}
          ></PutComm>
        </>
      ) : (
        <></>
      )}{" "}
      <BottomBar></BottomBar>
    </>
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

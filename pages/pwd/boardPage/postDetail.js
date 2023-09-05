import React, { useState, useEffect } from "react";
import AppBar from "@/components/pwd/reportSearchPage/appbar";

import Comment from "@/components/pwd/boardPage/comments";

import PutComm from "@/pages/npwd/boardPage/inputComment"
// 멈춤 없는거
import BottomBar from "@/components/pwd/reportSearchPage/bottomBar";
import Post from "@/components/pwd/boardPage/post";


export default function PostDetail({ text, userid, time, type, count, picurl }) {

  const comment = [
    {
        userid:"아이디",
        timeinfo:"1분전",
        contents:"댓글이 존나 길다면??댓글이 존나 길다면? 댓글이 존나 길다면? 댓글이 존나 길다면? 댓글이 존나 길다면? 댓글이 존나 길다면? 댓글이 존나 길다면? 댓글이 존나 길다면?",
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
  }]


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
      width: '85vw',
      border: '0.5px solid black'
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
      <div style={{height:'1vh'}}/>
      <Post
            text="글이 존나 길다면?? 글이 존나 길다면?? 글이 존나 길다면?? 글이 존나 길다면?? 글이 존나 길다면?? 글이 존나 길다면?? 글이 존나 길다면?? 글이 존나 길다면?? 글이 존나 길다면?? 글이 존나 길다면??"
            id="스펀지송"
            time="12분전"
            type="text"
            count={22}
            picurl="/img/haerin.jpeg" 
            mode="detail"
            />
        <div style={bottomstyle.commTitle}>
          <img src="/icons/comment.svg"/>
          &nbsp;댓글</div>
        <hr style={bottomstyle.hrStyle}/>
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
        <div style={{height:'9vh'}}/>
        <PutComm></PutComm>
        <BottomBar></BottomBar>
    </>
  );
}
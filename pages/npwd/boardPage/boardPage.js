import React from "react";
import Post from "@/components/npwd/boardPage/post";
import AppBar from "@/components/npwd/boardPage/topBar";
function boardPage() {
  const style = {
    marginTop: "12.5vh",
  };

  return (
    <div>
      <AppBar pagename="게시판" />
      <div style={style} />
      <Post text="글1" id="바닐라" time="10분전" type="sound" count={1} picurl="/img/haerin.jpeg"></Post>
      <Post text="글2" id="스펀지송" time="12분전" type="text" count={22} picurl=""></Post>
      <Post text="글3" id="유미" time="14분전" type="text" count={18} picurl=""></Post>
      <Post text="글4" id="팜하니" time="50분전" type="text" count={5} picurl=""></Post>
    </div>
  );
}

export default boardPage;

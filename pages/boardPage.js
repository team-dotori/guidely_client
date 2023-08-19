import React from "react";
import Post from "../pages/boardPage/post"

function boardPage() {

  return (
      <div>
       <Post text = "글1" id = "바닐라" time ="10분전" type="sound"></Post>
       <Post text = "글2" id = "스펀지송" time ="12분전" type="text"></Post>
       <Post text = "글3" id = "유미" time ="14분전" type="text"></Post>
       <Post text = "글4" id = "팜하니" time ="50분전" type="text"></Post>
      </div>
  );
}

export default boardPage; 
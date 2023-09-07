import React, { useEffect, useState } from "react";
import Post from "@/components/npwd/boardPage/post";
import AppBar from "@/components/npwd/boardPage/topBar";
import CatBar from "../../../components/npwd/boardPage/catBar";
import { parsePassedTimeToString } from "@/public/functions/time";
import { getCookie } from "@/public/functions/cookie";

function BoardPage() {
  const style = {
    marginTop: "20px",
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/guidely/api/posts", {
      headers: {
        accessToken: getCookie("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setPosts(res);
      });
  }, []);

  return (
    <div>
      <AppBar
        pagename="게시판"
        onBackClick={() => {
          location.href = "/npwd/mapPage";
        }}
      />
      <CatBar mode="boardPage" />
      <div style={style} />
      {posts.map((post) => {
        console.log(post);
        return (
          <Post
            key={post.postId}
            text={
              post.type === "TEXT" ? post.content.text : post.content.voiceUrl
            }
            id={post.nickname}
            postId={post.postId}
            time={parsePassedTimeToString(post.createdDate)}
            type={post.type === "TEXT" ? "text" : "sound"}
            count={post.likeCount}
          />
        );
      })}
    </div>
  );
}

export default BoardPage;

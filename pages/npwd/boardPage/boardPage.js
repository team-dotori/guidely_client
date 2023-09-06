import React, { useEffect, useState } from "react";
import Post from "@/components/npwd/boardPage/post";
import AppBar from "@/components/npwd/boardPage/topBar";
import CatBar from "../../../components/npwd/boardPage/catBar";

function BoardPage() {
  const style = {
    marginTop: "20px",
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/guidely/api/posts")
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
      {/* <Post
        text="안녕하세요"
        id="김민수"
        time="1분전"
        type="text"
        count="10"
      ></Post> */}
      {posts.map((post) => {
        return (
          <Post
            key={post.postId}
            text={post.content.text}
            id={post.nickname}
            time={
              Math.round(
                (Date.now() - Date.parse(post.createdDate)) / (1000 * 60)
              ).toString() + "분전"
            }
            type={post.type === "TEXT" ? "text" : "sound"}
            count={post.likeCount}
          ></Post>
        );
      })}
    </div>
  );
}

export default BoardPage;

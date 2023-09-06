import React, { useEffect, useState } from "react";
import Post from "@/components/npwd/boardPage/post";
import AppBar from "@/components/npwd/boardPage/topBar";
import CatBar from "../../../components/npwd/boardPage/catBar";
import { parsePassedTimeToString } from "@/public/functions/time";

function BoardPage() {
  const style = {
    marginTop: "20px",
  };

  const [posts, setPosts] = useState([
    {
      postId: 1,
      nickname: "김철수",
      content: {
        voiceUrl:
          "https://firebasestorage.googleapis.com/v0/b/guidely-5e5a6.appspot.com/o/audios%2F63372eff-c5c8-4390-9897-d13ddf843401.mp3?alt=media&token=d61fbbc1-cd68-4c30-86be-b3079b837b85",
      },
      type: "sound",
      likeCount: 3,
      createdDate: "2023-08-0T00:00:00",
    },
  ]);

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

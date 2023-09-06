import React, { useState } from "react";
import AppBar from "@/components/pwd/reportSearchPage/appbar";
import Post from "@/components/pwd/boardPage/post";
//import SearchBar from "@/components/npwd/mapPage/searchBar"

// 멈춤 없는거
import BottomBar from "@/components/pwd/boardPage/bottomBar";
import { parsePassedTimeToString } from "@/public/functions/time";

// 멈춤 있는거
// import BottomBar from "@/components/pwd/signalPage/bottomBar";

export default function PutLocation() {
  const handleIsClick = () => {
    location.href = "/pwd/boardPage/postWrite";
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

  // useEffect(() => {
  //   fetch("/api/guidely/api/posts")
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setPosts(res);
  //     });
  // }, []);

  const style = {
    background: {
      backgroundColor: "black",
      height: "100vh",
      width: "100vw",
    },

    postPart: {
      padding: "5% 0 5% 0",
    },

    title: {
      height: "16vh",
      width: "86%",
      backgroundColor: "#FCFF59",
      color: "black",
      fontSize: "30px",
      fontWeight: "700",
      padding: "10% 7% 5% 7%",
    },

    searchingB: {
      width: "90%",
      height: "20px",
      padding: "17px",
      fontSize: "20px",
      fontWeight: "700",
      borderRadius: "20px",
      border: "none",
      margin: "4% 0 2% 0",
      backgroundColor: "black",
      color: "white",
    },
    searchIcons: {
      position: "absolute",
      right: "40px",
      marginTop: "30px",
      width: "23px",
      height: "23px",
    },
    searchbarCon: {
      display: "flex",
    },
    titleIcon: {
      width: "28px",
      height: "28px",
      margin: "0 2% 0 0",
    },
    writeText: {
      fontSize: "15px",
      fontWeight: "700",
    },
    writeBtn: {
      display: "flex",
      width: "max-content",
      border: "none",
      backgroundColor: "transparent",
      marginLeft: "70%",
    },
  };
  return (
    <div style={style.background}>
      <AppBar />
      <div>
        <div style={style.title}>
          <img src="/icons/speechbubble_black.svg" style={style.titleIcon} />
          게시판
          <br />
          <button style={style.writeBtn} onClick={handleIsClick}>
            <img src="/icons/edit.svg" />
            <div style={style.writeText}>게시글 작성</div>
          </button>
          <div style={style.searchbarCon}>
            <input style={style.searchingB} />
            <img src="/icons/search_white.svg" style={style.searchIcons} />
          </div>
        </div>
      </div>
      <div style={style.postPart}>
        {/* text: 내용 id: 사용자 id type: 음성게시물인지 아닌지 count: 좋아요 개수 mode:목록에 있는글인지 상세보기인지(list/detail) */}
        {posts.map((post) => {
          return (
            <Post
              toDetail={() => {
                location.href = `/pwd/boardPage/postDetail?postId=${post.postId}`;
              }}
              key={post.postId}
              text={
                post.type === "TEXT" ? post.content.text : post.content.voiceUrl
              }
              id={post.nickname}
              postId={post.postId}
              time={parsePassedTimeToString(post.createdDate)}
              type={post.type === "TEXT" ? "text" : "sound"}
              count={post.likeCount}
              mode="list"
            />
          );
        })}
      </div>
      <div style={{ height: "5vh", backgroundColor: "black" }} />
      <BottomBar
        beforeOnClick={() => {
          location.href = "/pwd/homePage";
        }}
      />
    </div>
  );
}

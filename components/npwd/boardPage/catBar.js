import React from "react";

export default function PostWrite({ mode }) {
  const style = {
    container1: {
      display: "flex",
      margin: "23% 7% 0% 0%",
    },
    icons: {
      paddingLeft: "5%",
    },
    lastIcon: {
      marginLeft: "auto", // 수정
    },
    hrStyle: {
      margin: "auto",
      width: "90%",
      border: "0.3px solid rgba(0, 0, 0, 0.25)", // 수정
    },
  };

  function editOnClick() {
    location.href = "/npwd/boardPage/postWrite";
  }

  return (
    <>
      <div style={style.container1}>
        <div style={style.icons}>
          <img
            src={`/icons/edit${mode === "postWrite" ? "_blue" : ""}.svg`}
            alt="edit icon"
            onClick={editOnClick}
          />
        </div>
        <div style={style.icons}>
          <img src="/icons/person.svg" alt="person icon" />
        </div>
        <div style={style.lastIcon}>
          <img src="/icons/search.svg" alt="search icon" />
        </div>
      </div>
      <hr style={style.hrStyle} />
    </>
  );
}

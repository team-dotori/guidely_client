import React from "react";
import Image from "next/image";

export default function Info({ userName, email }) {
  const style = {
    profileBox: {
      width: "56px",
      height: "56px",
      borderRadius: "28px",
      backgroundColor: "#4F4BEB",
    },
    container: {
      display: "flex",
      padding: "3%",
    },
    img: {
      borderRadius: "28px",
      marginLeft: "5%",
    },

    userName: {
      fontWeight: "700",
      fontSize: "24px",
      opacity: "0.8",
      marginBottom: "4px",
    },
    useremail: {
      fontWeight: "500",
      fontSize: "13px",
    },
    infoContainer: {
      marginLeft: "5%",
      paddingTop: "1%",
    },
    hrStyle: {
      width: "85vw",
      border: "0.5px solid lightgray",
    },
  };

  return (
    <>
      <div style={style.container}>
        <div style={style.profileBox} />
        <div style={style.infoContainer}>
          <div style={style.userName}>{userName}</div>
          <div>{email}</div>
        </div>
      </div>
      <hr style={style.hrStyle} />
    </>
  );
}

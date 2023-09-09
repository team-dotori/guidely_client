import Image from "next/image";
import React from "react";

export default function AppBar({ pagename, onBackClick }) {
  return (
    <div className="appBar">
      <TitleBox nowpagename={pagename} onBackClick={onBackClick} />{" "}
      {/* nowpagename 값을 전달 */}
      <style jsx>{`
        .appBar {
          position: fixed;
          top: 0;
          width: 100vw;
          height: 15vw;
          left: 0;
          padding-top: 29px;
          // box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          background-color: #ffffff;
        }
      `}</style>
    </div>
  );
}

function TitleBox({ nowpagename, onBackClick }) {
  // nowpagename 프롭을 받을 수 있도록 수정
  return (
    <div className="titleBox">
      <div className="titleContainer">
        <Image
          src={"/img/back.svg"}
          width={23}
          height={23}
          alt="뒤로가기"
          onClick={onBackClick}
        />
        <div className="title">{nowpagename}</div>
      </div>

      <style jsx>{`
        .titleBox {
          margin: 0px auto 30px auto;
          width: 331px;
        }
        .titleContainer {
          display: flex;
          align-items: center;
        }
        .title {
          font-weight: bold;
          font-size: 20px;
          margin-left: 18px;
        }
      `}</style>
    </div>
  );
}

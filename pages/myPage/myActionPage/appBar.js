import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function AppBar({ progressPercentage }) {
  return (
    <div className="appBar">
      <TitleBox />
      <ModeButtons />
      <style jsx>{`
        .appBar {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 29px;

          background-color: #ffffff;
        }
      `}</style>
    </div>
  );
}

function TitleBox() {
  return (
    <div className="titleBox">
      <Image
        src={"/icons/back.svg"}
        width={10.41}
        height={18.18}
        alt="뒤로가기"
        onClick={() => {
          console.log("back key clicked!");
        }}
      />
      <div className="title">내 활동</div>

      <style jsx>{`
        .titleBox {
          margin-bottom: 30px;
          width: 331px;

          display: flex;
          align-items: center;
        }
        .title {
          font-weight: bold;
          font-size: 20px;

          margin-left: 18.54px;
        }
      `}</style>
    </div>
  );
}

function ModeButtons() {
  const [ifFirst, setIfFirst] = useState(true);

  const [ifSelectedLeft, setIfSelectedLeft] = useState(true);

  return (
    <div className="container">
      {ifSelectedLeft ? (
        <div
          className={
            ifFirst
              ? "item leftSelected"
              : "item leftSelected rightToLeftAnimation"
          }
        >
          지도
        </div>
      ) : (
        <div
          className={"item leftNotSelected"}
          onClick={() => {
            setIfSelectedLeft(true);
          }}
        >
          지도
        </div>
      )}
      {ifSelectedLeft ? (
        <div
          className="item rightNotSelected"
          onClick={() => {
            if (ifFirst) setIfFirst(false);
            setIfSelectedLeft(false);
          }}
        >
          로그
        </div>
      ) : (
        <div className="item rightSelected leftToRightAnimation">로그</div>
      )}
      <style jsx>{`
        .container {
          width: 112.91px;
          height: 24.55px;

          margin-bottom: 11.45px;

          border-radius: 14.73px;
          background: #d9d9d9;
          box-shadow: 0px 1.63px 1.63px 0px rgba(0, 0, 0, 0.1) inset;

          display: flex;

          position: relative;
        }

        .item {
          width: 62.18px;
          height: 24.55px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 9.82px;
          position: absolute;
          font-weight: 500;
        }

        .leftSelected {
          border-radius: 14.73px;
          background: #181818;
          color: #ffffff;
          left: 0px;
          z-index: 1;
        }
        .leftNotSelected {
          color: #000000;
          left: 0px;
          z-index: 0;
        }

        .rightSelected {
          border-radius: 14.73px;
          background: #181818;
          color: #ffffff;
          right: 0px;
          z-index: 1;
        }
        .rightNotSelected {
          color: #000000;
          right: 0px;
          z-index: 0;
        }

        .rightToLeftAnimation {
          animation: rightToLeft 0.4s ease;
        }

        .leftToRightAnimation {
          animation: leftToRight 0.4s ease;
        }

        @keyframes rightToLeft {
          from {
            left: 50.73px;
          }

          to {
            left: 0px;
          }
        }

        @keyframes leftToRight {
          from {
            right: 50.73px;
          }

          to {
            right: 0px;
          }
        }
      `}</style>
    </div>
  );
}

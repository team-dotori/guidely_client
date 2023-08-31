import Image from "next/image";
import React from "react";

export default function AppBar() {
  return (
    <div className="appBar">
    <SearchBox></SearchBox>
      <style jsx>{`
        .appBar {
          position: fixed;
          top: 0;
          width: 100vw;
          height: 15vw;
          left: 0;
          padding-top: 29px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          background-color: #ffffff;
        }
      `}</style>
    </div>
  );
}

function SearchBox({ onChange }) {
    return (
      <div className="container">
        <div
          className="mapButton"
          onClick={() => {
            console.log("mapButton clicked!");
          }}
        >
          <Image
            src="/icons/map.svg"
            width={18.71}
            height={17.47}
            alt="지도 보기"
          />
        </div>
        <div className="divider" />
        <input className="textInput" onChange={onChange}></input>
        <div className="searchB">
            <Image 
                src="/icons/search.svg"
                width={18}
                height={18}
                alt="검색 하기"
            />
        </div>

        <style jsx>{`
          .container {
            width: 356px;
            height: 47.04px;
            background-color: #f1f3f5;
            border-radius: 35px;
            display: flex;
            align-items: center;
            margin: auto;
          }
  
        //   .circle {
        //     width: 7px;
        //     height: 7px;
        //     background: linear-gradient(
        //       34deg,
        //       #fcff59 0%,
        //       #9e9da8 76.56%,
        //       #4f4beb 100%
        //     );
  
        //     border-radius: 3.5px;
  
        //     margin-left: 16px;
        //   }
  
          .textInput {
            width: 279px;
  
            background-color: transparent;
            border: none;
            outline: none;
  
            padding: 0px 12px;
  
            font-size: 15px;
          }
  
          .divider {
            width: 0.5px;
            height: 30px;
            background-color: rgba(0, 0, 0, 0.3);
          }
  
          .mapButton {
            margin-left: 17px;
            margin-right: 17px;
  
            display: flex;
            justify-content: center;
          }

          .searchB{
            margin-right: 17px;
            display: flex;
            justify-content: center;
          }
        `}</style>
      </div>
    );
  }
import Image from "next/image";
import { useState, useEffect } from "react";
import { textInputWaitTime, defaultLatLon } from "@/public/constants/constant";

export function AppBar_Main() {
  return (
    <div className="appBar">
      <SearchBox
        onChange={(val) => {
          console.log(val.target.value);
        }}
      />
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
          z-index: 2;
          filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));
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
        <Image src="/icons/search.svg" width={18} height={18} alt="검색 하기" />
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

        .searchB {
          margin-right: 17px;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}

export function AppBar_RouteSelection() {
  //출발지 검색
  const [sourceQuery, setSourceQuery] = useState("");
  const [sourceSearchItems, setSourceSearchItems] = useState([]);
  const [source, setSource] = useState("");

  useEffect(() => {
    const inputWaitFunction = setTimeout(async () => {
      if (sourceQuery.length > 0) {
        //search
        const responseJSON = await (
          await fetch(`/api/kakao/map/searchByKeyword?query=${sourceQuery}`, {
            headers: {
              Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
            },
          })
        ).json();
        console.log("[API] kakao map api fetched");

        if (responseJSON["documents"].length !== 0) {
          const resultList = responseJSON["documents"].map((val) => {
            return {
              placeName: val.place_name,
              latitude: parseFloat(val.y),
              longitude: parseFloat(val.x),
            };
          });
          setSourceSearchItems(resultList);
          setSource(resultList[0].placeName);
        }
      }
    }, textInputWaitTime);

    return () => clearTimeout(inputWaitFunction);
  }, [sourceQuery]);

  const sourceInputOnChanged = (val) => {
    setSourceQuery(val.target.value);
  };

  const sourceInputOnFocus = (val) => {
    setSource("");
  };

  return (
    <div className="background">
      <div className="container">
        <div className="routeBox">
          <div className="iconBox">
            <div className="circle" />
          </div>
          <div style={{ width: "15px" }} />
          <div className="divider" />
          <div style={{ width: "17px" }} />
          <input
            placeholder="출발지를 입력하세요."
            onChange={sourceInputOnChanged}
            onFocus={sourceInputOnFocus}
            value={source.length !== 0 ? source : sourceQuery}
          />
        </div>

        <div className="routeBox">
          <div className="iconBox">
            <Image
              src="/icons/destination.svg"
              width={13.15}
              height={16.44}
              alt="목적지"
            />
          </div>
          <div style={{ width: "15px" }} />
          <div className="divider" />
          <div style={{ width: "17px" }} />
          <input placeholder="목적지를 입력하세요." />
        </div>

        <button className="transferButton">
          <Image
            src="/icons/transfer.svg"
            width={16}
            height={14}
            alt="바꾸기"
          />
        </button>

        <div className="connectionLine" />
      </div>
      <style jsx>{`
        .background {
          position: fixed;
          top: 0;
          z-index: 2;

          width: 100vw;
          height: 126px;
          background-color: #ffffff;

          filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .container {
          width: 356px;
          height: 100px;

          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: start;
        }

        .routeBox {
          display: flex;
          align-items: center;

          height: 47.04px;

          margin-left: 22px;
        }
        .routeBox .iconBox {
          width: 19px;
          height: 19px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .routeBox .iconBox .circle {
          width: 5px;
          height: 5px;
          border-radius: 2.5px;
          background-color: #000000;
        }
        .routeBox .divider {
          width: 0.5px;
          height: 30px;
          background-color: rgba(0, 0, 0, 0.3);
        }
        .routeBox input {
          width: 221px;
          color: #000000;
          font-size: 18px;
          font-weight: 500;
          border: none;
          outline: none;
          font-family: "Pretendard";
        }

        .transferButton {
          width: 32px;
          height: 32px;

          border: none;
          filter: drop-shadow(0px 2.44px 2.44px rgba(0, 0, 0, 0.1));

          position: absolute;
          right: 27px;
          top: 50%;
          transform: translateY(-50%);

          background-color: #f7f8fc;
          border-radius: 50%;

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .connectionLine {
          height: 38px;
          width: 1px;
          background-color: #4f4beb;
          border-radius: 0.5px;

          position: absolute;
          left: 31px;
          top: 29px;
        }
      `}</style>
    </div>
  );
}

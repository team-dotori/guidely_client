import { riskEnumTable, categoryEnumTable } from "@/public/constants/enumTable";
import Image from "next/image";
import TruncatedText from "../boardPage/TruncatedText";
import { useEffect, useState } from "react";

export function NavBar() {
  const style = {
    container: {
      position: "absolute",
      width: "100%",
      height: "10%",
      backgroundColor: "white",
      top: "90%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "13.5px 13.5px 0 0",
      zIndex: "2",
    },

    button: {
      width: "15%",
      margin: "5px",
      padding: "10px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      backgroundColor: "transparent",
      fontSize: "10px",
      display: "flex", // 요소들을 가로로 배치하는 속성 추가
      flexDirection: "column", // 요소들을 세로로 정렬하기 위한 속성 추가
      alignItems: "center", // 가운데 정렬
      textAlign: "center", // 가운데 정렬
    },
    iconstyle: {
      marginBottom: "10px",
      height: "20px",
    },
    Bbutton: {
      border: "none",
      backgroundColor: "transparent",
      margin: "0 10px",
      padding: "5px 10px",
      cursor: "pointer",
      marginBottom: "30px",
      display: "flex", // 요소들을 가로로 배치하는 속성 추가
      flexDirection: "column", // 요소들을 세로로 정렬하기 위한 속성 추가
      alignItems: "center", // 가운데 정렬
      textAlign: "center", // 가운데 정렬
    },
    Bimg: {
      marginBottom: "12px",
      width: "55px",
    },
    buttonText: {
      fontSize: "10px",
      marginBottom: "10px",
    },
  };

  return (
    <div style={style.BtmPadding}>
      <div style={style.container}>
        {/* 지도버튼 */}
        <button style={style.button}>
          <img src="/icons/navbar/map.svg" style={style.iconstyle} />
          <div style={style.buttonText}>지도</div>
        </button>
        {/* 게시판버튼 */}
        <button
          style={style.button}
          onClick={() => {
            location.href = "/npwd/boardPage";
          }}
        >
          <img src="/icons/navbar/board.svg" style={style.iconstyle} />
          <div style={style.buttonText}>게시판</div>
        </button>
        {/* 점자스캔 버튼 */}
        <button style={style.Bbutton}>
          <img
            style={style.Bimg}
            src="/icons/navbar/dotscanner.svg"
            alt="Guidely Icon"
          />
          <div style={style.buttonText}>GUIDELY</div>
        </button>
        {/* 신고버튼 */}
        <button
          style={style.button}
          onClick={() => {
            location.href = "/npwd/reportPage";
          }}
        >
          <img src="/icons/navbar/report.svg" style={style.iconstyle} />
          <div style={style.buttonText}>신고</div>
        </button>
        {/* 내정보 버튼 */}
        <button
          style={style.button}
          onClick={() => {
            location.href = "/npwd/myPage";
          }}
        >
          <img src="/icons/navbar/myinfo.svg" style={style.iconstyle} />
          <div style={style.buttonText}>내정보</div>
        </button>
      </div>
    </div>
  );
}

export function PlaceDetail({
  currentLocation,
  setMode,
  setDestinationSearchItem,
  setCurrentSearchItemByCurrentLocation,
}) {
  const style = {
    background: {
      position: "fixed",
      bottom: "0px",
      width: "100%",
      height: "21.5%",
      borderRadius: "13.5px 13.5px 0 0",
      backgroundColor: "white",
      border: "none",
      boxShadow: "-4px -4px 8px rgba(0, 0, 0, 0.2)",
      boxSizing: "border-box",
      padding: "22px 19px",
      zIndex: "2",
    },

    container: {
      display: "flex",
      flexDirection: "column",
      textAlign: "left",
      width: "100%",
      height: "90%",
    },
    placeTitle: {
      fontSize: "18px",
      fontWeight: "700",
      paddingBottom: "3%",
    },
    address: {
      display: "flex",
      fontSize: "13px",
      paddingBottom: "4%",
      color: "#4B4B4B",
    },
    reportInfo: {
      display: "flex",
      alignItems: "center",
      paddingBottom: "4%",
      fontWeight: "600",
    },
    reportText: {
      fontSize: "13px",
      fontWeight: "700",
      color: "#181818",
      paddingLeft: "8.95px",
    },
    btnArr: {
      display: "flex",
      border: "0.45px solid rgba(0,0,0,0.2)",
      margin: "auto",
      width: "100%",
      height: "fit-content",
    },
    btn: {
      flex: 1,
      textAlign: "center",
      borderRight: "0.45px solid rgba(0,0,0,0.2)",
      fontSize: "10px",
      display: "flex", // 아이콘과 텍스트를 함께 표시하기 위해 추가
      flexDirection: "column", // 아이콘 위에 텍스트 배치를 위해 추가
      alignItems: "center", // 아이콘과 텍스트를 가운데 정렬
      paddingTop: "7px",
      paddingBottom: "5px",
    },
    lastBtn: {
      flex: 1,
      textAlign: "center",
      fontSize: "10px",
      display: "flex", // 아이콘과 텍스트를 함께 표시하기 위해 추가
      flexDirection: "column", // 아이콘 위에 텍스트 배치를 위해 추가
      alignItems: "center", // 아이콘과 텍스트를 가운데 정렬
      paddingTop: "5px",
      paddingBottom: "1px",
    },
    icon: {
      marginBottom: "5px", // 아이콘 아래 여백 조정
    },

    reportMark: {
      width: "16px",
      height: "16px",
      backgroundColor: "#FF6A61",
      borderRadius: "8px 8px 8px 0",
      textAlign: "center",
      border: "1px solid #181818",
      margin: "0 5px 0 0",
    },
  };

  function reportListOnClick() {
    setMode(2);
  }
  function reportOnClick() {
    console.log(currentLocation);
    location.href = `/npwd/reportPage?place=${
      currentLocation.buildingName ?? currentLocation.address
    }&latitude=${currentLocation.latitude}&longitude=${
      currentLocation.longitude
    }&address=${currentLocation.address}${
      currentLocation.buildingName !== null
        ? `&buildingName=${currentLocation.buildingName}`
        : ""
    }&type=${currentLocation.type}`;
  }
  function destinationOnClick() {
    setCurrentSearchItemByCurrentLocation();
    setDestinationSearchItem(currentLocation);
    setMode(3);
  }

  return (
    <div style={style.background}>
      <div style={style.container}>
        <div style={style.placeTitle}>
          {currentLocation.buildingName
            ? currentLocation.buildingName
            : currentLocation.address}
        </div>
        <div style={style.address}>
          {currentLocation.buildingName ? currentLocation.address : ""}
        </div>
        <div style={style.reportInfo}>
          <CustomMarkerContent
            type={currentLocation.type}
            risk={riskEnumTable[Math.round(currentLocation.riskMean)]}
            count={currentLocation.countDeclaration}
          />
          <div style={style.reportText}>
            {currentLocation.countDeclaration}개의 신고가 있는 장소입니다.
          </div>
        </div>
        <div style={style.btnArr}>
          <div style={style.btn} onClick={reportListOnClick}>
            <img
              src="/icons/reportlist.svg"
              style={style.icon}
              alt="신고내역 아이콘"
            />
            신고내역
          </div>
          <div style={style.btn} onClick={reportOnClick}>
            <img
              src="/icons/report.svg"
              style={style.icon}
              alt="신고하기 아이콘"
            />
            신고하기
          </div>
          <div style={style.lastBtn} onClick={destinationOnClick}>
            <img
              src="/icons/arrival.svg"
              style={style.icon}
              alt="목적지 설정 아이콘"
            />
            목적지 설정
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomMarkerContent({ type, risk, count }) {
  return (
    <div className="container">
      <img className="marker" src={`/icons/markers/${type}_${risk}.svg`} />
      <div className="count">{count}</div>
      <style jsx>{`
        .container {
          position: relative;
        }

        .marker {
          display: absolute;
          width: ${type === "INSIDE" ? "32px" : "26px"};
          height: ${type === "INSIDE" ? "32px" : "26px"};
          filter: drop-shadow(0px 2.44px 2.44px rgba(0, 0, 0, 0.1));
        }
        .count {
          position: absolute;
          font-size: 16.61px;
          font-weight: 600;
          color: #181818;
          top: 50%;
          left: 50%;
          transform: ${type === "INSIDE"
            ? "translate(-56%, -60%)"
            : "translate(-50%, -65%)"};
        }
      `}</style>
    </div>
  );
}

export function ReportList({ currentLocation, setMode }) {
  const [reportList, setReportList] = useState([]);
  useEffect(() => {
    fetch(`/api/guidely/api/location/${currentLocation.id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setReportList(res);
      });
  }, []);

  return (
    <div className="container">
      <div
        className="closeButton"
        onClick={() => {
          setMode(1);
        }}
      >
        <Image
          src="/icons/down_round.svg"
          width={23.25}
          height={23.25}
          alt="닫기"
        />
      </div>
      <div className="titleBox">
        <Image
          src="/icons/reportlist.svg"
          width={25}
          height={25}
          alt="안내 시작"
        />
        <div style={{ width: 13 }} />
        <div className="title">
          <b>신고내역</b> ({currentLocation.countDeclaration})
        </div>
      </div>
      <div style={{ height: 29 }} />
      {reportList.map((report, ind) => {
        return <ReportComponent key={ind} report={report} />;
      })}

      <style jsx>{`
        .container {
          position: fixed;
          width: 100%;
          height: 684px;
          background-color: white;
          border-radius: 13.5px 13.5px 0 0;
          bottom: 0px;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 2;
          box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.1);
        }

        .closeButton {
          width: 100%;
          height: 23.25px;
          margin-top: 8px;

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .titleBox {
          width: 329.86px;
          height: 22px;
          margin-top: 32.75px;

          display: flex;
        }
        .titleBox .title {
          color: #000000;
          font-size: 18.24px;
          font-weight: 500;
        }
        .titleBox .title b {
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}

function ReportComponent({ report }) {
  const [ifClosed, setIfClosed] = useState(true);

  return (
    <div className={`container ${ifClosed ? "closedBox" : "openBox"}`}>
      <div className="titleBox">
        <Image
          src={`/icons/risk_${report.risk}.svg`}
          width={17.05}
          height={17}
          alt={`${riskEnumTable[report.risk]}`}
        />
        <div style={{ width: 10.44 }} />
        <div className="title">
          {riskEnumTable[report.risk] +
            " / " +
            categoryEnumTable[report.category]}
        </div>
        <div style={{ width: 13 }} />
        <div className="specific">{report.specification}</div>
      </div>
      <div className="divider" />
      {ifClosed ? (
        <div
          className="previewBox"
          onClick={() => {
            setIfClosed(false);
          }}
        >
          <TruncatedText text={report.contents} maxLength={25} />
        </div>
      ) : (
        <div className="contentBox">
          <div className="text">{report.contents}</div>
          {report.imgUrl ? (
            <>
              <div style={{ height: 23 }} />
              <img src={`${report.imgUrl}`} alt="이미지" className="imgBox" />
            </>
          ) : null}
        </div>
      )}{" "}
      <div className="footerBox">
        <div className="text">{formatDate(report.createdDate)}</div>
        <div className="likesBox">
          도움
          <b>{report.likeCount}</b>
        </div>
      </div>
      {ifClosed ? null : (
        <>
          <div className="divider" />
          <div
            className="closeButton"
            onClick={() => {
              setIfClosed(true);
            }}
          >
            <Image
              src={"/icons/close_drawer.svg"}
              width={10.41}
              height={18.18}
              alt="접기"
            />
          </div>
        </>
      )}
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;

          width: 331.19px;

          border-radius: 20.53px;
          background-color: #f8f9fa;

          display: flex;
          flex-direction: column;
          align-items: center;

          margin-bottom: 18px;
        }

        .closedBox {
          height: 145px;
          transition: height 0.1s ease-in-out;
        }

        .openBox {
          transition: height 0.1s ease-in-out;
        }

        .titleBox {
          width: 286px;
          height: 52px;

          display: flex;
          align-items: center;
        }
        .titleBox .title {
          color: #000000;
          font-size: 14px;
          font-weight: 700;
        }
        .titleBox .specific {
          color: #000000;
          font-size: 10px;
          font-weight: 300;
        }

        .divider {
          width: 331px;
          height: 0.3px;
          background-color: #000000;
          opacity: 0.25;
        }

        .previewBox {
          width: 286px;
          height: 16px;
          display: flex;
          flex-direction: column;
          margin: auto;

          color: #000000;
          font-size: 13px;
          font-weight: 500;
        }

        .contentBox {
          width: 286px;
          display: flex;
          flex-direction: column;
          margin-top: 18px;
          margin-bottom: 25px;
        }
        .contentBox .text {
          color: #000000;
          font-size: 13px;
          font-weight: 500;
        }
        .contentBox img {
          height: 188px;
          border-radius: 7px;
          margin-right: auto;
        }

        .footerBox {
          width: 286px;
          display: flex;
          justify-content: space-between;

          margin: 8.11px 0px;
        }
        .footerBox .text {
          color: #000000;
          font-size: 11px;
          font-weight: 300;
        }
        .footerBox .text .b {
          font-size: 9px;
        }
        .footerBox .likesBox {
          padding: 4px 14px;
          display: flex;
          background-color: #ffffff;

          border: 0.42px solid rgba(0, 0, 0, 0.2);
          border-radius: 12.53px;
          box-shadow: 0px 2.09px 4.18px 0px rgba(0, 0, 0, 0.1) inset;

          color: #000000;
          font-size: 10.45px;
          font-weight: 400;
        }
        .footerBox .likesBox b {
          color: #4f4beb;
          font-weight: 700;
          margin-left: 3px;
        }

        .closeButton {
          width: 331.19px;
          height: 36px;

          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}

function formatDate(inputDate) {
  const date = new Date(inputDate);

  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}.${month}.${day}`;
}

export function RouteSearchResult({ routeInfo }) {
  return (
    <div className="container">
      <div className="upperBox">
        <div className="infoBox">
          <div className="upperText">
            <b>{Math.round(routeInfo.totalTime / 60)}분</b>
            {routeInfo.totalDistance}m
          </div>
          <div className="lowerText">
            경로에 총 {routeInfo.totalDeclarationCount}개의 신고가 있습니다.
          </div>
        </div>
        <button>
          <Image
            src="/icons/share.svg"
            width={25.76}
            height={22.54}
            alt="안내 시작"
          />
        </button>
      </div>

      <div style={{ height: 13 }}></div>

      <div className="divder"></div>

      <div style={{ height: 15 }}></div>

      <div className="routeInfo">
        <div className="startIcon">
          <Image
            src="/icons/location_white_outline.svg"
            width={11.99}
            height={14.16}
            alt="출발지"
          />
        </div>

        <div className="endIcon">
          <Image
            src="/icons/destination_white.svg"
            width={10.3}
            height={12.87}
            alt="도착지"
          />
        </div>

        <div className="centerLine" />

        {routeInfo.locationList.map((location, ind) => {
          return (
            <div
              key={ind}
              className="locationIcon"
              style={{ left: `${location.percentageFromStart}%` }}
            >
              {location.countDeclaration}
              <Image
                src={`/icons/markers/${location.type}_${
                  riskEnumTable[Math.round(location.riskMean)]
                }_white.svg`}
                width={13}
                height={13}
                alt={`${riskEnumTable[Math.round(location.riskMean)]}`}
              />
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .container {
          width: 330px;
          height: 143.7px;

          position: fixed;
          bottom: 33.3px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 20.53px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
          background-color: #5f5bff;

          z-index: 2;
        }

        .upperBox {
          width: 281px;
          height: 50px;
          display: flex;
          justify-content: space-between;
        }
        .upperBox .infoBox {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .upperBox .infoBox .upperText {
          color: rgba(255, 255, 255, 0.8);
          font-size: 13px;
          font-weight: 600;
        }
        .upperBox .infoBox .upperText b {
          color: #ffffff;
          font-size: 20px;
          font-weight: 600;

          margin-right: 5px;
        }
        .upperBox .infoBox .lowerText {
          color: #ffffff;
          font-size: 13px;
          font-weight: 600;
        }
        .upperBox button {
          width: 47px;
          height: 47px;
          border: none;
          border-radius: 50%;
          background-color: #ffffff;
        }

        .divder {
          width: 330px;
          height: 0.2px;
          background-color: #ffffff;
        }

        .routeInfo {
          width: 290.3px;
          height: 31.5px;
          position: relative;
        }
        .routeInfo .startIcon {
          position: absolute;
          top: 0px;
          left: 0px;
        }
        .routeInfo .endIcon {
          position: absolute;
          top: 0px;
          right: 0px;
        }
        .routeInfo .centerLine {
          position: absolute;
          bottom: 5.5px;
          width: 280px;
          left: 5px;
          height: 2px;
          background-color: #ffffff;
        }
        .routeInfo .locationIcon {
          position: absolute;
          top: 0px;

          height: 31px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;

          color: #ffffff;
          font-size: 10px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}

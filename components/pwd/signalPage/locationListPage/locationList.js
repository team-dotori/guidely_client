import Image from "next/image";
import { useState } from "react";

export default function LocationList({
  locationList,
  setCurLocation,
  toNextPage,
}) {
  const [curInd, setCurInd] = useState(0);

  function nextPage() {
    if (curInd < locationList.length - 4) setCurInd(curInd + 4);
  }
  function prevPage() {
    if (curInd > 0) setCurInd(curInd - 4);
  }

  return (
    <div className="container">
      <TitleBar />

      <div style={{ height: 20 }} />

      {locationList.slice(curInd, curInd + 4).map((val) => (
        <LocationItem
          key={val.id}
          title={val.placeName + " " + val.count + "개"}
          detailOnClick={() => {
            setCurLocation(val);
            toNextPage();
          }}
        />
      ))}
      {curInd + 4 > locationList.length ? (
        <div
          style={{
            height: 60 * (curInd + 4 - locationList.length),
          }}
        />
      ) : null}

      <div style={{ height: 31 }} />

      <PageController nextPage={nextPage} prevPage={prevPage} />

      <div style={{ width: 50, height: 74 }} />

      <style jsx>{`
        .container {
          width: 329px;
          margin: 0px auto;
          padding-top: 39px;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}

function TitleBar() {
  return (
    <div className="container">
      <div className="title">
        <Image
          src={"/icons/list_black.svg"}
          width={28.32}
          height={21.24}
          alt="목록"
        />
        <div style={{ width: 15 }} />
        <div className="text">목록</div>
      </div>

      <button className="filterButton">
        <Image
          src={"/icons/filter.svg"}
          width={13.16}
          height={12.95}
          alt="새로고침"
        />
        <div style={{ width: 8 }} />
        <div className="text">{"필터  |  거리순"}</div>
      </button>
      <style jsx>{`
        .container {
          width: 329px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .title {
          display: flex;
          align-items: center;
        }
        .title .text {
          color: #000000;
          font-size: 30px;
          font-weight: 700;
        }

        .filterButton {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #181818;

          border: none;
          border-radius: 18px;
          font-family: "Pretendard";
          padding: 11px 18px;
        }
        .filterButton .text {
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}

function LocationItem({ title, detailOnClick }) {
  return (
    <div className="container">
      <div className="title">{title}</div>
      <button className="detailButton" onClick={detailOnClick}>
        자세히
      </button>
      <div className="divider" />
      <style jsx>{`
        .container {
          width: 329px;
          height: 60px;

          display: flex;
          justify-content: space-between;
          align-items: center;

          position: relative;
        }

        .title {
          width: 253px;
          color: #000000;
          font-size: 30px;
          font-weight: 700;

          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .detailButton {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #2b2e4a;

          border: none;
          border-radius: 18px;
          padding: 11px 18px;

          color: #ffffff;
          font-family: "Pretendard";
          font-size: 14px;
          font-weight: 700;
        }

        .divider {
          width: 329px;
          height: 2px;
          background-color: #000000;
          position: absolute;
          bottom: 0px;
        }
      `}</style>
    </div>
  );
}

function PageController({ nextPage, prevPage }) {
  return (
    <div className="container">
      <button className="pageMoveButton" onClick={prevPage}>
        <Image
          src={"/icons/up.svg"}
          width={13.36}
          height={19.44}
          alt="이전 목록"
        />
        <div style={{ width: 6.48 }} />
        <div className="text">이전 목록</div>
      </button>

      <button className="pageMoveButton" onClick={nextPage}>
        <Image
          src={"/icons/down.svg"}
          width={13.36}
          height={19.44}
          alt="다음 목록"
        />
        <div style={{ width: 6.48 }} />
        <div className="text">다음 목록</div>
      </button>
      <style jsx>{`
        .container {
          width: 258.52px;
          display: flex;
          justify-content: space-between;
        }

        .pageMoveButton {
          display: flex;
          align-items: center;

          background-color: transparent;

          border: none;
        }
        .pageMoveButton .text {
          font-family: "Pretendard";
          color: #181818;
          font-size: 17.28px;
          font-weight: 300;
        }
      `}</style>
    </div>
  );
}

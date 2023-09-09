import Image from "next/image";

export default function ReportList({ reportList, setCurReport, toNextPage }) {
  return (
    <div className="container">
      <TitleBar />

      <div style={{ height: 14 }} />

      {reportList.map((val, ind) => (
        <ReportItem
          key={ind}
          title={`${val.category}  |  ${val.specification}`}
          detailOnClick={() => {
            setCurReport(val);
            toNextPage();
          }}
        />
      ))}

      <style jsx>{`
        .container {
          width: 329px;
          margin: 0px auto;
          padding-top: 37px;

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
          src={"/icons/alert_black.svg"}
          width={33.07}
          height={27}
          alt="신고목록"
        />
        <div style={{ width: 10.93 }} />
        <div className="text">신고목록</div>
      </div>
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
      `}</style>
    </div>
  );
}

function ReportItem({ title, detailOnClick }) {
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
          height: 66px;

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

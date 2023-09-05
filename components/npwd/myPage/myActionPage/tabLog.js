import Image from "next/image";
import { useState } from "react";
import TruncatedText from "../../boardPage/TruncatedText";
import { riskEnumTable, categoryEnumTable } from "@/public/constants/enumTable";

export default function LogTab({ reportList }) {
  return (
    <div className="container">
      {reportList.map((report, ind) => {
        return <ReportComponent key={ind} report={report} />;
      })}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
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
        <div className="text">{formatDate(report.createdTime)}</div>
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

          margin-bottom: 20px;
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

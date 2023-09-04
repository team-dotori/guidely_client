import Image from "next/image";
import { riskEnumTable } from "@/public/constants/enumTable";

export default function ReportDetail({ curReport }) {
  return (
    <div className="container">
      <TitleBar />

      <div style={{ height: 14 }} />

      <ReportContent curReport={curReport} />

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
          src={"/icons/textBubble.svg"}
          width={27.16}
          height={27}
          alt="상세내용"
        />
        <div style={{ width: 10.84 }} />
        <div className="text">상세내용</div>
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

function ReportContent({ curReport }) {
  return (
    <div className="container">
      <div className="categoryBox">
        <div className="category">{`${curReport.category}  |  ${curReport.specification}`}</div>
        <div className="divider" />
      </div>

      <div className="riskBox">
        <div className="risk">
          <b>위험도 </b>|<b> {curReport.risk}</b>
        </div>
        <div style={{ width: 7 }} />
        <Image
          src={`/icons/risk_${riskEnumTable[curReport.risk]}.svg`}
          width={26}
          height={25}
          alt="불편해요"
        />
      </div>

      <div className="content">{curReport.contents}</div>

      <style jsx>{`
        .container {
          width: 329px;
          display: flex;
          flex-direction: column;
          align-items: start;
        }

        .categoryBox {
          width: 329px;
          height: 66px;

          display: flex;
          align-items: center;

          position: relative;
        }
        .categoryBox .category {
          width: 329px;
          color: #000000;
          font-size: 30px;
          font-weight: 700;

          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .categoryBox .divider {
          width: 329px;
          height: 2px;
          background-color: #000000;
          position: absolute;
          bottom: 0px;
        }

        .riskBox {
          display: flex;

          margin-top: 20px;
          margin-bottom: 8px;
        }
        .riskBox .risk {
          color: #000000;
          font-size: 20px;
          font-weight: 400;
        }
        .riskBox .risk b {
          font-size: 24px;
        }

        .content {
          width: 328px;
          color: #000000;
          font-size: 30px;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}

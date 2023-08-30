import Image from "next/image";

export default function SignalPanel({ totNum, curAddress }) {
  return (
    <div className="background">
      <div className="container">
        <div className="locationText">{curAddress}</div>
        <div style={{ height: 8 }} />
        <div className="reportCountBox">
          <div>
            <b>50m</b> 이내 신고된
          </div>
          <div>
            위치는 <b>총 {totNum}개</b> 입니다.
          </div>
        </div>
        <div style={{ height: 26 }} />
        <button className="refreshButton">
          <Image
            src={"/icons/refresh.svg"}
            width={13.16}
            height={13.19}
            alt="새로고침"
          />
          <div style={{ width: 8 }} />
          <div className="text">새로고침</div>
        </button>
      </div>
      <style jsx>{`
        .background {
          width: 100vw;
          background-color: #4f4beb;
        }

        .container {
          width: 329px;
          margin: 0px auto;
          padding: 29px 0px 33px 0px;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: start;
        }

        .locationText {
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
        }

        .reportCountBox {
          color: #ffffff;
          font-size: 28px;
          font-weight: 400;
          line-height: 38px;
          letter-spacing: -0.56px;
        }
        .reportCountBox b {
          font-weight: 700;
        }

        .refreshButton {
          display: flex;
          justify-content: center;
          align-items: center;

          border: none;
          border-radius: 18px;
          font-family: "Pretendard";
          padding: 11px 18px;
        }
        .refreshButton .text {
          color: #2b2e4a;
          font-size: 14px;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}

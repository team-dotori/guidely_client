import Image from "next/image";

export default function AppBar({ progressPercentage }) {
  return (
    <div className="appBar">
      <TitleBox />
      <ProgressBar progressPercentage={progressPercentage} />
      {/* <Background /> */}
      <style jsx>{`
        .appBar {
          position: fixed;
          top: 0;
          width: 100vw;
          height: 78px;

          padding-top: 29px;

          background-color: #ffffff;
        }
      `}</style>
    </div>
  );
}

function Background() {
  return (
    <div>
      <div className="background" />
      <div className="background_glassmorphism" />
      <style jsx>{`
        .background {
          height: 82px;
          background-color: #ffffff;
          border: none;
        }

        .background_glassmorphism {
          height: 24px;
          border: none;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(5px);
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
          location.href = "/npwd/mapPage";
        }}
      />
      <div className="title">신고</div>

      <style jsx>{`
        .titleBox {
          margin: 0px auto 30px auto;
          width: 331px;
        }
        .title {
          display: inline;

          font-weight: 700;
          font-size: 20px;

          margin-left: 18px;
        }
      `}</style>
    </div>
  );
}

function ProgressBar({ progressPercentage }) {
  return (
    <div className="progressBarBox">
      <div className="totalIndicator"></div>
      <div className="currentIndicator"></div>
      <style jsx>{`
        .progressBarBox {
          position: relative;
          margin: 0px auto;
          width: 331px;
        }

        .totalIndicator {
          background-color: rgba(0, 0, 0, 0.15);
          position: absolute;
          display: flex;
          width: 331px;
          height: 6px;
          border-radius: 3px;
        }

        .currentIndicator {
          background-color: #4f4beb;
          position: absolute;
          display: flex;
          width: ${331 * progressPercentage}px;
          height: 6px;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}

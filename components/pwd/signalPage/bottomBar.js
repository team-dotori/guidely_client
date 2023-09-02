import Image from "next/image";

export default function BottomBar({ beforeOnClick }) {
  return (
    <div className="background">
      <div className="container">
        <button className="button" onClick={beforeOnClick}>
          <Image
            src={"/icons/left.svg"}
            width={15.72}
            height={22.87}
            alt="이전"
          />
          <div style={{ width: 6.28 }} />
          <div className="text">이전</div>
        </button>

        <button className="button">
          <div className="text">홈</div>
        </button>

        <button className="button">
          <Image src={"/icons/pause.svg"} width={20} height={20} alt="멈춤" />
          <div style={{ width: 7 }} />
          <div className="text">멈춤</div>
        </button>
      </div>
      <style jsx>{`
        .background {
          width: 100vw;
          height: 74px;

          position: fixed;
          bottom: 0px;
          border-radius: 15px 15px 0px 0px;

          background-color: #181818;

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .container {
          width: 320px;

          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .button {
          display: flex;
          align-items: center;

          background-color: transparent;

          border: none;
        }

        .text {
          font-family: "Pretendard";
          color: #ffffff;
          font-size: 24px;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}

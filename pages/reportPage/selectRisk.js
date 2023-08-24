import Image from "next/image";

export default function SelectRisk() {
  return (
    <div className="container">
      <div className="title">위험도를 선택해 주세요.</div>
      <div className="buttonBox">
        <RiskButton text={"불편해요"} ifSelected={true} />
        <RiskButton text={"조심!"} ifSelected={false} />
        <RiskButton text={"위험해요"} ifSelected={false} />
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .title {
          margin: 53px 0px 31.02px 0px;
          font-size: 22.87px;
          font-weight: 600;
        }

        .buttonBox {
          width: 203.64px;

          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
}

function RiskButton({ text, ifSelected }) {
  return (
    <div className="container">
      <button className="button" />
      <div className="text">{text}</div>

      <style jsx>{`
        .container {
          height: 42.96px;
          border-radius: 16.01px;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }

        .button {
          width: 22.87px;
          height: 22.87px;

          background-color: ${ifSelected ? "#4f4beb" : "#d9d9d9"};
          border-radius: 11.435px;
          border: none;
          box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
        }

        .text {
          font-weight: medium;
          font-size: 9.15px;
        }
      `}</style>
    </div>
  );
}

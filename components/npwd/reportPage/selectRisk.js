import SelectionFinshed from "./selectionFinished";

export default function SelectRisk({
  risk,
  setRisk,
  toCurrentStep,
  toNextStep,
  ifCurrentStep,
}) {
  return (
    <div className="container">
      {risk ? (
        <SelectionFinshed
          title="위험도"
          content={risk}
          toCurrentStep={toCurrentStep}
        />
      ) : null}
      {ifCurrentStep ? (
        <div className="optionBox">
          <div className="topDivider" />
          <div className="title">위험도를 선택해 주세요.</div>
          <div className="buttonBox">
            <RiskButton
              text={"불편해요"}
              risk={risk}
              setRisk={setRisk}
              toNextStep={toNextStep}
            />
            <RiskButton
              text={"조심!"}
              risk={risk}
              setRisk={setRisk}
              toNextStep={toNextStep}
            />
            <RiskButton
              text={"위험해요"}
              risk={risk}
              setRisk={setRisk}
              toNextStep={toNextStep}
            />
          </div>
        </div>
      ) : null}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .optionBox {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .topDivider {
          width: 331px;
          height: 0.3px;
          background-color: rgba(0, 0, 0, 0.25);
          margin-top: 19px;
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

function RiskButton({ text, risk, setRisk, toNextStep }) {
  return (
    <div className="container">
      <button
        className="button"
        onClick={() => {
          setRisk(text);
          toNextStep();
        }}
      />
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

          background-color: ${risk == text ? "#4f4beb" : "#d9d9d9"};
          border-radius: 11.435px;
          border: none;
          box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
        }

        .text {
          font-weight: 500;
          font-size: 9.15px;
        }
      `}</style>
    </div>
  );
}

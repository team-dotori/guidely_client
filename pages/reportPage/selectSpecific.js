import Image from "next/image";
import SelectionFinshed from "./selectionFinished";

const specificTable = {
  점자: ["잘못된 정보", "내용 부실", "글자 또는 문법오류", "훼손"],
  "점자 보도블럭": ["잘못된 정보", "훼손"],
  유의구간: ["위험내용"],
  "시설물 오류": ["작동오류", "부정확한 정보"],
};

export default function SelectSpecific({
  category,
  specific,
  setSpecific,
  toNextStep,
  toCurrentStep,
  ifCurrentStep,
}) {
  return (
    <div className="container">
      {specific ? (
        <SelectionFinshed
          title="상세분류"
          content={specific}
          toCurrentStep={toCurrentStep}
        />
      ) : null}
      {ifCurrentStep ? (
        <div className="optionBox">
          <div className="topDivider" />
          <div className="title">상세분류를 선택해 주세요.</div>
          {specificTable[category].map((val, ind) => (
            <div key={ind}>
              <Item
                specificName={val}
                setSpecific={setSpecific}
                toNextStep={toNextStep}
              />
              {ind != specificTable[category].length - 1 ? (
                <div className="divider" />
              ) : null}
            </div>
          ))}
          <div className="bottomDivider" />
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
          margin: 41px 0px 15px 0px;
          font-size: 22.87px;
          font-weight: 600;
        }

        .divider {
          height: 0.2px;
          width: 331px;
          background: rgba(0, 0, 0, 0.15);
        }

        .bottomDivider {
          width: 331px;
          height: 0.3px;
          background-color: rgba(0, 0, 0, 0.25);
          margin-top: 29.85px;
          margin-bottom: 19px;
        }
      `}</style>
    </div>
  );
}

function Item({ specificName, setSpecific, toNextStep }) {
  return (
    <div className="container">
      <div className="title">{specificName}</div>
      <Image src="/icons/info.svg" width={20} height={20} alt="가이드라인" />
      <div style={{ width: 160 }} />
      <button
        className="select"
        onClick={() => {
          setSpecific(specificName);
          toNextStep();
        }}
      >
        선택
      </button>
      <style jsx>{`
        .container {
          width: 329px;
          height: 24px;

          margin: 15px 0px;

          display: flex;
          align-items: center;
        }

        .title {
          width: 130px;

          font-size: 15px;
          font-weight: 600;
        }

        .select {
          width: 40px;
          height: 24px;
          padding: 0px;

          background-color: transparent;
          border-color: rgba(0, 0, 0, 0.2);
          border-width: 0.2px;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}

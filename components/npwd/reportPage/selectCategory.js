import Image from "next/image";
import SelectionFinshed from "./selectionFinished";

export default function SelectCategory({
  category,
  setCategory,
  toNextStep,
  toCurrentStep,
  ifCurrentStep,
}) {
  return (
    <div className="container">
      {category ? (
        <SelectionFinshed
          title="신고내용"
          content={category}
          toCurrentStep={toCurrentStep}
        />
      ) : null}
      {ifCurrentStep ? (
        <div className="optionBox">
          <div className="topDivider" />
          <div className="title">신고내용을 선택해 주세요.</div>
          <Item
            categoryName={"점자"}
            setCategory={setCategory}
            toNextStep={toNextStep}
          />
          <div className="divider" />
          <Item
            categoryName={"점자 보도블럭"}
            setCategory={setCategory}
            toNextStep={toNextStep}
          />
          <div className="divider" />
          <Item
            categoryName={"유의구간"}
            setCategory={setCategory}
            toNextStep={toNextStep}
          />
          <div className="divider" />
          <Item
            categoryName={"시설물 오류"}
            setCategory={setCategory}
            toNextStep={toNextStep}
          />
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

function Item({ categoryName, setCategory, toNextStep }) {
  return (
    <div className="container">
      <div className="title">{categoryName}</div>
      <Image src="/icons/info.svg" width={20} height={20} alt="가이드라인" />
      <div style={{ width: 160 }} />
      <button
        className="select"
        onClick={() => {
          setCategory(categoryName);
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
          width: 109px;

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

import { useEffect, useState, useRef } from "react";
import AppBar from "./appBar.js";
import SelectCategory from "./selectCategory.js";
import SelectDetails from "./selectDetails.js";
import SelectPlace from "./selectPlace.js";
import SelectRisk from "./selectRisk.js";
import SelectSpecific from "./selectSpecific.js";
import SelectComplete from "./selectComplete.js";

export default function ReportPage() {
  const didMount = useRef(false);
  const [currentProgressInd, setCurrentProgressInd] = useState(0);
  const [currentProgressContent, setCurrentProgressContent] = useState("");
  const [selectionResultList, setSelectionResultList] = useState([]);

  const progressComponentList = [
    <SelectPlace
      key={0}
      setCurrentProgressContent={setCurrentProgressContent}
    />,
    <SelectCategory
      key={1}
      setCurrentProgressContent={setCurrentProgressContent}
    />,
    <SelectSpecific
      key={2}
      setCurrentProgressContent={setCurrentProgressContent}
    />,
    <SelectDetails
      key={3}
      setCurrentProgressContent={setCurrentProgressContent}
    />,
    <SelectRisk
      key={4}
      setCurrentProgressContent={setCurrentProgressContent}
    />,
    <SelectComplete key={5} />,
  ];

  useEffect(() => {
    console.log(currentProgressContent);
    if (didMount.current) {
      setCurrentProgressInd(currentProgressInd + 1);
      setSelectionResultList([...selectionResultList, currentProgressContent]);
    } else didMount.current = true;
  }, [currentProgressContent]);

  return (
    <div className="container">
      <AppBar progressPercentage={currentProgressInd / 5} />
      <div className="upperSizedBox" />
      {selectionResultList.map((val, ind) => (
        <SelectionFinshed
          key={ind}
          title={progressTagList[ind]}
          content={val}
        />
      ))}
      <div className="divider" />
      {progressComponentList[currentProgressInd]}
      <style jsx>{`
        .container {
          position: absolute;
          width: 100vw;

          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .upperSizedBox {
          height: 128px;
        }
        .divider {
          height: 0.3px;
          width: 331px;
          background-color: rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}

export const progressTagList = [
  "신고장소",
  "신고내용",
  "상세분류",
  "상세내용",
  "위험도",
];

function SelectionFinshed({ title, content }) {
  return (
    <div className="container">
      <div className="title">{title}</div>
      <div className="contentBox">
        <div className="yellowCircle" />
        <div className="content">{content}</div>
        <div className="transparentCircle" />
      </div>

      <style jsx>{`
        .container {
          margin-bottom: 21px;
          width: 331px;
          height: 74px;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .title {
          font-size: 13.72px;
        }

        .contentBox {
          border-radius: 35px;
          width: 331px;
          height: 47px;
          background-color: #181818;

          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .content {
          font-weight: 600;
          color: #ffffff;

          width: 269px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .yellowCircle {
          width: 7px;
          height: 7px;
          margin-left: 16px;
          background-color: #fcff59;
          border-radius: 50%;
        }

        .transparentCircle {
          width: 7px;
          height: 7px;
          margin-right: 16px;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
}

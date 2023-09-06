import { useEffect, useState, useRef } from "react";
import {
  riskEnumTable,
  categoryEnumTable,
} from "@/public/constants/enumTable.js";

import AppBar from "@/components/npwd/reportPage/appBar.js";
import SelectCategory from "@/components/npwd/reportPage/selectCategory.js";
import SelectDetails from "@/components/npwd/reportPage/selectDetails.js";
import SelectPlace from "@/components/npwd/reportPage/selectPlace.js";
import SelectRisk from "@/components/npwd/reportPage/selectRisk.js";
import SelectSpecific from "@/components/npwd/reportPage/selectSpecific.js";
import SelectComplete from "@/components/npwd/reportPage/selectComplete.js";

export default function ReportPage() {
  const [currentProgressInd, setCurrentProgressInd] = useState(0);
  const [place, setPlace] = useState("");
  const [category, setCategory] = useState("");
  const [specific, setSpecific] = useState("");
  const [detail, setDetail] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [risk, setRisk] = useState("");

  //latitude, longitude, address, buildingName, type
  const [placeInfo, setPlaceInfo] = useState("");

  const [ifFetchSuccess, setIfFetchSuccess] = useState(false);

  function toNextStep() {
    if (place.length == 0) return setCurrentProgressInd(0);
    if (category.length == 0) return setCurrentProgressInd(1);
    if (specific.length == 0) return setCurrentProgressInd(2);
    if (detail.length == 0) return setCurrentProgressInd(3);
    if (risk.length == 0) return setCurrentProgressInd(4);
    return setCurrentProgressInd(5);
  }

  useEffect(() => {
    toNextStep();
  }, [place, category, specific, detail, risk]);

  function toCurrentStep(ind) {
    setCurrentProgressInd(ind);
  }

  useEffect(() => {
    ////쿼리 파싱
    //장소 가져오기
    const url = new URL(window.location.href);

    setPlace(url.searchParams.get("place") ?? "");
    setPlaceInfo({
      latitude: url.searchParams.get("latitude") ?? "",
      longitude: url.searchParams.get("longitude") ?? "",
      address: url.searchParams.get("address") ?? "",
      buildingName: url.searchParams.get("buildingName") ?? "",
      type: url.searchParams.get("type") ?? "",
    });
  }, []);

  async function postRequest() {
    fetch(`/api/guidely/api/declaration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        buildingName: placeInfo.buildingName,
        address: placeInfo.address,
        latitude: placeInfo.latitude,
        longitude: placeInfo.longitude,
        type: placeInfo.type,

        category: categoryEnumTable[category],

        specification: specific,

        contents: detail === "이미지" ? "" : detail,

        imgUrl: imageURL,

        risk: riskEnumTable[risk],
      }),
    }).then((response) => {
      switch (response.status) {
        case 201:
          setIfFetchSuccess(true);
          break;
      }
    });
  }

  return (
    <div className="container">
      <AppBar progressPercentage={currentProgressInd / 5} />
      <div className="upperSizedBox" />
      <SelectPlace
        place={place}
        setPlace={setPlace}
        setPlaceInfo={setPlaceInfo}
        toNextStep={toNextStep}
        toCurrentStep={() => {
          toCurrentStep(0);
        }}
        ifCurrentStep={currentProgressInd == 0}
      />
      <SelectCategory
        category={category}
        setCategory={setCategory}
        toNextStep={toNextStep}
        toCurrentStep={() => {
          toCurrentStep(1);
        }}
        ifCurrentStep={currentProgressInd == 1}
      />
      <SelectSpecific
        category={category}
        specific={specific}
        setSpecific={setSpecific}
        toNextStep={toNextStep}
        toCurrentStep={() => {
          toCurrentStep(2);
        }}
        ifCurrentStep={currentProgressInd == 2}
      />
      <SelectDetails
        detail={detail}
        setDetail={setDetail}
        imageURL={imageURL}
        setImageURL={setImageURL}
        toNextStep={toNextStep}
        toCurrentStep={() => {
          toCurrentStep(3);
        }}
        ifCurrentStep={currentProgressInd == 3}
      />
      <SelectRisk
        risk={risk}
        setRisk={setRisk}
        toNextStep={toNextStep}
        toCurrentStep={() => {
          toCurrentStep(4);
        }}
        ifCurrentStep={currentProgressInd == 4}
      />
      {currentProgressInd == 5 && !ifFetchSuccess ? (
        <SubmitButton postRequest={postRequest} />
      ) : null}
      {ifFetchSuccess ? <SelectComplete /> : null}

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

function SubmitButton({ postRequest }) {
  return (
    <div>
      <div className="divider" />
      <button className="button" onClick={postRequest}>
        신고완료
      </button>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
        }
        .divider {
          margin: 24px 0px 24px 0px;
        }
        .button {
          width: 331px;
          height: 47px;
          border: none;
          border-radius: 35px;
          background-color: #4f4beb;

          font-weight: 800;
          font-size: 15px;
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}

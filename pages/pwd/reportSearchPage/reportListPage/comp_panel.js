import Image from "next/image";
import { useEffect, useState } from "react";
import { textInputWaitTime } from "@/public/constants/constant";

export default function Panel({
  curBuildingName,
  setCurBuildingName,
  reportCount,
}) {
  const [query, setQuery] = useState("");

  const inputOnChanged = (val) => {
    setQuery(val.target.value);
  };

  useEffect(() => {
    const inputWaitFunction = setTimeout(async () => {
      if (query.length > 0) {
        //search
        const responseJSON = await (
          await fetch(`/api/kakao/map/searchByKeyword?query=${query}`, {
            headers: {
              Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
            },
          })
        ).json();
        console.log("[API] kakao map api fetched");

        if (responseJSON["documents"].length > 0) {
          setCurBuildingName(responseJSON["documents"][0].place_name);
        }
      }
    }, textInputWaitTime);

    return () => clearTimeout(inputWaitFunction);
  }, [query]);

  return (
    <div className="background">
      <div className="container">
        <div className="searchBox">
          <input onChange={inputOnChanged} />
          <button>
            <Image src="/icons/search.svg" width={20} height={20} alt="검색" />
          </button>
        </div>

        <div style={{ height: 23 }} />

        {curBuildingName.length == 0 ? (
          <div className="locationInfo">올바른 장소를 입력해 주세요.</div>
        ) : (
          <div className="locationInfo">
            <b>{curBuildingName}</b>에
            <div>
              총 <b>{reportCount}개</b>의 신고가 있습니다.
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .background {
          width: 100vw;

          background-color: #4f4beb;
          display: flex;
          flex-direction: center;
          justify-content: center;

          box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        }
        .container {
          width: 331px;
          padding-top: 31px;
          padding-bottom: 53px;
          display: flex;
          flex-direction: column;
          align-items: start;
        }

        .searchBox {
          width: 331px;
          height: 45px;
          background-color: #ffffff;

          border: none;
          border-radius: 19px;

          display: flex;
          align-items: center;
          justify-content: center;
        }
        .searchBox input {
          width: 271px;

          color: #000000;
          font-size: 20px;
          font-weight: 700;
          border: none;
          outline: none;
        }
        .searchBox button {
          width: 20px;
          height: 20px;
          background-color: transparent;
          border: none;
        }

        .locationInfo {
          color: #ffffff;
          font-size: 26px;
          font-weight: 400;
          line-height: 38px;
          letter-spacing: -0.56px;
        }
        .locationInfo b {
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}

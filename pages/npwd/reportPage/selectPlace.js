import Image from "next/image";
import { useEffect, useState } from "react";
import SelectionFinshed from "./selectionFinished";
import { textInputWaitTime, defaultLatLon } from "@/public/constants/constant";

export default function SelectPlace({
  place,
  setPlace,
  setPlaceInfo,
  toNextStep,
  toCurrentStep,
  ifCurrentStep,
}) {
  const [ifMapMode, setIfMapMode] = useState(false);
  const [query, setQuery] = useState("");
  const [searchItems, setSearchItems] = useState([]);

  useEffect(() => {
    const inputWaitFunction = setTimeout(async () => {
      if (ifMapMode && query.length > 0) {
        //search
        const responseJSON = await (
          await fetch(`/api/kakao/map/searchByKeyword?query=${query}`, {
            headers: {
              Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
            },
          })
        ).json();
        console.log("[API] kakao map api fetched");

        let resultList = [];
        responseJSON["documents"].map((val) => {
          let curResult = {
            placeName: [],
            latitude: parseFloat(val.y),
            longitude: parseFloat(val.x),
            address: val.road_address_name,
            buildingName: val.place_name,
            type: "INSIDE",
          };
          let placeName = val.place_name;

          while (placeName.indexOf(query) != -1) {
            if (curResult.placeName.length != 0) {
              curResult.placeName.push({
                subStr: placeName.substr(0, placeName.indexOf(query)),
                ifHighlighted: false,
              });
            }
            curResult.placeName.push({
              subStr: placeName.substr(placeName.indexOf(query), query.length),
              ifHighlighted: true,
            });
            placeName = placeName.substr(
              placeName.indexOf(query) + query.length
            );
          }

          if (placeName.length > 0) {
            curResult.placeName.push({
              subStr: placeName,
              ifHighlighted: false,
            });
          }

          resultList.push(curResult);
        });
        setSearchItems(resultList);
      }
    }, textInputWaitTime);

    return () => clearTimeout(inputWaitFunction);
  }, [query]);

  const inputOnChanged = (val) => {
    setQuery(val.target.value);
  };

  return (
    <div className="container">
      {place ? (
        <SelectionFinshed
          title="신고장소"
          content={place}
          toCurrentStep={toCurrentStep}
        />
      ) : null}
      {ifCurrentStep ? (
        <div className="optionBox">
          <div className="topDivider" />
          <div className="title">신고장소를 선택해 주세요.</div>

          <SearchBox
            onChange={inputOnChanged}
            ifMapMode={ifMapMode}
            setIfMapMode={setIfMapMode}
            query={query}
            setQuery={setQuery}
            setPlace={setPlace}
            setPlaceInfo={setPlaceInfo}
            toNextStep={toNextStep}
          />

          {ifMapMode ? null : (
            <>
              <div
                className="currentPosButton"
                onClick={() => {
                  console.log("curPosition on Click!");
                }}
              >
                현 위치로 설정
              </div>
              {searchItems.map((val, ind) => (
                <SearchItem
                  key={ind}
                  setPlace={setPlace}
                  item={val}
                  toNextStep={toNextStep}
                  setPlaceInfo={setPlaceInfo}
                />
              ))}
            </>
          )}
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
          margin: 41px 0px 16.27px 0px;
          font-size: 22.87px;
          font-weight: 600;
        }

        .currentPosButton {
          font-size: 15.91px;
          font-weight: 600;

          margin: 33.69px auto 13.27px 16px;
        }

        .bottomDivider {
          width: 331px;
          height: 0.3px;
          background-color: rgba(0, 0, 0, 0.25);
          margin-top: 13.27px;
          margin-bottom: 19px;
        }
      `}</style>
    </div>
  );
}

function SearchBox({
  onChange,
  ifMapMode,
  setIfMapMode,
  query,
  setQuery,
  setPlace,
  setPlaceInfo,
  toNextStep,
}) {
  return (
    <div className={`container ${ifMapMode ? "mapMode" : "searchMode"}`}>
      <div className="searchBar">
        <div className="circle" />
        <input className="textInput" onChange={onChange} value={query}></input>
        <div className="divider" />
        {ifMapMode ? (
          <div
            className="cancelButton"
            onClick={() => {
              setIfMapMode(false);
            }}
          >
            <Image src="/icons/cancel.svg" width={15} height={15} alt="닫기" />
          </div>
        ) : (
          <div
            className="mapButton"
            onClick={() => {
              setIfMapMode(true);
            }}
          >
            <Image
              src="/icons/map.svg"
              width={18.71}
              height={17.47}
              alt="지도 보기"
            />
          </div>
        )}{" "}
      </div>
      {ifMapMode ? (
        <MapBox
          query={query}
          setQuery={setQuery}
          setIfMapMode={setIfMapMode}
          setPlace={setPlace}
          setPlaceInfo={setPlaceInfo}
          toNextStep={toNextStep}
        />
      ) : null}

      <style jsx>{`
        .container {
          width: 356px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #f1f3f5;
        }
        .mapMode {
          height: 549px;
          border-radius: 20px;
          transition: height 0.1s ease-in-out;
        }
        .searchMode {
          height: 47.04px;
          border-radius: 35px;
          transition: all 0.1s ease-in-out;
        }

        .searchBar {
          width: 356px;
          height: 47.04px;

          display: flex;
          align-items: center;
        }
        .circle {
          width: 7px;
          height: 7px;
          background: linear-gradient(
            34deg,
            #fcff59 0%,
            #9e9da8 76.56%,
            #4f4beb 100%
          );

          border-radius: 3.5px;

          margin-left: 16px;
        }
        .textInput {
          width: 279px;

          background-color: transparent;
          border: none;
          outline: none;

          padding: 0px 12px;

          font-family: "Pretendard";
          font-size: 15.91px;
          font-weight: 600;
        }
        .divider {
          width: 0.5px;
          height: 30px;
          background-color: rgba(0, 0, 0, 0.3);
        }
        .mapButton {
          margin-left: 15.5px;
          margin-right: 19.29px;

          display: flex;
          justify-content: center;
        }
        .cancelButton {
          margin-left: 18px;
          margin-right: 20.5px;

          display: flex;
          justify-content: center;
        }

        .mapBox {
          width: 356px;
          height: 502px;
          background-color: skyblue;
          border-radius: 0px 0px 20px 20px;
        }
      `}</style>
    </div>
  );
}

/**
 *
 * @param {placeName} : 장소의 이름을 담은 배열
 * 장소의 이름은 각각 {subStr: 부분문자열, ifHighlighted: 하이라이트 여부}
 * 의 객체로 분할 됨
 *
 * ex) '산격초등학교' 에서 산격이 하이라이트 된 글자
 *    : [
        {subStr: "산격", ifHighlighted: true},
        {subStr: "초등학교", ifHighlighted: false},
      ]
 */
function SearchItem({ setPlace, item, toNextStep, setPlaceInfo }) {
  return (
    <div className="container">
      <div className="divider" />
      <div
        className="content"
        onClick={() => {
          setPlace(item.placeName.map((val) => val["subStr"]).join(""));
          setPlaceInfo({
            latitude: item.latitude,
            longitude: item.longitude,
            address: item.address,
            buildingName: item.buildingName,
            type: item.type,
          });
          toNextStep();
        }}
      >
        {item.placeName.map((val, ind) => (
          <span
            key={ind}
            className={val["ifHighlighted"] ? "highlighted" : "notHighlighted"}
          >
            {val["subStr"]}
          </span>
        ))}
      </div>
      <style jsx>{`
        .container {
          width: 331px;
          height: 51px;

          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .divider {
          display: inline-block;
          width: 331px;
          height: 0.2px;
          background-color: rgba(0, 0, 0, 0.15);
        }

        .content {
          margin-left: 4px;
          width: 323px;
          height: 50.8px;
          overflow: hidden;
          white-space: nowrap;

          display: flex;
          align-items: center;
        }

        .content span {
          font-weight: 600;
          font-size: 15px;
        }

        .content .highlighted {
          color: #4f4beb;
        }

        .content .notHighlighted {
          color: #000000;
        }
      `}</style>
    </div>
  );
}

function MapBox({
  query,
  setQuery,
  setIfMapMode,
  setPlace,
  setPlaceInfo,
  toNextStep,
}) {
  const [kakaoMap, setKakaoMap] = useState();
  const [ifModalMode, setIfModalMode] = useState(false);

  async function getAddressByCoor({ lat, lon }) {
    const json = await (
      await fetch(`/api/kakao/map/addressByCoor?x=${lon}&y=${lat}`, {
        headers: {
          Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
        },
      })
    ).json();

    if (json.documents.length > 0) {
      setQuery(json.documents[0].address.address_name);
    }
  }

  useEffect(() => {
    // DOM으로 스크립트 태그 만들기
    const mapScript = document.createElement("script");
    // script.async = true는
    // 해당 스크립트가 다른 페이지와는 비동기적으로 동작함을 의미
    mapScript.async = true;
    // script.src에 map을 불러오는 api넣기 key는 javascript key
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_JAVASCRIPT_KEY}&autoload=false`;
    //key 똑바로 입력했는데도 401뜨면 카카오 플랫폼에 사이트 도메인 똑바로 입력했는지 확인.

    //만든 script를 head에 붙이기
    document.head.appendChild(mapScript);
    // script가 완전히 load 된 이후, 실행될 함수
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(
            defaultLatLon.lat,
            defaultLatLon.lon
          ), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };
        setKakaoMap(new window.kakao.maps.Map(mapContainer, mapOption));
      });
    };

    // script가 완전히 load 된 이후, 지도를 띄우는 코드를 실행시킨다.
    mapScript.addEventListener("load", onLoadKakaoMap);
  }, []);

  useEffect(() => {
    //첫 로딩시
    if (kakaoMap) {
      window.kakao.maps.event.addListener(
        kakaoMap,
        "dragend",
        async function () {
          await getAddressByCoor({
            lat: kakaoMap.getCenter().Ma,
            lon: kakaoMap.getCenter().La,
          });
        }
      );
    }
  }, [kakaoMap]);

  return (
    <div className="container">
      <div id="map"></div>
      {ifModalMode ? (
        <TypeSelectModal
          setIfMapMode={setIfMapMode}
          setIfModalMode={setIfModalMode}
          setPlace={setPlace}
          setPlaceInfo={setPlaceInfo}
          curCenterCoor={{
            lat: kakaoMap.getCenter().Ma,
            lon: kakaoMap.getCenter().La,
          }}
          query={query}
          toNextStep={toNextStep}
        />
      ) : (
        <>
          <div className="marker">
            <Image
              src="/icons/marker_setLocation.svg"
              width={34.28}
              height={55}
              alt="마커"
            />
          </div>
          <button
            onClick={() => {
              setIfModalMode(true);
            }}
          >
            <div className="yellowCircle" />
            <div className="content">현위치로 설정</div>
            <div className="transparentCircle" />
          </button>
        </>
      )}
      <style jsx>{`
        .container {
          width: 356px;
          height: 502px;
          position: relative;
        }
        #map {
          width: 356px;
          height: 502px;
          background-color: skyblue;
          border-radius: 0px 0px 20px 20px;
        }

        .marker {
          position: absolute;
          z-index: 999;
          top: 196px;
          left: 160.86px;
        }

        button {
          position: absolute;
          bottom: 14px;
          left: 12px;
          z-index: 999;

          border-radius: 35px;
          width: 331px;
          height: 47px;
          background-color: #181818;

          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        button .content {
          font-weight: 600;
          color: #ffffff;

          width: 269px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        button .yellowCircle {
          width: 7px;
          height: 7px;
          margin-left: 16px;
          background-color: #fcff59;
          border-radius: 50%;
        }

        button .transparentCircle {
          width: 7px;
          height: 7px;
          margin-right: 16px;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
}

function TypeSelectModal({
  setIfMapMode,
  setIfModalMode,
  setPlace,
  setPlaceInfo,
  curCenterCoor,
  query,
  toNextStep,
}) {
  async function setLocation(type) {
    const responseJSON = await (
      await fetch(`/api/kakao/map/searchByKeyword?query=${query}`, {
        headers: {
          Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
        },
      })
    ).json();
    console.log("[API] kakao map api fetched");

    if (responseJSON["documents"].length == 0) {
      setPlace(query);
      setPlaceInfo({
        latitude: curCenterCoor.lat,
        longitude: curCenterCoor.lon,
        address: query,
        buildingName: null,
        type: type,
      });
    } else {
      const result = responseJSON["documents"][0];
      setPlace(result.place_name),
        setPlaceInfo({
          latitude: curCenterCoor.lat,
          longitude: curCenterCoor.lon,
          address: result.road_address_name,
          buildingName: result.place_name,
          type: type,
        });
    }
  }

  return (
    <div
      className="background"
      onClick={() => {
        setIfModalMode(false);
        console.log("cancel");
      }}
    >
      <div style={{ height: 142 }} />
      <div className="container">
        <div style={{ height: 42 }} />
        <div className="title">신고 장소가 어디인지 알려주세요!</div>
        <div style={{ height: 10 }} />
        <div className="subText">
          실내/실외 구분은 경로 안내에 도움이 됩니다.
        </div>
        <div style={{ height: 26 }} />
        <div className="buttonBox">
          <button
            onClick={() => {
              setIfMapMode(false);
              setPlace(query);
              setPlaceInfo({
                latitude: curCenterCoor.lat,
                longitude: curCenterCoor.lon,
                address: query,
                buildingName: null,
                type: "OUTSIDE",
              });
              toNextStep();
            }}
          >
            실외
          </button>
          <button
            onClick={() => {
              setIfMapMode(false);
              setLocation("INSIDE");
              toNextStep();
            }}
          >
            실내
          </button>
        </div>
      </div>
      <style jsx>
        {`
          .background {
            width: 356px;
            height: 502px;
            background-color: transparent;

            position: absolute;
            top: 0px;
            left: 0px;
            z-index: 999;

            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .container {
            width: 330px;
            height: 180px;

            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: center;

            background-color: #fcfcfc;
            border-radius: 20.53px;
          }

          .title {
            color: #000000;
            font-size: 18px;
            font-weight: 600;
          }
          .subText {
            color: #000000;
            font-size: 13px;
            font-weight: 400;
          }

          .buttonBox {
            width: 200px;

            display: flex;
            justify-content: space-between;
          }
          .buttonBox button {
            background-color: #c9ccd4;

            color: #000000;
            font-size: 14px;
            font-weight: 500;
            font-family: "Pretendard";

            border: none;
            border-radius: 19px;

            padding: 11px 32px;
          }
        `}
      </style>
    </div>
  );
}

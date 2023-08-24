import Image from "next/image";

export default function SelectPlace({ setCurrentProgressContent }) {
  return (
    <div className="container">
      <div className="title">신고장소를 선택해 주세요.</div>
      <SearchBox />

      <div
        className="currentPosButton"
        onClick={() => {
          console.log("curPosition on Click!");
        }}
      >
        현 위치로 설정
      </div>

      <SearchItem
        placeName={[
          { subStr: "산격", ifHighlighted: true },
          { subStr: "초등학교", ifHighlighted: false },
          { subStr: "초등학교", ifHighlighted: false },
          { subStr: "초등학교", ifHighlighted: false },
          { subStr: "초등학교", ifHighlighted: false },
          { subStr: "초등학교", ifHighlighted: false },
          { subStr: "초등학교", ifHighlighted: false },
          { subStr: "초등학교", ifHighlighted: false },
          { subStr: "초등학교", ifHighlighted: false },
        ]}
        setCurrentProgressContent={setCurrentProgressContent}
      />

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .title {
          margin: 53px 0px 16.27px 0px;
          font-size: 22.87px;
          font-weight: 600;
        }

        .currentPosButton {
          font-size: 15.91px;
          font-weight: 600;

          margin: 33.69px auto 13.27px 16px;
        }
      `}</style>
    </div>
  );
}

function SearchBox() {
  return (
    <div className="container">
      <div className="circle" />
      <input className="textInput"></input>
      <div className="divider" />
      <div
        className="mapButton"
        onClick={() => {
          console.log("mapButton clicked!");
        }}
      >
        <Image
          src="/icons/map.svg"
          width={18.71}
          height={17.47}
          alt="지도 보기"
        />
      </div>

      <style jsx>{`
        .container {
          width: 356px;
          height: 47.04px;
          background-color: #f1f3f5;
          border-radius: 35px;

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

          font-size: 15px;
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
function SearchItem({ placeName, setCurrentProgressContent }) {
  return (
    <div className="container">
      <div className="divider" />
      <div
        className="content"
        onClick={() => {
          setCurrentProgressContent(
            placeName.map((val) => val["subStr"]).join("")
          );
        }}
      >
        {placeName.map((val, ind) => (
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

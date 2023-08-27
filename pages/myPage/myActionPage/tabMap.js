import Image from "next/image";
import { useEffect, useState } from "react";

export default function MapTab() {
  return (
    <div className="container">
      <SearchBar />
      <MyMap />
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="container">
      <button
        className="mapButton"
        onClick={() => {
          console.log("map button clicked!");
        }}
      >
        <Image src={"/icons/map.svg"} width={18.71} height={17.47} alt="지도" />
      </button>
      <div className="divider" />
      <input className="searchInput" />
      <button
        className="searchButton"
        onClick={() => {
          console.log("search button clicked!");
        }}
      >
        <Image
          src={"/icons/search.svg"}
          width={21.95}
          height={21.95}
          alt="검색"
        />
      </button>
      <style jsx>{`
        .container {
          width: 356px;
          width: 336px;
          height: 47.04px;
          background-color: #f1f3f5;
          border-radius: 35px;
          margin: 8px 0px 13.3px 0px;
          display: flex;
          align-items: center;
        }

        .mapButton {
          margin: 0px 15.79px 0px 24px;
          padding: 0px;
          border: none;
          background-color: transparent;
        }
        .divider {
          height: 30px;
          width: 0.5px;
          background-color: rgba(0, 0, 0, 0.30;);
        }
        .searchInput {
          margin: 0px 4px 0px 11px;

          font-size: 18px;
          font-weight: 500;

          border: none;
          background-color: transparent;
          width: 219px;
        }
        .searchButton {
          border: none;
          padding: 0px;
          background-color: transparent;
        }
      `}</style>
    </div>
  );
}

function MyMap() {
  const [kakaoMap, setKakaoMap] = useState();
  const defaultLatLng = {
    lat: 35.888836,
    lng: 128.610299,
  };

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
            defaultLatLng.lat,
            defaultLatLng.lng
          ), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };
        setKakaoMap(new window.kakao.maps.Map(mapContainer, mapOption));
      });
    };

    // sciprt가 완전히 load 된 이후, 지도를 띄우는 코드를 실행시킨다.
    mapScript.addEventListener("load", onLoadKakaoMap);
  }, []);

  function getCurrentPostion(successCallback, errorCallback) {
    const { geolocation } = navigator;

    geolocation.getCurrentPosition(successCallback, errorCallback, {
      enableHighAccuracy: false,
      maximumAge: 0,
      timeout: Infinity,
    });
  }

  useEffect(() => {
    //첫 로딩 시
    if (kakaoMap) {
      const curPosition = getCurrentPostion(
        (position) => {
          kakaoMap.setCenter(
            new kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            )
          );
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [kakaoMap]);

  return (
    <div className="container" id="map">
      <style jsx>{`
        .container {
          width: 100%;
          height: calc(100vh - 187.031px);
          background-color: skyblue;
        }
      `}</style>
    </div>
  );
}

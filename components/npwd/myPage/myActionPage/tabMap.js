import Image from "next/image";
import { useEffect, useState } from "react";
import { defaultLatLon } from "@/public/constants/constant";
import { getCurrentPostion } from "@/public/functions/coordinate";

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

  function createCircle({ lat, lon }) {
    // 지도에 표시할 원을 생성합니다
    var circle = new window.kakao.maps.Circle({
      center: new window.kakao.maps.LatLng(lat, lon), // 원의 중심좌표 입니다
      // radius: 50, // 미터 단위의 원의 반지름입니다
      strokeWeight: 0, // 선의 두께입니다
      strokeColor: "#FFFFFF", // 선의 색깔입니다
      strokeOpacity: 0, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      fillColor: "#FFFFFF", // 채우기 색깔입니다
      fillOpacity: 1, // 채우기 불투명도 입니다
    });

    // 지도에 원을 표시합니다
    circle.setMap(kakaoMap);
  }

  function createRectangle() {
    var sw = new window.kakao.maps.LatLng(33.255012, 125.61518), // 사각형 영역의 남서쪽 좌표
      ne = new window.kakao.maps.LatLng(38.671078, 130.556394); // 사각형 영역의 북동쪽 좌표

    // 사각형을 구성하는 영역정보를 생성합니다
    // 사각형을 생성할 때 영역정보는 LatLngBounds 객체로 넘겨줘야 합니다
    var rectangleBounds = new window.kakao.maps.LatLngBounds(sw, ne);

    // 지도에 표시할 사각형을 생성합니다
    var rectangle = new window.kakao.maps.Rectangle({
      bounds: rectangleBounds, // 그려질 사각형의 영역정보입니다
      strokeWeight: 0, // 선의 두께입니다
      strokeColor: "#FFFFFF", // 선의 색깔입니다
      strokeOpacity: 0, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "shortdashdot", // 선의 스타일입니다
      fillColor: "#000000", // 채우기 색깔입니다
      fillOpacity: 0.35, // 채우기 불투명도 입니다
    });

    // 지도에 사각형을 표시합니다
    rectangle.setMap(kakaoMap);
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
    if (kakaoMap) {
      getCurrentPostion(
        (position) => {
          kakaoMap.setCenter(
            new window.kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            )
          );
          createRectangle();
          createCircle({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          alert(error.message);
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

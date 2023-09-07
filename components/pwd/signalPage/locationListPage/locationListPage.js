import { useEffect, useState } from "react";
import SignalPanel from "@/components/pwd/signalPage/locationListPage/signalPanel";
import LocationList from "@/components/pwd/signalPage/locationListPage/locationList";
import { getCookie } from "@/public/functions/cookie";

export default function LocationListPage({
  setCurLocation,
  toNextPage,
  curCoordinate,
}) {
  const [locationList, setLocationList] = useState([]);
  const [curAddress, setCurAddress] = useState(" ");

  useEffect(() => {
    getLocationList(curCoordinate);
    getAddressByCoor(curCoordinate);
  }, [curCoordinate]);

  async function getLocationList({ lat, lon }) {
    const data = await (
      await fetch(
        "/api/guidely/api/location/navigation" +
          `?latitude=${lat}&longitude=${lon}`,
        {
          headers: {
            accessToken: getCookie("accessToken"),
          },
        }
      )
    ).json();

    setLocationList(
      data.map((val) => ({
        id: val.id,
        placeName: val.buildingName ?? val.address,
        count: val.countDeclaration,
      }))
    );
  }

  async function getAddressByCoor({ lat, lon }) {
    const json = await (
      await fetch(`/api/kakao/map/addressByCoor?x=${lon}&y=${lat}`, {
        headers: {
          Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
        },
      })
    ).json();

    if (json.documents.length > 0) {
      setCurAddress(json.documents[0].address.address_name);
    }
  }

  return (
    <div className="container">
      <SignalPanel totNum={locationList.length} curAddress={curAddress} />
      <LocationList
        locationList={locationList}
        setCurLocation={setCurLocation}
        toNextPage={toNextPage}
      />

      <style jsx>{`
        .container {
          width: 100vw;
          height: 100vh;

          background-color: #fcff59;

          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </div>
  );
}

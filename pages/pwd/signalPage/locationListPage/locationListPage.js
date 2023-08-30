import { useEffect, useState } from "react";
import SignalPanel from "./comp_signalPanel";
import LocationList from "./comp_locationList";

export default function LocationListPage({ setCurLocation, toNextPage }) {
  const [locationList, setLocationList] = useState([]);

  useEffect(() => {
    getLocationList();
  }, []);

  async function getLocationList() {
    const data = await (
      await fetch(
        "/api/guidely/api/location/navigation" +
          `?latitude=${37.12345}&longitude=${-122.672}`
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

  return (
    <div className="container">
      <SignalPanel totNum={locationList.length} />
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

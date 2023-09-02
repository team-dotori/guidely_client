import { useState, useEffect } from "react";
import AppBar from "./comp_appbar";
import BottomBar from "./comp_bottomBar";
import LocationListPage from "./locationListPage/locationListPage";
import ReportListPage from "./reportListPage/reportListPage";
import ReportDetailPage from "./reportDetailPage/reportDetailPage";

import {
  getDistanceBetweenCoor,
  getCurrentPostion,
  requestGeolocatorPermission,
} from "@/public/functions/coordinate";
import {
  defaultLatLon,
  detectDistance,
  detectInterval,
} from "@/public/constants/constant";

export default function SignalPage() {
  const [curDepth, setCurDepth] = useState(0);
  const [curLocation, setCurLocation] = useState();
  const [curReport, setCurReport] = useState();
  const [curCoordinate, setCurCoordinate] = useState(defaultLatLon);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    getCurrentPostion(
      (position) => {
        alert(position.coords.latitude + " " + position.coords.longitude);
      },
      (error) => {
        alert(error.message);
      }
    );
  }, []);

  useEffect(() => {
    // getCurrentPostion(
    //   (position) => {
    //     if (
    //       getDistanceBetweenCoor(
    //         curCoordinate.lat,
    //         curCoordinate.lon,
    //         position.coords.latitude,
    //         position.coords.longitude
    //       ) > detectDistance
    //     ) {
    //       setCurCoordinate({
    //         lat: position.coords.latitude,
    //         lon: position.coords.longitude,
    //       });
    //     }
    //   },
    //   () => {
    //     // navigator.permissions.revoke({ name: "geolocation" }).then((result) => {
    //     //   report(result.state);
    //     // });
    //     // requestGeolocatorPermission();
    //     // setCurCoordinate(defaultLatLon);
    //   }
    // );

    setTimeout(() => {
      setTimer(timer + 1);
    }, detectInterval);
  }, [timer]);

  function toNextPage() {
    setCurDepth(curDepth + 1);
  }

  function renderBody() {
    switch (curDepth) {
      case 0:
        return (
          <LocationListPage
            setCurLocation={setCurLocation}
            toNextPage={toNextPage}
            curCoordinate={curCoordinate}
            timer={timer}
          />
        );
      case 1:
        return (
          <ReportListPage
            curLocation={curLocation}
            setCurReport={setCurReport}
            toNextPage={toNextPage}
          />
        );
      case 2:
        return (
          <ReportDetailPage
            locationName={curLocation.placeName}
            curReport={curReport}
          />
        );
    }
  }

  return (
    <div className="container">
      <AppBar />

      {renderBody()}

      <BottomBar
        beforeOnClick={() => {
          if (curDepth > 0) setCurDepth(curDepth - 1);
        }}
      />

      <style jsx>
        {`
          .container {
            width: 100vw;
            height: 100vh;

            display: flex;
            flex-direction: column;
            align-items: center;
          }
        `}
      </style>
    </div>
  );
}

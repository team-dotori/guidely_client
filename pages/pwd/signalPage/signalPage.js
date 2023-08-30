import { useState } from "react";
import AppBar from "./comp_appbar";
import BottomBar from "./comp_bottomBar";
import LocationListPage from "./locationListPage/locationListPage";
import ReportListPage from "./reportListPage/reportListPage";
import ReportDetailPage from "./reportDetailPage/reportDetailPage";

export default function SignalPage() {
  const [curDepth, setCurDepth] = useState(0);
  const [curLocation, setCurLocation] = useState();
  const [curReport, setCurReport] = useState();

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

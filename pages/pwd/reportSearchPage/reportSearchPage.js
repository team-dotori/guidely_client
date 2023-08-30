import { useState } from "react";
import BottomBar from "./comp_bottomBar";
import AppBar from "./comp_appbar";
import ReportListPage from "./reportListPage/reportListPage";
import ReportDetailPage from "./reportDetailPage/reportDetailPage";

export default function ReportSearchPage() {
  const [curDepth, setCurDepth] = useState(0);
  const [curBuildingName, setCurBuildingName] = useState("");
  const [curReport, setCurReport] = useState();

  function toNextPage() {
    setCurDepth(curDepth + 1);
  }

  function renderBody() {
    switch (curDepth) {
      case 0:
        return (
          <ReportListPage
            curBuildingName={curBuildingName}
            setCurBuildingName={setCurBuildingName}
            setCurReport={setCurReport}
            toNextPage={toNextPage}
          />
        );
      case 1:
        return (
          <ReportDetailPage
            locationName={curBuildingName}
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
      <style jsx>{`
        .container {
          width: 100vw;
          height: 100vh;

          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </div>
  );
}

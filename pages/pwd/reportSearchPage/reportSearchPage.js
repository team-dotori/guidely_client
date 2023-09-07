import { useState } from "react";
import BottomBar from "@/components/pwd/reportSearchPage/bottomBar";
import AppBar from "@/components/pwd/reportSearchPage/appbar";
import ReportListPage from "@/components/pwd/reportSearchPage/reportListPage/reportListPage";
import ReportDetailPage from "@/components/pwd/reportSearchPage/reportDetailPage/reportDetailPage";

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
          else location.href = "/pwd/homePage";
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

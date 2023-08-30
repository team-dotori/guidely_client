import Panel from "./comp_panel";
import ReportDetail from "./comp_reportDetail";

export default function ReportDetailPage({ locationName, curReport }) {
  return (
    <div className="container">
      <Panel locationName={locationName} reportCount={curReport.count} />
      <ReportDetail curReport={curReport} />
      <style jsx>{`
        .container {
          width: 100vw;
          height: 100vh;

          background-color: #ffffff;

          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </div>
  );
}

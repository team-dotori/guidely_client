import Like from "@/components/pwd/signalPage/reportDetailPage/like";
import Panel from "@/components/pwd/signalPage/reportDetailPage/panel";
import ReportDetail from "@/components/pwd/signalPage/reportDetailPage/reportDetail";

export default function ReportDetailPage({ locationName, curReport }) {
  return (
    <div className="container">
      <Panel locationName={locationName} reportCount={curReport.count} />
      <ReportDetail curReport={curReport} />
      <Like reportId={curReport.id} />
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

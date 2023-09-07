import ReportList from "@/components/pwd/signalPage/reportListPage/reportList";
import Panel from "@/components/pwd/signalPage/reportListPage/panel";
import { useEffect, useState } from "react";
import { riskEnumTable, categoryEnumTable } from "@/public/constants/enumTable";
import { getCookie } from "@/public/functions/cookie";

export default function ReportListPage({
  curLocation,
  setCurReport,
  toNextPage,
}) {
  const [reportList, setReportList] = useState([]);

  useEffect(() => {
    getReportList();
  }, []);

  async function getReportList() {
    const data = await (
      await fetch(`/api/guidely/api/location/${curLocation.id}`, {
        headers: {
          accessToken: getCookie("accessToken"),
        },
      })
    ).json();
    console.log(data);
    setReportList(
      data.map((val) => ({
        count: data.length,
        category: categoryEnumTable[val.category],
        risk: riskEnumTable[val.risk],
        contents: val.contents,
        specification: val.specification,
        id: val.id,
      }))
    );
  }

  return (
    <div className="container">
      <Panel
        locationName={curLocation.placeName}
        reportCount={reportList.length}
      />
      <ReportList
        reportList={reportList}
        setCurReport={setCurReport}
        toNextPage={toNextPage}
      />

      <style jsx>
        {`
          .container {
            width: 100vw;
            height: 100vh;

            background-color: #ffffff;

            display: flex;
            flex-direction: column;
            align-items: center;
          }
        `}
      </style>
    </div>
  );
}

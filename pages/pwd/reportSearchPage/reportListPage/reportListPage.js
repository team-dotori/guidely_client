import ReportList from "./comp_reportList";
import Panel from "./comp_panel";
import { useEffect, useState } from "react";
import { riskEnumTable, categoryEnumTable } from "@/public/constants/enumTable";

export default function ReportListPage({
  curBuildingName,
  setCurBuildingName,
  setCurReport,
  toNextPage,
}) {
  const [reportList, setReportList] = useState([]);

  useEffect(() => {
    if (curBuildingName.length > 0) {
      getReportList();
    }
  }, [curBuildingName]);

  async function getReportList() {
    fetch(
      `/api/guidely/api/location/find?buildingName=${curBuildingName}`
    ).then((data) => {
      switch (data.status) {
        case 200:
          data.json().then((data) => {
            if (data.length > 0) {
              setReportList(
                data.map((val) => ({
                  count: data.length,
                  category: categoryEnumTable[val.category],
                  risk: riskEnumTable[val.risk],
                  contents: val.contents,
                  specification: val.specification,
                }))
              );
            }
          });
          break;
        case 500:
          setCurBuildingName("");
          setReportList([]);
          break;
      }
    });
  }

  return (
    <div className="container">
      <Panel
        curBuildingName={curBuildingName}
        setCurBuildingName={setCurBuildingName}
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

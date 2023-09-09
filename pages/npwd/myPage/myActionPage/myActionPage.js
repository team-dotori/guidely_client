import AppBar from "@/components/npwd/myPage/myActionPage/appBar";
import LogTab from "@/components/npwd/myPage/myActionPage/tabLog";
import MapTab from "@/components/npwd/myPage/myActionPage/tabMap";
import { getCookie } from "@/public/functions/cookie";
import { useEffect, useState } from "react";

export default function MyActionPage() {
  const [reportList, setReportList] = useState([]);
  const [curTab, setCurTab] = useState(true); // true: map, false: log

  useEffect(() => {
    fetch("/api/guidely/api/users/declarations", {
      headers: {
        accessToken: getCookie("accessToken"),
      },
    }).then((res) => {
      res.json().then((res) => {
        console.log(res);
        setReportList(res);
        // category : "BRAILLE"
        // contents : "This is test"
        // imgUrl : null
        // likeCount : 0
        // location : {id: 1, latitude: 37.123, longitude: -122.672, address: '대학로21길', buildingName: '경북대학교', …}
        // risk : "HIGH"
        // specification : "점자 오류"
      });
    });
  }, []);

  return (
    <div>
      <AppBar curTab={curTab} setCurTab={setCurTab} />
      {curTab ? (
        <MapTab reportList={reportList} />
      ) : (
        <LogTab reportList={reportList} />
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import AppBar from "@/components/npwd/myPage/badgePage/topBar";
import { NavBar } from "@/components/npwd/mapPage/bottomBar";
import User from "@/components/npwd/myPage/userInfo";
import Image from "next/image";

export default function MyPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("/api/guidely/api/users/one")
      .then((res) => res.json())
      .then((res) => {
        setEmail(res.email);
        setUserName(res.nickname);
      });
  }, []);

  const style = {
    container: {
      display: "flex",
      padding: "7% 0 0 5%",
      width: "84vw",
      height: "10vh",
      backgroundColor: "#F1F3F5",
      opacity: "0.8",
      margin: "5% auto 5% auto",
      borderRadius: "20px",
    },
    bigTitle: {
      fontSize: "18px",
      fontWeight: "600",
    },
    smallTitle: {
      width: "69%",
      marginTop: "3%",
      fontSize: "13px",
      fontWeight: "500",
      lineHeight: "19px",
    },
    icon: {
      margin: "5% 10% 0 0",
    },
  };

  return (
    <div>
      <AppBar pagename="내 정보" />
      <div style={{ marginTop: "15vh" }} />
      <User userName={userName} email={email}></User>
      <div
        style={style.container}
        onClick={() => {
          location.href = "myPage/myActionPage/myActionPage";
        }}
      >
        <div style={style.bigTitle}>
          내 활동
          <div style={style.smallTitle}>
            나의 신고내역, 게시판 활동 내역 등을 확인 할 수 있습니다.
          </div>
        </div>
        <Image
          src={"/icons/commsub.svg"}
          width={21}
          height={21}
          style={style.icon}
        />
      </div>
      <div
        style={style.container}
        onClick={() => {
          location.href = "myPage/badgePage/badgePage";
        }}
      >
        <div style={style.bigTitle}>
          활동 뱃지
          <div style={style.smallTitle}>
            뱃지 획득 방법과 나의 뱃지 등을 확인 할 수 있습니다. &nbsp;
          </div>
        </div>
        <Image
          src={"/icons/commsub.svg"}
          width={21}
          height={21}
          style={style.icon}
        />
      </div>
      <div style={style.container}>
        <div style={style.bigTitle}>
          Guidely
          <div style={style.smallTitle}>
            앱, 시각장애, 보행약자에 대한 다양한 정보를 제공받을 수 있습니다.
          </div>
        </div>
        <Image
          src={"/icons/commsub.svg"}
          width={21}
          height={21}
          style={style.icon}
        />
      </div>
      <NavBar></NavBar>
    </div>
  );
}

import { headers } from "@/next.config";
import { getCookie } from "@/public/functions/cookie";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function EntrancePage() {
  const [screenState, setScreenState] = useState("SignInScreen");
  const [ifDisabled, setifDisabled] = useState(undefined);

  useEffect(() => {
    getCode();
  }, []);

  const getCode = async function () {
    let code = new URL(window.location.href).searchParams.get("code");

    if (code) {
      requestSignIn({ code });
    }
  };

  function requestSignIn({ code }) {
    setScreenState("SplashScreen");
    fetch(`/api/guidely/kakao/callback?code=${code}`)
      .then((res) => {
        switch (res.status) {
          case 200:
            return res.json();
          default:
            alert("로그인에 실패했습니다.");
            return null;
        }
      })
      .then((data) => {
        setScreenState("SelectionScreen");
        if (data !== null) {
          document.cookie = `accessToken=${data.accessToken}`;
          document.cookie = `refreshToken=${data.refreshToken}`;
          document.cookie = `userId=${data.userId}`;

          getUserType();
        }
      });
  }

  function getUserType() {
    fetch(`/api/guidely/api/users/type`, {
      headers: {
        accessToken: getCookie("accessToken"),
      },
    })
      .then((res) => {
        switch (res.status) {
          case 200:
            return res.json();
          default:
            alert("오류 발생 :", res.status);
            return null;
        }
      })
      .then((data) => {
        if (data === "NEW") {
          setScreenState("SelectionScreen");
        }
      });
  }

  return (
    <div>
      <BackgroundComponent />
      {screenState === "SplashScreen" ? <SplashScreen /> : null}
      {screenState === "SelectionScreen" ? (
        <SelectionScreen
          setifDisabled={setifDisabled}
          setScreenState={setScreenState}
        />
      ) : null}
      {screenState === "SignInScreen" ? <SignInScreen /> : null}
    </div>
  );
}

function BackgroundComponent() {
  return (
    <div className="background_box">
      <div className="circle" />
      <style jsx>{`
        .background_box {
          background-color: #181818;
          width: 100vw;
          height: 100vh;
        }

        .circle {
          background: linear-gradient(to top right, #4f4beb, #fcff59);
          margin: auto;
          width: 353.54px;
          height: 353.54px;
          border-radius: 50%;
          position: relative;
          top: 251.61px;
        }
      `}</style>
    </div>
  );
}

function SplashScreen() {
  return (
    <div>
      <div className="blur_box" />
      <div className="logo_box">
        <img src="/images/logo_guidely_long.png" className="logo" alt="logo" />
      </div>

      <style jsx>{`
        .blur_box {
          margin: auto;
          width: 100vw;
          height: 100vh;
          top: 420.39px;
          position: fixed;
          backdrop-filter: blur(10px);
        }

        .logo_box {
          top: 625px;
          left: 0px;
          right: 0px;
          position: absolute;
          width: 301px;
          margin: auto;
        }
        .logo {
          width: 190.48px;
        }
      `}</style>
    </div>
  );
}

function SelectionScreen({ setScreenState }) {
  const [ifDisabled, setifDisabled] = useState(null);

  useEffect(() => {
    if (ifDisabled !== null) {
      fetch("/api/guidely/api/users/type", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accessToken: getCookie("accessToken"),
        },

        body: JSON.stringify({ type: ifDisabled ? "DISABLED" : "NORMAL" }),
      }).then((res) => {
        switch (res.status) {
          case 200:
            if (ifDisabled) location.href = "/pwd/homePage";
            else location.href = "/npwd/mapPage";
            break;
        }
      });
    }
  }, [ifDisabled]);

  return (
    <div>
      <div className="blur_box" />
      <button
        className="selectionButton"
        onClick={() => {
          setifDisabled(true);
        }}
        style={{
          top: "562px",
        }}
      >
        시각장애인
      </button>
      <button
        className="selectionButton"
        onClick={() => {
          setifDisabled(false);
        }}
        style={{
          top: "626px",
        }}
      >
        비시각장애인
      </button>

      <style jsx>{`
        .blur_box {
          margin: auto;
          width: 100vw;
          height: 100vh;
          top: 420.39px;
          position: fixed;
          backdrop-filter: blur(10px);
        }

        .selectionButton {
          border-radius: 5px;
          background-color: #ffffff;
          width: 302px;
          height: 45px;

          font-size: 13px;
          font-weight: 600;

          border: none;

          left: 0px;
          right: 0px;
          position: absolute;
          width: 301px;
          margin: auto;
        }
      `}</style>
    </div>
  );
}

function SignInScreen() {
  const tryKakaoSignIn = async () => {
    location.href = "/api/kakao/signIn";
    // const data = await (await fetch(
    //   "/api/signIn/kakao",

    //   )).json;
    // console.log(data);
  };

  return (
    <div>
      <div className="blur_box" />
      <button
        className="kakaoSignInButton"
        onClick={tryKakaoSignIn}
        // onClick={() => {
        //   signIn("kakao");
        // }}
      >
        <Image
          src="/images/logo_kakao.png"
          width={15}
          height={15}
          alt="카카오 로그인"
        />
        <div style={{ width: "5px" }} />
        카카오 로그인
      </button>

      <style jsx>{`
        .blur_box {
          margin: auto;
          width: 100vw;
          height: 419.74px;
          top: 0;
          position: fixed;
          backdrop-filter: blur(10px);
        }

        .kakaoSignInButton {
          border-radius: 12px;
          background-color: #fddc3f;
          width: 302px;
          height: 45px;

          color: #3a2929;
          font-size: 13px;
          font-weight: 600;

          border: none;

          left: 0px;
          right: 0px;
          top: 626px;
          position: absolute;
          width: 301px;
          margin: auto;

          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}

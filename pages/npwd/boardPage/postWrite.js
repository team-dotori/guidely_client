import AppBar from "@/components/npwd/boardPage/topBar";
import CatBar from "../../../components/npwd/boardPage/catBar";
import { useEffect, useState } from "react";

import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "@/firebase/storage";
import { getCookie } from "@/public/functions/cookie";

export default function PostWrite() {
  /////////////////////////////////////////////////////////////////////////////여기부터 음성녹음 관련

  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(false);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [audioFile, setAudioFile] = useState();

  function startRec() {
    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);

      // AudioBufferSourceNode 연결
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    // 마이크 사용 권한 획득 후 녹음 시작
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);
      // 음성 녹음이 시작됐을 때 onRec state값을 false로 변경
      analyser.onaudioprocess = function (e) {
        if (e.playbackTime > 180) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          // 메서드가 호출 된 노드 연결 해제
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setOnRec(false);
          };
          alert("3분 미만으로 녹음해주세요.");
        } else {
          setOnRec(true);
        }
      };
    });
  }

  function stopRec() {
    console.log("stop");
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function (e) {
      // setAudioUrl(e.data);

      // console.log(URL.createObjectURL(audioUrl)); // 출력된 링크에서 녹음된 오디오 확인 가능

      // File 생성자를 사용해 파일로 변환
      setAudioFile(
        new File([e.data], "soundBlob", {
          lastModified: new Date().getTime(),
          type: "audio",
        })
      );

      setOnRec(false);
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    // 미디어 캡처 중지
    media.stop();

    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect();
    source.disconnect();
  }

  function uploadAudio(file) {
    const audioRef = ref(storage, `audios/${uuid()}.mp3`);
    const uploadTask = uploadBytesResumable(audioRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        console.log("Upload is " + progress + "% done");
        // progressCircleRef.current.style["stroke-dashoffset"] =
        //   157 - 157 * progress;
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setAudioUrl(downloadURL);
          setAudioFile(null);
        });
      }
    );
  }

  useEffect(() => {
    if (audioFile) uploadAudio(audioFile);
  }, [audioFile]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  const [selectedButton, setSelectedButton] = useState(null);
  const [content, setContent] = useState(""); // 글 내용

  function requestPostText() {
    fetch("/api/guidely/api/posts/text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accessToken: getCookie("accessToken"),
      },

      body: JSON.stringify({
        content: content,
      }),
    }).then((res) => {
      switch (res.status) {
        case 200:
        case 201:
          location.href = "/npwd/boardPage";
          break;
      }
    });
  }

  function requestPostAudio() {
    fetch("/api/guidely/api/posts/voice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accessToken: getCookie("accessToken"),
      },
      body: JSON.stringify({
        voiceUrl: audioUrl,
      }),
    }).then((res) => {
      switch (res.status) {
        case 200:
        case 201:
          location.href = "/npwd/boardPage";
          break;
      }
    });
  }

  const style = {
    introBox: {
      display: selectedButton !== null ? "none" : "block",
      width: "80%",
      height: "100px",
      backgroundColor: "#fcfcfc",
      // border: '1px solid gray',
      margin: "auto",
      borderRadius: "20px",
      textAlign: "center",
      paddingTop: "10%",
      paddingBottom: "5%",
      marginTop: "5%",
    },
    bigTitle: {
      color: "#000",
      fontSize: "18px",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "normal",
      marginBottom: "2%",
    },
    smallTitle: {
      color: "#000",
      fontSize: "13px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "normal",
      marginBottom: "5%",
      marginTop: "3%",
    },
    btns: {
      // width: '77px',
      height: "36px",
      margin: "2%",
      border: "none",
      borderRadius: "19px",
      padding: "0 10% 0 10%",
    },

    selectedBtn: {
      backgroundColor: "#4F4BEB", // 선택된 버튼의 색상을 여기에 설정하세요.
      color: "#F8F9FA", // 선택된 버튼의 텍스트 색상
      height: "36px",
      margin: "2%",
      border: "none",
      borderRadius: "19px",
      padding: "0 10% 0 10%",
    },

    btnCont: {
      paddingLeft: "2%",
      width: "90%",

      display: "flex",
      alignItems: "center",
    },

    newbtns: {
      backgroundColor: "#FFFFFF", // 선택된 버튼의 색상을 여기에 설정하세요.
      margin: "3% 2% 3% 2%",
      width: "36px",
      height: "36px",
      borderRadius: "18px",
      border: "none",
      boxShadow: "0px 1.28px 1.29px 0px rgba(0, 0, 0, 0.10) inset",
    },

    textContainer: {
      display: selectedButton === "text" ? "" : "none",
      width: "80%",
      height: "200px",
      backgroundColor: "#F8F9FA",
      border: "none",
      borderRadius: "20px",
      //textAlign: 'center',
      fontWeight: "600",
      fontSize: "16px",
      padding: "5%",
      margin: "0 5% 0 5%",

      fontFamily: "Pretendard",
    },

    voiceContainer: {
      display: selectedButton === "voice" ? "flex" : "none",
      width: "80%",
      height: "200px",
      backgroundColor: "#F8F9FA",
      border: "none",
      borderRadius: "25px",
      padding: "5%",
      margin: "0 5% 0 5%",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },

    cntl: {
      display: selectedButton !== null ? "block" : "none",
    },

    changeColor: {
      filter: "brightness(0) invert(1)",
    },

    submitBtn: {
      width: "116px",
      height: "36px",
      display: "flex",
      padding: "11px 32px",
      justifyContent: "center",
      alignItems: "center",
      //gap: '49px',
      border: "none",
      borderRadius: "19px",
      backgroundColor: "#C9CCD4",
      marginLeft: "65%",
      marginTop: "2%",

      fontFamily: "Pretendard",
    },
    recordText: {
      fontSize: "14px",
      fontWeight: "700",
    },
    recordBtn: {
      border: "none",
      backgroundColor: "transparent",
      marginBottom: "5%",
    },
    recordImg: {
      backgroundColor: "white",
      width: "20px",
      height: "20px",
      borderRadius: "18px",
      // border: '1px solid black',
      padding: "10%",
      backgroundColor: onRec ? "black" : "#F1F3F5",
      boxShadow: onRec ? "none" : "inset 0px 1px 2px rgba(0, 0, 0, 0.5)",
      marginBottom: "5%",
    },
  };

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  /////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <AppBar
        pagename={"게시글 작성"}
        onBackClick={() => {
          location.href = "/npwd/boardPage";
        }}
      ></AppBar>
      <CatBar mode={"postWrite"} />
      <div style={style.introBox}>
        <div style={style.bigTitle}>게시글 작성 유형을 선택해주세요.</div>
        <div style={style.smallTitle}>다양한 방법으로 소통해보세요 !</div>
        <div>
          <button
            style={{
              ...style.btns,
            }}
            onClick={() => handleButtonClick("text")}
          >
            글
          </button>
          <button
            style={{
              ...style.btns,
            }}
            onClick={() => handleButtonClick("voice")}
          >
            음성
          </button>
        </div>
      </div>

      <div style={style.cntl}>
        <div style={style.btnCont}>
          <button
            style={
              selectedButton === "text" ? style.selectedBtn : style.newbtns
            }
            onClick={() => handleButtonClick("text")}
          >
            {selectedButton === "text" ? "글" : <img src="/icons/edit.svg" />}
          </button>
          <button
            style={
              selectedButton === "voice" ? style.selectedBtn : style.newbtns
            }
            onClick={() => handleButtonClick("voice")}
          >
            {selectedButton === "voice" ? (
              "음성"
            ) : (
              <img src="/icons/voice.svg" />
            )}
          </button>
        </div>

        <textarea
          style={style.textContainer}
          value={content}
          onChange={(value) => {
            setContent(value.target.value);
          }}
        ></textarea>
        <div style={style.voiceContainer}>
          <button onClick={onRec ? stopRec : startRec} style={style.recordBtn}>
            {onRec ? (
              <img src="/icons/blackvoice.svg" style={style.recordImg} />
            ) : (
              <img src="/icons/voice.svg" style={style.recordImg} />
            )}
            <div style={style.recordText}>눌러서 말하기</div>
          </button>
          {audioUrl ? <audio src={audioUrl} controls></audio> : null}
        </div>

        <button
          style={style.submitBtn}
          onClick={
            selectedButton === "voice"
              ? audioUrl
                ? requestPostAudio
                : () => {
                    alert("음성이 없습니다.");
                  }
              : requestPostText
          }
        >
          작성완료
        </button>
      </div>
    </>
  );
}

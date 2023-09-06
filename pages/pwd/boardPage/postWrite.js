import AppBar from "@/components/pwd/reportSearchPage/appbar";
// import CatBar from "./catBar";
import { useEffect, useState } from "react";
import { Waveform } from '@uiball/loaders';


import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "@/firebase/storage";

export default function PostWrite() {
  let [selectedButton, setSelectedButton] = useState("voice");
  const [content, setContent] = useState(""); // 글 내용
  

  console.log(selectedButton);

  function requestPost() {
    fetch("/api/guidely/api/posts/text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
      }),
    });
  }

  const style = {
    writePost:{
      width: '86%',
      height: '4vh',
      backgroundColor: '#FCFF59',
      color: "#181818",
      fontSize: '30px',
      fontWeight: '600',
      padding: '7%'
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
      display:' flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#181818",
      color: "#F8F9FA", // 선택된 버튼의 텍스트 색상
      margin: "3% 2% 3% 2%",
      width: "max-content",
      height: "36px",
      margin: "2%",
      border: "none",
      borderRadius: "19px",
      padding: "0 10% 0 10%",
    },

    btnCont: {
      paddingLeft: "2%",
      width: "90%",
      margin: '2% 0 3% 0',
      display: "flex",
      alignItems: "center",
    },

    newbtns: {
      alignItems: 'center',
      justifyContent: 'center',
      display:' flex',
      backgroundColor: "#FFFFFF", // 선택된 버튼의 색상을 여기에 설정하세요.
      margin: "3% 2% 3% 2%",
      width: "max-content",
      height: "36px",
      padding: '5% 7% 5% 7%',
      borderRadius: "18px",
      border: "none",
      boxShadow: "0px 1.28px 1.29px 0px rgba(0, 0, 0, 0.10) inset",
    },

    textContainer: {
      display: selectedButton === "text" ? "flex" : "none",
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
      //display: "none",
      width: "80%",
      height: "200px",
      backgroundColor: "#181818",
      border: "none",
      borderRadius: "25px",
      padding: "5%",
      margin: "0 5% 0 5%",
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    },

    changeColor: {
      filter: "brightness(0) invert(1)",
    },

    submitBtn: {
      width: "30%",
      height: "5vh",
      display: "flex",
      margin: 'auto',
      marginTop: '5%',
      justifyContent: "center",
      alignItems: "center",
      //gap: '49px',
      border: "none",
      borderRadius: "19px",
      backgroundColor: "#181818",
      
      color:'white',
      fontSize: '14px',
      fontWeight: '700',

      fontFamily: "Pretendard",
    },
    recordBtn:{
      backgroundColor: 'transparent',
      border: 'none',
    },
    recordTxt:{
      color: 'white',
      fontSize: '24px',
      fontWeight: '700',
      marginTop: '10%',
      fontFamily: "Pretendard",
      marginBottom: '10%'
    },
    recordImg:{
      height: '53px',
      width: '40px'
    }
  };

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

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
        setOnRec(true);
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
    const imageRef = ref(storage, `audios/${uuid()}.mp3`);
    const uploadTask = uploadBytesResumable(imageRef, file);
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
        });
      }
    );
  }

  useEffect(() => {
    if (audioFile) uploadAudio(audioFile);
  }, [audioFile]);

  function requestAudioPost() {
    fetch("/api/guidely/api/posts/text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        voiceUrl: audioUrl,
      }),
    });
  }

  /////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <AppBar pagename={"게시글 작성"}></AppBar>
      <div style={style.writePost}>
        <img src="/icons/edit.svg" style={{ width: "28px", height: "28px" }} />
        &nbsp;&nbsp;게시글 작성
      </div>
      {/* <CatBar></CatBar> */}

      <div>
        <div style={style.btnCont}>
          <button
            style={
              selectedButton === "text" ? style.selectedBtn : style.newbtns
            }
            onClick={() => handleButtonClick("text")}>
            {selectedButton === "text" ? "글" : <img src="/icons/edit.svg" />}
          </button>
          <button
            style={
              selectedButton === "voice" ? style.selectedBtn : style.newbtns
            }
            onClick={() => handleButtonClick("voice")}>
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
          }}></textarea>
        <div style={style.voiceContainer }               
        onClick={onRec ? stopRec : startRec}>
          {!onRec ? (
            <button
              style={style.recordBtn}
              >
              <img style={style.recordImg} src="/icons/voiceWhite.svg" />
              <div style={style.recordTxt}>누르고 말하기</div>
            </button>
          ) : (
            <Waveform
              size={40}
              lineWeight={3.5}
              speed={1}
              color="white"
            />
          )}

          {audioUrl ? <audio src={audioUrl} controls></audio> : null}
        </div>

        <button
          style={style.submitBtn}
          onClick={selectedButton === "voice" ? requestAudioPost : requestPost}>
          <img src="/icons/check.svg" />
          &nbsp; 작성완료
        </button>
      </div>
    </>
  );
}

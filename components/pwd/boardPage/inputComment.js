import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "@/firebase/storage";
import { useState, useRef, useEffect } from "react";
import { getCookie } from "@/public/functions/cookie";

export default function InputComments({ commentList, setCommentList }) {
  const [isClicked, setIsClicked] = useState(false);

  const [comment, setComment] = useState("");

  function registComment() {
    if (comment === "") return;
    fetch("/api/guidely/api/posts/1/comments", {
      method: "POST",
      headers: {
        accessToken: getCookie("accessToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "TEXT", // TEXT, VOICE
        content: comment,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setCommentList([...commentList, res]);
        setComment("");
      });
  }

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
          console.log("File available at", downloadURL);
          setAudioUrl(downloadURL);
          setAudioFile(null);
        });
      }
    );
  }

  useEffect(() => {
    if (audioFile) uploadAudio(audioFile);
  }, [audioFile]);

  // 얘는 누르고 말하기 누르면 녹음 한번더 누르면 멈추기
  const handleRecordClick = () => {
    if (onRec) {
      stopRec();
      console.log("녹음멈춤");
    } else {
      startRec();
      console.log("녹음시작");
    }
  };
  //   얘는 왼쪽에 녹음 버튼 눌렀는지 감시
  const handleIsClick = () => {
    setIsClicked(!isClicked);
  };

  const style = {
    forfix: {
      position: "fixed",
      bottom: "74px",
      width: "100%",
      backgroundColor: "white",
      //padding: '10px',
      height: "max-content",
    },
    container: {
      display: "flex",
      bottom: "0px",
      backgroundColor: "white",
      padding: "1% 1% 3% 3%",
    },
    circleRec: {
      width: "36px",
      height: "36px",
      borderRadius: "18px",
      backgroundColor: isClicked ? "black" : "white",
      marginRight: "10px",
      border: "none",
      boxShadow: isClicked ? "none" : "inset 0px 1px 2px rgba(0, 0, 0, 0.5)",
    },
    textareaCon: {
      width: "80vw",
      display: "flex",
      position: "relative", // 상대적 위치 설정
      resize: "none",
      fontFamily: "Pretendard",
    },
    inputarea: {
      width: "100%",
      height: "26px",
      border: "0",
      backgroundColor: "#F1F3F5",
      borderRadius: "30px",
      display: "flex",
      alignItems: "center",
      padding: "10px 0 0 10px",
      fontFamily: "Pretendard",
    },
    submitbtn: {
      position: "absolute", // 절대 위치 설정
      right: "0", // 오른쪽에 배치
      top: "52%", // 수직 가운데 정렬
      transform: "translateY(-50%)", // 수직 가운데 정렬
      background: "none",
      border: "none",
      cursor: "pointer",
    },
    waitingRec: {
      width: "80vw",
      height: "27.5px",
      border: "0",
      backgroundColor: onRec ? "black" : "#F1F3F5",
      color: onRec ? "white" : "black",
      borderRadius: "30px",
      display: "flex",
      alignText: "center",
      justifyContent: "center",
      paddingTop: "8px",
      fontSize: "14px",
      fontWeight: "700",
    },
  };

  return (
    <div style={style.forfix}>
      <div style={style.container}>
        <div>
          {/* 녹음버튼 */}
          <button style={style.circleRec} onClick={handleIsClick}>
            {isClicked ? (
              <img src="/icons/blackvoice.svg" alt="녹음" />
            ) : (
              <img src="/icons/voice.svg" alt="녹음" />
            )}
          </button>
        </div>
        {isClicked ? (
          <div style={style.textareaCon} onClick={handleRecordClick}>
            {onRec ? (
              <div style={style.waitingRec}>녹음 중</div>
            ) : (
              <div style={style.waitingRec}>누르고 말하기</div>
            )}
          </div>
        ) : (
          <div style={style.textareaCon}>
            {/* 녹음 중이 아니면 텍스트 입력 필드를 표시합니다. */}
            <textarea
              style={style.inputarea}
              value={comment}
              onChange={(val) => {
                setComment(val.target.value);
              }}
            />
            <button style={style.submitbtn} onClick={registComment}>
              <img src="/icons/commsub.svg" alt="전송" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// function AudioRecorder() {
//   const [onRec, setonRec] = useState(false);
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);

//   const handleStartRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorderRef.current = new MediaRecorder(stream);

//       mediaRecorderRef.current.ondataavailable = (e) => {
//         if (e.data.size > 0) {
//           audioChunksRef.current.push(e.data);
//         }
//       };

//       mediaRecorderRef.current.onstop = () => {
//         const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
//         const audioUrl = URL.createObjectURL(audioBlob);
//         // 여기서 녹음된 오디오를 저장하거나 다루는 로직을 추가할 수 있습니다.
//       };

//       mediaRecorderRef.current.start();
//       setonRec(true);
//     } catch (error) {
//       console.error('Error starting recording:', error);
//     }
//   };

//   const handleStopRecording = () => {
//     if (mediaRecorderRef.current && onRec) {
//       mediaRecorderRef.current.stop();
//       setonRec(false);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleStartRecording} disabled={onRec}>
//         Start Recording
//       </button>
//       <button onClick={handleStopRecording} disabled={!onRec}>
//         Stop Recording
//       </button>
//     </div>
//   );
// }

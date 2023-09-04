import React, { useState, useRef } from "react";

export default function InputComments() {
  const [isRecording, setRecording] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const mediaRecorderRef = useRef(null); // mediaRecorderRef 추가
  const audioChunksRef = useRef([]);


// 얘는 누르고 말하기 누르면 녹음 한번더 누르면 멈추기
  const handleRecordClick = () => {
    if (isRecording) {
        stopRecording();
        console.log("녹음멈춤");
      } else {
        startRecording();
        console.log("녹음시작");
      }
  };
//   얘는 왼쪽에 녹음 버튼 눌렀는지 감시
  const handleIsClick = () => {
    setIsClicked(!isClicked);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mp3" });
        const audioUrl = URL.createObjectURL(audioBlob);
        // 여기서 녹음된 오디오를 저장하거나 다루는 로직을 추가할 수 있습니다.
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const style = {
    forfix:{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        //padding: '10px',
        height: 'max-content'
    },
    container: {
      display: "flex",
      bottom: '0px',
      backgroundColor:'white',
      padding: '1% 1% 1% 3%'
    },
    circleRec: {
      width: "36px",
      height: "36px",
      borderRadius: "18px",
      backgroundColor: isClicked ? "black" : "white",
      marginRight: '10px',
      border: "none",
      boxShadow: isClicked ? "none": "inset 0px 1px 2px rgba(0, 0, 0, 0.5)"  ,
    },
    textareaCon: {
      width: "80vw",
      display: "flex",
      position: "relative", // 상대적 위치 설정
    },
    inputarea: {
      width: "100%",
      height: "26px",
      border: "0",
      backgroundColor: "#F1F3F5",
      borderRadius: "30px",
      display: "flex", 
      alignItems: "center",
      padding: '10px 0 0 10px'
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
    waitingRec:{
        width: "80vw",
        height: "27.5px",
        border: "0",
        backgroundColor: isRecording? "black" : "#F1F3F5",
        color: isRecording? "white" : "black",
        borderRadius: "30px",
        display: "flex", 
        alignText: "center",
        justifyContent: "center",
        paddingTop: '8px',
        fontSize: "14px",
        fontWeight: "700",
    }
  };

  return (
    <div style={style.forfix}>
    <div style={style.container}>
      <div>
        {/* 녹음버튼 */}
        <button style={style.circleRec} onClick={handleIsClick}>
          {isClicked ? (
            <img src="/icons/blackvoice.svg"  alt="녹음" />
          ) : (
            <img src="/icons/voice.svg" alt="녹음" />
          )}
        </button>
      </div>
      {isClicked? (
        <div style={style.textareaCon} onClick={handleRecordClick}>
           {isRecording ? (
              <div style={style.waitingRec}>녹음 중</div>
            ) : (
              <div style={style.waitingRec}>누르고 말하기</div>
            )}
        </div>
      ) : (
        <div style={style.textareaCon}>
          {/* 녹음 중이 아니면 텍스트 입력 필드를 표시합니다. */}
          <textarea style={style.inputarea} />
          <button style={style.submitbtn}>
            <img src="/icons/commsub.svg" alt="전송" />
          </button>
        </div>
      )}
    </div>
    </div>
  );
}



// function AudioRecorder() {
//   const [isRecording, setIsRecording] = useState(false);
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
//       setIsRecording(true);
//     } catch (error) {
//       console.error('Error starting recording:', error);
//     }
//   };

//   const handleStopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleStartRecording} disabled={isRecording}>
//         Start Recording
//       </button>
//       <button onClick={handleStopRecording} disabled={!isRecording}>
//         Stop Recording
//       </button>
//     </div>
//   );
// }



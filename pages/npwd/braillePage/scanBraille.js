import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "@/firebase/storage";
import { NavBar } from "@/components/npwd/braillePage/navBar";

export default function Scanning() {
  const imageInputRef = useRef();
  const [translationResult, setTranslationResult] = useState();

  const style = {
    container: {
      backgroundColor: "#f5f6f6",
      borderRadius: "16px",
      margin: "31px auto 0  auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "70vw",
      //height: '20vh',
      padding: "10%",
      height: "max-content",
      fontSize: "15px",
      fontWeight: "600",
    },
  };

  return (
    <>
      <TitleBox />
      <DetailInput imageInputRef={imageInputRef}></DetailInput>
      <SubmitButton
        imageInputRef={imageInputRef}
        setTranslationResult={setTranslationResult}
      ></SubmitButton>
      <div style={style.container}>{translationResult ?? "변환내용"}</div>
      <NavBar />
    </>
  );
}

function DetailInput({ imageInputRef }) {
  const [imageUrl, setImageUrl] = useState();
  //const [ifDetailOnEdit, setIfDetailOnEdit] = useState(false);
  const [imageFile, setImageFile] = useState();

  const progressCircleRef = useRef();

  function clearImage() {
    setImageUrl(null);
    setImageFile(null);
  }

  function uploadImage(file) {
    const imageRef = ref(storage, `images/${uuid()}.png`);
    const uploadTask = uploadBytesResumable(imageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        // console.log("Upload is " + progress + "% done");
        if (progressCircleRef)
          progressCircleRef.current.style["stroke-dashoffset"] =
            157 - 157 * progress;
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
          setImageUrl(downloadURL);
          // console.log("File available at", downloadURL);
        });
      }
    );
  }

  return (
    <div className="container">
      <div className="imageButtonBox">
        <input
          type="file"
          className="ghostImageInput"
          ref={imageInputRef}
          onChange={(file) => {
            if (file.target.files.length > 0) {
              setImageFile(file.target.files[0]);
              uploadImage(file.target.files[0]);
            }
          }}
          accept="image/"
        />
        <button
          className="button"
          onClick={() => {
            clearImage();
            imageInputRef.current.click();
          }}
        >
          <Image src="/icons/camera.svg" width={16} height={16} alt="카메라" />
        </button>
        {imageUrl ? (
          <img src={imageUrl} className="image" alt="사진" />
        ) : imageFile ? (
          <div className="imageOnUploadBox">
            <img
              src={URL.createObjectURL(imageFile)}
              className="imageOnUpload"
              alt="사진 업로드 중"
            />
            <svg className="imagePercentageCircle" overflow={"visible"}>
              <circle cx={"50%"} cy={"50%"} r={"25"} ref={progressCircleRef} />
            </svg>
          </div>
        ) : (
          <div
            className="imageText"
            onClick={() => {
              clearImage();
              imageInputRef.current.click();
            }}
          >
            사진 첨부하기
          </div>
        )}
      </div>

      <style jsx>{`
        .container {
          background-color: #f5f6f6;
          border-radius: 16.01px;
          margin: 5vh auto 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margintop: ;
          width: 90vw;
        }

        .button {
          width: 32px;
          height: 32px;
          border-radius: 16px;
          background-color: white;
          border: none;
          box-shadow: 0px 2.29px 2.29px rgba(0, 0, 0, 0.1);

          display: flex;
          justify-content: center;
          align-items: center;

          margin: 15px 0px auto 24px;
        }

        .imageButtonBox {
          width: 348px;
          display: flex;
        }

        .ghostImageInput {
          display: none;
        }

        .imageText {
          font-size: 15px;
          font-weight: 600;
          margin: 24px auto 24px auto;
          width: 240px;
          text-align: center;
        }

        .imageOnUploadBox {
          margin: 18px auto 14px auto;
          width: 241px;
          position: relative;
        }
        .imageOnUpload {
          width: 241px;
          border-radius: 13px;

          filter: blur(2px);
        }
        .imagePercentageCircle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-90deg);

          width: 50px;
          height: 50px;
        }
        .imagePercentageCircle circle {
          fill: none;
          stroke-width: 5px;
          stroke: #dadada;

          stroke-dasharray: 157;
          stroke-dashoffset: 157;
          stroke-linecap: round;
          transition: stroke-dashoffset 0.5s ease;
        }
        .image {
          width: 241px;
          margin: 14px auto 14px auto;
          border-radius: 13px;
        }

        .divider {
          width: 331px;
          height: 0.3px;
          background-color: rgba(0, 0, 0, 0.25);
        }

        .detailButtonBox {
          width: 348px;
          display: flex;
        }

        .detailText {
          font-size: 15px;
          font-weight: 600;

          margin: 24px auto 24px auto;
          width: 241px;
          text-align: center;
        }

        .detailInput {
          margin: 18px auto 14px auto;
          width: 241px;
          resize: none;
          font-size: 15px;
          font-weight: 600;
          font-family: "Pretendard";
          border-width: 0.3px;
          border-radius: 3px;
          background-color: transparent;
        }
      `}</style>
    </div>
  );
}

function SubmitButton({ imageInputRef, setTranslationResult }) {
  const sendPic = (e) => {
    e.preventDefault();
    setOnTranslate(true);

    if (imageInputRef && imageInputRef.current.files.length > 0) {
      const formData = new FormData();
      formData.append("image", imageInputRef.current.files[0], "image.png");

      fetch("/api/guidelyAI/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          setOnTranslate(false);
          if (!response.ok) {
            throw new Error("에러발생!");
          }
          return response.json();
        })
        .then((data) => {
          setTranslationResult(data.result.join(" "));
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      //console.log(imageInputRef.current);
      //alert("파일을 선택하세요.");
    }
  };

  const [onTranslate, setOnTranslate] = useState(false);

  return (
    <div className="container" onClick={onTranslate ? null : sendPic}>
      {onTranslate ? (
        <svg className="ring" viewBox="25 25 50 50" stroke-width="5">
          <circle cx="50" cy="50" r="20" />
        </svg>
      ) : (
        "변환하기"
      )}
      <style jsx>{`
        .container {
          width: 104px;
          height: 45px;
          border-radius: 35px;
          background-color: #181818;
          margin: 31px auto 0 auto;

          display: flex;
          justify-content: center;
          align-items: center;

          color: #ffffff;
          font-size: 15px;
          font-weight: 500;
        }

        .ring {
          --uib-size: 40px;
          --uib-speed: 2s;
          --uib-color: #ffffff;

          height: var(--uib-size);
          width: var(--uib-size);
          vertical-align: middle;
          transform-origin: center;
          animation: rotate var(--uib-speed) linear infinite;
        }

        .ring circle {
          fill: none;
          stroke: var(--uib-color);
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
          stroke-linecap: round;
          animation: stretch calc(var(--uib-speed) * 0.75) ease-in-out infinite;
        }

        @keyframes rotate {
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes stretch {
          0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 90, 200;
            stroke-dashoffset: -35px;
          }
          100% {
            stroke-dashoffset: -124px;
          }
        }
      `}</style>
    </div>
  );
}

function TitleBox() {
  return (
    <div className="titleBox">
      <div className="titleContainer">
        <div className="inside">
          <div className="textBox1">점자</div>
          <Image
            className="icon"
            alt="translateIcon"
            width={32}
            height={32}
            src={"/icons/translate.svg"}
          />
          <div className="textBox2">한국어</div>
        </div>
      </div>

      <style jsx>{`
        .titleBox {
          width: 100%;
          height: 30%;
        }
        .titleContainer {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100vw;
          height: 10vh;
        }
        .inside {
          font-weight: normal;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .textBox1 {
          margin: 50px 50px 50px 35px;
        }
        .textBox2 {
          margin: 50px 25px 50px 47px;
        }
        .icon {
          position: fixed;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}

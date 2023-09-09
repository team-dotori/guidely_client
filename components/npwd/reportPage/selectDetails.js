import Image from "next/image";
import SelectionFinshed from "./selectionFinished";
import { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "@/firebase/storage";

export default function SelectDetails({
  detail,
  setDetail,
  imageURL,
  setImageURL,
  toNextStep,
  toCurrentStep,
  ifCurrentStep,
}) {
  const [curDetail, setCurDetail] = useState("");
  return (
    <div className="container">
      {detail ? (
        <SelectionFinshed
          title="상세내용"
          content={detail}
          toCurrentStep={toCurrentStep}
        />
      ) : null}

      {ifCurrentStep ? (
        <div className="optionBox">
          <div className="topDivider" />
          <div className="title">상세내용을 작성해 주세요.</div>
          <DetailInput
            detail={curDetail}
            setDetail={setCurDetail}
            imageURL={imageURL}
            setImageURL={setImageURL}
          />
          {curDetail.length != 0 || imageURL.length != 0 ? (
            <SubmitButton
              toNextStep={toNextStep}
              setDetail={setDetail}
              curDetail={curDetail}
            />
          ) : null}
          <div className="bottomDivider" />
        </div>
      ) : null}

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .optionBox {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .topDivider {
          width: 331px;
          height: 0.3px;
          background-color: rgba(0, 0, 0, 0.25);
          margin-top: 19px;
        }

        .title {
          margin: 53px 0px 31px 0px;
          font-size: 22.87px;
          font-weight: 600;
        }

        .bottomDivider {
          width: 331px;
          height: 0.3px;
          background-color: rgba(0, 0, 0, 0.25);
          margin-top: 13.27px;
          margin-bottom: 19px;
        }
      `}</style>
    </div>
  );
}

function DetailInput({ detail, setDetail, imageURL, setImageURL }) {
  const [ifDetailOnEdit, setIfDetailOnEdit] = useState(false);
  const [imageFile, setImageFile] = useState();

  const imageInputRef = useRef();
  const progressCircleRef = useRef();

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
          setImageURL(downloadURL);
          setImageFile(null);
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
            imageInputRef.current.click();
          }}
        >
          <Image src="/icons/camera.svg" width={16} height={16} alt="카메라" />
        </button>
        {imageURL ? (
          <img src={imageURL} className="image" alt="사진" />
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
              imageInputRef.current.click();
            }}
          >
            사진 첨부하기
          </div>
        )}
      </div>

      <div className="divider" />

      <div className="detailButtonBox">
        <button
          className="button"
          onClick={() => {
            setIfDetailOnEdit(!ifDetailOnEdit);
          }}
        >
          <Image src="/icons/edit.svg" width={16} height={16} alt="수정" />
        </button>
        {ifDetailOnEdit ? (
          <textarea
            className="detailInput"
            value={detail}
            onChange={(val) => {
              val.target.style.height = "auto";
              val.target.style.height = `${val.target.scrollHeight}px`;

              setDetail(val.target.value);
            }}
          ></textarea>
        ) : (
          <div
            className="detailText"
            onClick={() => {
              setIfDetailOnEdit(true);
            }}
          >
            {detail.length === 0 ? "상세내용 작성하기" : detail}
          </div>
        )}{" "}
      </div>

      <style jsx>{`
        .container {
          background-color: #f5f6f6;
          border-radius: 16.01px;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          width: 348px;
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

          margin: 17px 0px auto 24px;
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
          width: 241px;
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
          margin: 18px auto 14px auto;
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

function SubmitButton({ toNextStep, curDetail, setDetail }) {
  return (
    <div
      className="container"
      onClick={() => {
        if (curDetail.length === 0) {
          setDetail("이미지");
        } else {
          setDetail(curDetail);
        }
        toNextStep();
      }}
    >
      작성완료
      <style jsx>{`
        .container {
          width: 104px;
          height: 30px;
          border-radius: 35px;
          background-color: #181818;
          margin-top: 31px;

          display: flex;
          justify-content: center;
          align-items: center;

          color: #ffffff;
          font-size: 15px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}

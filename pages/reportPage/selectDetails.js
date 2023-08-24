import Image from "next/image";

export default function SelectDetails() {
  return (
    <div className="container">
      <div className="title">상세내용을 작성해 주세요.</div>
      <DetailInput />

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .title {
          margin: 53px 0px 31px 0px;
          font-size: 22.87px;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

function DetailInput() {
  return (
    <div className="container">
      <button
        className="button"
        onClick={() => {
          console.log("camera button clicked!");
        }}
      >
        <Image src="/icons/camera.svg" width={16} height={14.4} alt="camera" />
      </button>
      <div style={{ width: 29.73 }} />
      <button
        className="button"
        onClick={() => {
          console.log("edit button clicked!");
        }}
      >
        {" "}
        <Image src="/icons/edit.svg" width={16} height={16} alt="edit" />
      </button>

      <style jsx>{`
        .container {
          width: 347.56px;
          height: 96.04px;
          background-color: #f5f6f6;
          border-radius: 16.01px;

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .title {
          margin: 53px 0px 31px 0px;
          font-size: 22.87px;
          font-weight: 600;
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
        }
      `}</style>
    </div>
  );
}

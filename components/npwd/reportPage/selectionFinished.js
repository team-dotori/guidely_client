export default function SelectionFinshed({ title, content, toCurrentStep }) {
  return (
    <div className="container" onClick={toCurrentStep}>
      <div className="title">{title}</div>
      <div className="contentBox">
        <div className="yellowCircle" />
        <div className="content">{content}</div>
        <div className="transparentCircle" />
      </div>

      <style jsx>{`
        .container {
          margin-top: 22px;
          width: 331px;
          height: 74px;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .title {
          font-size: 13.72px;
        }

        .contentBox {
          border-radius: 35px;
          width: 331px;
          height: 47px;
          background-color: #181818;

          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .content {
          font-weight: 600;
          color: #ffffff;

          width: 269px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .yellowCircle {
          width: 7px;
          height: 7px;
          margin-left: 16px;
          background-color: #fcff59;
          border-radius: 50%;
        }

        .transparentCircle {
          width: 7px;
          height: 7px;
          margin-right: 16px;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
}

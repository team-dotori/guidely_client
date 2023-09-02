export default function Panel({ locationName, reportCount }) {
  return (
    <div className="background">
      <div className="container">
        <div>
          <b>{locationName}</b>에
        </div>
        <div>
          총 <b>{reportCount}개</b>의 신고가 있습니다.
        </div>
      </div>
      <style jsx>{`
        .background {
          width: 100vw;

          background-color: #fcff59;
          display: flex;
          flex-direction: center;
          justify-content: center;

          border-radius: 0px 0px 15px 15px;
          box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        }
        .container {
          width: 331px;
          padding-top: 61px;
          padding-bottom: 39px;
          display: flex;
          flex-direction: column;
          align-items: start;

          color: #000000;
          font-size: 26px;
          font-weight: 400;
          line-height: 38px;
          letter-spacing: -0.56px;
        }

        .container b {
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}

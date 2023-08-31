export default function AppBar() {
  return (
    <div className="container">
      <div className="textBox">홈</div>
      <style jsx>{`
        .container {
          width: 375px;
          height: 114px;
          background-color: #181818;

          position: relative;
        }

        .textBox {
          position: absolute;
          bottom: 30px;
          left: 22px;

          color: #ffffff;
          font-size: 20px;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}

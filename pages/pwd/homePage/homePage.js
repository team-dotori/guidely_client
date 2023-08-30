import AppBar from "./appbar.js";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="container">
      <AppBar />
      <div className="listColumn">
        <ListItem
          image={
            <Image
              src={"/icons/alert_white.svg"}
              width={41}
              height={33.47}
              alt="신고 내역 알림"
            />
          }
          title="신고 내역 알림"
        />
        <ListItem
          image={
            <Image
              src={"/icons/list_white.svg"}
              width={36}
              height={36}
              alt="신고 내역 조회"
            />
          }
          title="신고 내역 조회"
        />
        <ListItem
          image={
            <Image
              src={"/icons/location_white.svg"}
              width={41}
              height={48}
              alt="길찾기"
            />
          }
          title="길찾기"
        />
        <ListItem
          image={
            <Image
              src={"/icons/speechBubble_white.svg"}
              width={41}
              height={41}
              alt="게시판"
            />
          }
          title="게시판"
        />
      </div>

      <style jsx>{`
        .container {
          width: 100vw;
          height: 100vh;

          background-color: #181818;

          display: flex;
          flex-direction: column;
          align-items: center;

          position: relative;
        }

        .listColumn {
          display: flex;
          flex-direction: column;
          align-items: center;

          position: absolute;
          bottom: 74px;
        }
      `}</style>
    </div>
  );
}

function ListItem({ image, title }) {
  return (
    <div className="container">
      <div className="icon">{image}</div>
      <div className="title">{title}</div>
      <div className="divider" />
      <style jsx>{`
        .container {
          width: 329px;
          height: 85px;

          display: flex;
          align-items: center;

          position: relative;
        }

        .icon {
          display: flex;
          align-items: center;
          width: 57px;
        }

        .title {
          color: #ffffff;
          font-size: 45px;
          font-weight: 900;
        }

        .divider {
          position: absolute;
          bottom: 0px;
          width: 329px;
          height: 2px;

          background-color: #ffffff;
        }
      `}</style>
    </div>
  );
}

import Image from "next/image";

export default function AppBar() {
  return (
    <div className="background">
      <div className="container">
        <Image
          src={"/icons/logo_guidely_long.svg"}
          width={90.22}
          height={15}
          alt="로고"
          style={{ marginBottom: 30 }}
        />
      </div>
      <style jsx>{`
        .background {
          width: 100vw;
          background-color: #181818;
          position: relative;
          display: flex;
          justify-content: center;
        }
        .container {
          width: 375px;
          height: 114px;

          position: relative;
          display: flex;
          justify-content: center;
          align-items: end;
        }
      `}</style>
    </div>
  );
}

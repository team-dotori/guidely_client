import Image from "next/image";
import { useEffect } from "react";

export default function Like({ reportId }) {
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {}, []);

  function requestLike() {
    fetch(`/api/guidely/api/declaration/like/${reportId}`, {
      method: "PATCH",
    });
  }

  return (
    <div className="container" onClick={requestLike}>
      <Image
        src="/icons/like.svg"
        width={20}
        height={20}
        alt="도움이 되었어요"
      />
      <div style={{ width: 8 }}></div>
      <div className="text">도움이 되었어요</div>
      <style jsx>{`
        .container {
          position: fixed;
          bottom: 90px;

          background-color: #181818;
          padding: 11px 18px;
          border-radius: 18px;

          display: flex;
          align-items: center;
        }

        .text {
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}

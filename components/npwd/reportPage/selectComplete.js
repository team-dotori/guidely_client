import { useEffect, useState } from "react";
import Image from "next/image";

export default function SelectComplete() {
  return (
    <div className="container">
      <div className="title">신고가 완료되었습니다.</div>
      <ConfettiBox />

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .title {
          margin-top: 49px;
          font-size: 22.87px;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

function ConfettiBox() {
  const confettiNum = 35;
  const confettiKinds = 7;
  const confettiImageList = [
    <Image
      key={0}
      src="/icons/confetties/confetti0.svg"
      width={28}
      height={17}
      alt="지도 보기"
    />,

    <Image
      key={1}
      src="/icons/confetties/confetti1.svg"
      width={13}
      height={13}
      alt="지도 보기"
    />,

    <Image
      key={2}
      src="/icons/confetties/confetti2.svg"
      width={33}
      height={43}
      alt="지도 보기"
    />,

    <Image
      key={3}
      src="/icons/confetties/confetti3.svg"
      width={44}
      height={17}
      alt="지도 보기"
    />,

    <Image
      key={4}
      src="/icons/confetties/confetti4.svg"
      width={28}
      height={22}
      alt="지도 보기"
    />,

    <Image
      key={5}
      src="/icons/confetties/confetti5.svg"
      width={30}
      height={31}
      alt="지도 보기"
    />,

    <Image
      key={6}
      src="/icons/confetties/confetti5.svg"
      width={17}
      height={29}
      alt="지도 보기"
    />,
  ];

  const [confettiList, setConfettiList] = useState([]);
  const [startLeftRange, setStartLeftRange] = useState([]);

  const startBottom = 300;
  const endBottom = -700;
  const horRange = 200;
  const upRatioRange = 2;

  useEffect(() => {
    setStartLeftRange([
      window.innerWidth / 2 - 200,
      window.innerWidth / 2 + 200,
    ]);
  }, []);

  useEffect(() => {
    let newList = [];
    if (startLeftRange.length != 0) {
      for (let i = 0; i < confettiNum; i++)
        newList.push({
          startLeft:
            Math.random() * (startLeftRange[1] - startLeftRange[0]) +
            startLeftRange[0],
          horMove: Math.random() * (horRange * 2) - horRange,
          upRatio: -1 * Math.random() * upRatioRange,
        });
    }
    setConfettiList(newList);
  }, [startLeftRange]);

  console.log(`/icons/confetties/confetti${0}.svg`);

  return (
    <div>
      {confettiList.length == 0
        ? null
        : confettiList.map((item, ind) => (
            <Confetti
              key={ind}
              ind={ind}
              startBottom={startBottom}
              endBottom={endBottom}
              startLeft={item.startLeft}
              endLeft={item.startLeft + item.horMove}
              upRatio={item.upRatio}
            >
              {confettiImageList[ind % confettiKinds]}
            </Confetti>
          ))}
    </div>
  );
}

function Confetti({
  ind,
  startBottom,
  endBottom,
  startLeft,
  endLeft,
  upRatio,
  children,
}) {
  return (
    <div className="confetti">
      {children}
      <style jsx>{`
        .confetti {
          opacity: 0;
          position: fixed;
          animation: ${"verticalAnimation" + ind.toString()} 3s,
            ${"horizontalAnimation" + ind.toString()} 3s, color 3s linear;
        }

        @keyframes ${"verticalAnimation" + ind.toString()} {
          0% {
            bottom: ${startBottom}px;
            animation-timing-function: cubic-bezier(
              0.09,
              ${upRatio},
              0.24,
              0.98
            );
          }
          100% {
            bottom: ${endBottom}px;
          }
        }

        @keyframes ${"horizontalAnimation" + ind.toString()} {
          0% {
            left: ${startLeft}px;
          }
          100% {
            left: ${endLeft}px;
          }
        }

        @keyframes color {
          0% {
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

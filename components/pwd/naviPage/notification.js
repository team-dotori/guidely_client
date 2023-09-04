import React from "react";
import TruncatedText from "@/components/npwd/boardPage/TruncatedText";

export default function Notification({info}) {
  const style = {
    width: '80%',
    height: '5%',
    backgroundColor: '#FCFF59',
    borderRadius: '19px',
    fontSize: '24px',
    fontWeight: '700',
    padding: '6%',
    display: 'flex',
    justifyContent: 'center', // 수평 가운데 정렬
    alignItems: 'center', // 수직 가운데 정렬
    margin: '5% auto 5% auto'
  };

  return (
    <div style={style}>
        <TruncatedText text={info} maxLength={15} />
    </div>
  );
}

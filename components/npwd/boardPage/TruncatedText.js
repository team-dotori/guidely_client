import React from 'react';

export default function TruncatedText({ text, maxLength }) {
  if (text.length <= maxLength) {
    return <>{text}</>;
  }

  const truncatedText = text.slice(0, maxLength) + '...';

  return (
    <div title={text}> {/* 툴팁으로 전체 내용을 보여주기 위한 title 속성 */}
      {truncatedText}
    </div>
  );
}

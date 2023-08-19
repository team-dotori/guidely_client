import React from 'react';

export default function badge() {
  const style = {
    badgeimg:{
        width: '120px',
        height: '120px',
        backgroundColor: 'pink'
    }
  }



  return <div>
    <div style={style.badgeimg}>뱃지 이미지</div>
    <div>뱃지 이름</div>
    <div>달성 날짜</div>
  </div>
}
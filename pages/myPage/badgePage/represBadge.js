import React from 'react';

export default function represBadge({name, date, badgeImageName, acq }) {

  const style = {
    badgeBox:{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      paddingTop: '25px',
      paddingBottom: '15px', // 적절한 패딩을 설정
      width:'100%',
    },
    badgeimg:{
        width: '118px',
        height: '118px',
        backgroundColor: 'pink',
        borderRadius: '59px', 
        marginTop: '5%',
        marginBottom: '7%',
    },
    badgeName:{
      marginBottom: '5%',
      fontSize: '18px',
    },

    badgeDate:{
      fontSize: '13px',
    },
    
  }

  const imgstyle ={
    width: '100%',
    height: '100%',

  }

  return (
    <div style={style.badgeBox}>
      <div style={{fontSize:'13px'}}>나의 대표 뱃지</div>
      <div style={style.badgeimg}>
        <img
          style={imgstyle}
          src={`/img/badges/${badgeImageName}.svg`} // 해당 뱃지 이미지 이름에 맞는 이미지 사용
          alt={`${name} 뱃지`}
        />
      </div>
      <div style={style.badgeName}><strong>{name}</strong></div>
      <div style={style.badgeDate}>{date}</div>
    </div>
  );

}
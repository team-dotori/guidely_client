import React from 'react';

export default function represBadge({name, level, badgeImageName}) {

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
        marginTop: '3%',
        marginBottom: '5%',
    },
    badgeName:{
      marginBottom: '3%',
      fontSize: '18px',
      fontWeight: 'bold',
    },

    badgeLevel:{
      fontSize: '13px',
      marginBottom: '5%',
      fontWeight: 'bold',
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
      <div style={style.badgeName}>{name}</div>
      <div style={style.badgeLevel}>레벨 {level}</div>
    </div>
  );

}
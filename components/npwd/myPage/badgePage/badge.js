import React, {useState} from 'react';


export default function badge({name, date, badgeImageName, acq, level, howtoGet, setIsOpen, setOpenedData}) {
  // const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  const style = {
    badgeBox:{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: '5%', // 적절한 패딩을 설정
      paddingTop: '20px',
      width:'25%'
    },
    badgeimg:{
        width: '70px',
        height: '70px',
        // backgroundColor: 'pink',
        borderRadius: '35px', 
        marginBottom: '10%',
        opacity: acq ? 1 : 0.25,
    },
    badgeName:{
      marginBottom: '5%',
      fontSize: '13px',
      fontWeight: 'bold'
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
    <div style={style.badgeBox} onClick={() => {
      setIsOpen(old => !old);
      setOpenedData({
        name, date, badgeImageName, acq, level, howtoGet
      })
    }}>
      <div style={style.badgeimg}>
        <img
          style={imgstyle}
          src={`/img/badges/${badgeImageName}.svg`} // 해당 뱃지 이미지 이름에 맞는 이미지 사용
          alt={`${name} 뱃지`}
        />
      </div>
      <div style={style.badgeName}>{name}</div>
      {acq ? <div style={style.badgeDate}>{date}</div> : <div>-</div>}
    </div>
  );

}
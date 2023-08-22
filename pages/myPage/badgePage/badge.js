import React, {useState} from 'react';


export default function badge({name, date, badgeImageName, acq}) {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

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
    },

    badgeDate:{
      fontSize: '13px',
    },
    
  }

  const imgstyle ={
    width: '100%',
    height: '100%',

  }

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={style.badgeBox} onClick={openModal}>
      <div style={style.badgeimg}>
        <img
          style={imgstyle}
          src={`/img/badges/${badgeImageName}.svg`} // 해당 뱃지 이미지 이름에 맞는 이미지 사용
          alt={`${name} 뱃지`}
        />
      </div>
      <div style={style.badgeName}><strong>{name}</strong></div>
      {acq && <div style={style.badgeDate}>{date}</div>}
    </div>
  );

}
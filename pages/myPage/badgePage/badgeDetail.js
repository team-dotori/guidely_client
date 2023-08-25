import React, {useState} from 'react';


export default function BadgeModal({ name, level, badgeImageName, acq }) {
    const [buttonClicked, setButtonClicked] = useState(false);
    
    const style = {
    badgeBox:{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      paddingTop: '5%',
      paddingBottom: '5%', // 적절한 패딩을 설정
      width:'100%',
    },
    badgeimg:{
        width: '118px',
        height: '118px',
        borderRadius: '59px', 
        marginBottom: '5%',
        opacity: acq ? 1 : 0.25,
    },
    badgeName:{
      fontSize: '18px',
      fontWeight: 'bold'
    },

    badgeLevel:{
      fontSize: '13px',
      marginBottom: '5%',
      display: 'flex', // 가운데 정렬을 위해 추가
      justifyContent: 'center',
      fontWeight: 'bold'
    },

    infoBox:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '20%'
    },

    rpButton:{
        width: '300px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '13px',
        border: '1px solid #181818',
        fontWeight: '600', // semi bold 수준
        backgroundColor: buttonClicked ? 'black' : 'white', // false 일때 좌 true 일때 우
        color: buttonClicked ? 'white' : '#181818', // 버튼 클릭 시 글자색 변경
    },

    badgeGet:{
        fontSize: '15px',
        marginTop: '20%',
    }
    
  }

  const imgstyle ={
    width: '100%',
    height: '100%',

  }

  const handleClick = () => {
    setButtonClicked(true); 
    // 추가로 버튼 클릭에 따른 동작 수행
  };
  

    return (
        <>
        <div style={style.badgeBox}>
          <div style={style.badgeimg}>
            <img
              style={imgstyle}
              src={`/img/badges/${badgeImageName}.svg`} // 해당 뱃지 이미지 이름에 맞는 이미지 사용
              alt={`${name} 뱃지`}
            />
          </div>
          <div style={style.badgeName}>{name}</div>
        </div>
        <div style={style.infoBox}>
          {acq ? 
          <div>
            <div style={style.badgeLevel}> 레벨 {level} </div>
            <button style={style.rpButton}
            onClick={handleClick}
            >나의 대표 뱃지로 설정하기</button>
           </div> 
           :
          <div>
            <div style={style.badgeLevel}>-</div>
            <div style={style.badgeGet}><strong>획득방법 | </strong> 어쩌고 저쩌고</div>
            </div>}
        </div>
         </>
      );
}

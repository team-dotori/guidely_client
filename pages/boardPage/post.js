import React, { useState } from 'react';
import TruncatedText from './TruncatedText';
  



export default function Post({ text, id, time, type }) {
  const [isLiked, setIsLiked] = useState(false);

  const style = {
    postbox:{
      backgroundColor :'#F1F3F5',
      width: '60vw',
      height: '120px',
      margin: 'auto',
      marginBottom: '5%',
      borderRadius: '20px', 
      padding:'4%',
    },
    profilebox:{
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      height: '40px',
      gridColumnGap: '10px',
      marginTop: '0'
    },
    profile:{
      width: '40px',
      height: '40px',
    },
    userid:{
      fontFamily: "InterBold",
      fontSize : '14px',
      marginTop: '10px',
      whiteSpace:'nowrap',
      display: 'inline',
    },
    contents :{
      paddingTop: '0.5%',
      paddingBottom: '5%',
      height : '37px',
      fontSize : '13px'
    },
    soundimgBox:{
      position: 'relative',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      marginTop: '7%'
    },
    soundimg:{
      flex: 1,
      position: 'absolute',
      marginRight: '5px',
      marginLeft: '5px'
    }
  }

  const imgstyle = {
    maxWidth: '100%',
    maxHeight: '100%',
  }

  const bottomstyle = {
    display: 'flex',
    justifyContent: 'space-between',

    date:{
      fontSize: '11px',
      flex: 1,
      textAlign: 'left',
    },
    heart: {
      flex: 1,
      textAlign: 'right',
      cursor: 'pointer',
    },
  }

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  return <div style={style.postbox}>
    <div style={style.profilebox}>
      <div style={style.profile}>
        <img src="/img/powerpuffgirl.png" style={imgstyle} alt='hi'/></div>
      <p style={style.userid}><strong>{id}</strong></p>
    </div>
      <hr></hr>
    <div style={style.contents}>
      {type === 'text' ? 
      (<TruncatedText text = {text} maxLength={30}/>)
      :(<div style={style.soundimgBox}>
        <img style={style.soundimg} src='/img/nocolorLine.svg' />
        <img style={style.soundimg} src='/img/coloredLine.svg' />
        </div>)}
    </div>
    <div style={bottomstyle}>
      <div style={bottomstyle.date}>{time}</div>
      <div style={style.heart} onClick={handleLikeClick}>
          {isLiked ? (
            <img src="/img/blackheart.svg" alt="Heart1" style={{ width: '20px', height: '20px' }} />
          ) : (
            <img src="/img/whiteheart.svg" alt="Heart2" style={{ width: '20px', height: '20px' }} />
          )}
        </div>
    </div>
  </div>
}

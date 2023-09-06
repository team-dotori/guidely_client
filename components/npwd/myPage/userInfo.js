import React from "react";
import Image from "next/image";

export default function Info(){

    const style={
        container:{
            display: 'flex',
            padding: '3%'
        },
        img:{
            borderRadius: '28px',
            marginLeft: '5%'
        },

        userName:{
            fontWeight: '700',
            fontSize: '24px',
            opacity: '0.8'
        },
        userLevel:{
            fontWeight: '500',
            fontSize: '13px',
        },
        infoContainer:{
            marginLeft: '5%',
            paddingTop: '1%'
        },
        hrStyle:{
            width: '85vw',
            border: '0.5px solid lightgray'
          }

    }

    return (
        <>
        <div style={style.container}>
            <Image src={"/img/haerin.jpeg"} width={56} height={56}
            style={style.img}
            ></Image>
            <div style={style.infoContainer}>
                <div style={style.userName}>연주24</div>
                <div>레벨</div>
            </div>
        </div>
        <hr style={style.hrStyle}/>
        </>
    )
    
}
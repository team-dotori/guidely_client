import React from 'react';


export default function BadgeModal({ name, date, badgeImageName, acq }) {
    const style = {
        container:{
            color: "red"
        }
    }

    return (
        <div style={style.container}>
            <div>{name}</div>
            <div>{date}</div>
            <div>{badgeImageName}</div>
            <div>{acq}</div>
        </div>
    );
}

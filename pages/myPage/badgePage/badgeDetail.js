import React from 'react';
import ReactModal from 'react-modal';

export default function BadgeModal({ badgeName, badgeDate, badgeImageName, acq, onClose }) {
    const style = {
        modalContent: {
            height: '10%', // 원하는 높이 값으로 조정
        },
        closeButton: {
            margin: '10px 0',
            padding: '5px 10px',
            backgroundColor: 'gray',
            color: 'white',
            borderRadius: '4px',
            cursor: 'pointer',
        },
    };

    return (
        <ReactModal
            style={{
                content: style.modalContent,
                overlay: {},
            }} >
            <div>
                <button style={style.closeButton} onClick={onClose}>
                    닫기
                </button>
            </div>
            <div>
                <div>
                    <img
                        src={`/img/badges/${badgeImageName}.svg`} // 해당 뱃지 이미지 이름에 맞는 이미지 사용
                        alt={`${badgeName} 뱃지`}
                    />
                </div>
                <div>
                    <strong>{badgeName}</strong>
                </div>
                {acq && <div>{badgeDate}</div>}
            </div>
        </ReactModal>
    );
}

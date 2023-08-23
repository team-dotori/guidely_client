import React, { useState } from "react";
import Badge from "./badgePage/badge"
import BigBadge from "./badgePage/represBadge"
import BadgeDetail from "./badgePage/badgeDetail";
import ReactModal from "react-modal";
// import styles from "./modalCss.css";


function BadgePage() {
    const bigbadge = {name: '공감왕', date: '2023.08.22', badgeImageName:'heartKing'}
    const badges = [
        { name: '퀴즈왕', date: '2023.09.23',  badgeImageName:'quizKing', acq: true },
        { name: '탐색대왕', badgeImageName:'exploreKing', acq: false},
        { name: '소통 5회', date: '2023.09.23', badgeImageName:'communicate',acq: true },
        { name: '점자왕', badgeImageName:'dotKing', acq: false},
        { name: '초보탈출', date: '2023.09.23', badgeImageName:'nonewbieKing', acq: true },
        { name: '빠른성장상', date: '2023.09.23', badgeImageName:'growingKing', acq: true },
        { name: '안전지킴이', date: '2023.09.23', badgeImageName:'safeKing', acq: true },
        { name: '콜럼버스', date: '2023.09.23', badgeImageName:'unnamed1', acq: true },
        { name: '몰라...', date: '2023.09.23', badgeImageName:'unnamed2', acq: true }
        // 더 많은 뱃지 데이터 추가 가능
    ];

    const chunkSize = 3; // 세 개씩 묶기 위한 그룹 크기

    // 배열을 chunkSize 만큼씩 묶어주는 함수
    function chunkArray(arr, size) {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    }

    const badgeGroups = chunkArray(badges, chunkSize);
    const [isOpen, setIsOpen] = useState(false);
    const [openedData, setOpenedData] = useState(null);

    const style = {
        hrstyle:{
            width:'100%',
            margin:'0px',
            borderTop: '0.3px solid lightgray'
        },
        modal:{
            height: '200px',
            width: '90%',
            backgroundColor: 'pink', 
            padding: "5%",
            inset: 0,
            borderRadius: "30px",
            top: "70%"
        }
    }



    return (
        <div>
            <BigBadge name={bigbadge.name} date={bigbadge.date} badgeImageName={bigbadge.badgeImageName}  />
            <hr style={style.hrstyle}/>
            {badgeGroups.map((group, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                    {group.map((badge, badgeIndex) => (
                        <Badge key={badgeIndex} name={badge.name} date={badge.date} badgeImageName={badge.badgeImageName} acq={badge.acq} setIsOpen={setIsOpen} setOpenedData={setOpenedData} />
                    ))}
                </div>
            ))}
            <ReactModal isOpen={isOpen} style={{ content: style.modal }}>
                <button onClick={() => setIsOpen(old => !old)}>close</button>
                {openedData && 
                (<BadgeDetail 
                    name={openedData.name} 
                    date={openedData.date} 
                    badgeImageName={openedData.badgeImageName}
                    acq={openedData.acq}  />
                    )}
            
            </ReactModal>

        </div>
    );

}

export default BadgePage;

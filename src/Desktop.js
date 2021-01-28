import React, { useEffect, useState } from 'react';
import deskless from './Desktop.module.less';
import bg from './assets/stock-photo-284139719.jpg';

import DesktopMain from './pages/DesktopMain/DesktopMain';

function Desktop(props) {

    return (
        <>
            <Header />
            <div className={deskless.desktop}>
                <DesktopMain />
                <img src={bg} alt="" className={deskless.bg_img}/>
            </div>
        </>
    );
}

function Header(props) {
    let [time,setTime] = useState(Date.now());

    const formatDate = (date) => {
        let y = date.getFullYear();
        let M = date.getMonth()+1;
        let d = date.getDate();
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
        return `${y}-${M>10?M:'0'+M}-${d>10?d:'0'+d} ${h>10?h:'0'+h}:${m>10?m:'0'+m}:${s>10?s:'0'+s}`
    }

    useEffect(() => {
        let interval = setInterval(() => {
            setTime(Date.now());
        },500);
        return () => {clearInterval(interval)}
    });

    return (
        <div className={deskless.header}>
            <span className={deskless.time}>{formatDate(new Date(time))}</span>
        </div>
    );
}

export default Desktop;
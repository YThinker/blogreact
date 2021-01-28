import React from 'react';
import mainless from './less/mainless.module.less';

function DesktopMain(props) {

    const fuzzyQuery = async (e) => {
        let res = await fetch(`/fuzzyQuery?p=3&wd=${e.target.value}&ie=UTF-8&cb=`);
        console.log(res);
    }

    return (
        <div className={mainless.main}>
            <input type="text" className={mainless.input} onChange={fuzzyQuery}/>
            <nav className={mainless.menu}></nav>
        </div>
    );
}

export default DesktopMain;
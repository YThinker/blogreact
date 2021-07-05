import React, { useEffect, useRef } from 'react';
import { Viewer, VisibleRangePlugin } from 'photo-sphere-viewer';
import { makeStyles } from '@material-ui/core';

import sphere from '@/assets/img/sphere.jpg';
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';

function Home(props) {
    const homeless = useStyles();

    const viewer = useRef();

    useEffect(() => {
        console.log(viewer);
        let panorama = new Viewer({
            container: viewer.current,
            panorama: sphere,
            navbar: false,
            mousewheel: false,
            mousewheelCtrlKey: true,
            panoData: {
                poseHeading: 0, // 0 to 360
                posePitch: 0, // -90 to 90
                poseRoll: 0, // -180 to 180
            }
        });

        return () => panorama.destroy();
    },[]);

    return (
        <div ref={viewer} className={homeless.viewer}></div>
    );
}

const useStyles = makeStyles(theme => ({
    viewer: {
        width: '100%',
        height: '100vh', 
    },
}));

export default Home;
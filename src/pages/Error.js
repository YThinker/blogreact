import React from 'react';

import { makeStyles } from '@material-ui/core';
import { Typography, Grid, Collapse } from '@material-ui/core';

import loginBg from '../assets/img/loginBg.png';

export default function Error(props) {
    const errorless = useStyle();

    return (
        <Grid container className={errorless.contain}
            justify="center"
            alignItems="center"    
        >
            <Grid item className={errorless.text}>
                <Typography className={errorless.h1} variant="h1" component="h1">404</Typography>
                <Typography className={errorless.h4} variant="h4" component="h4">该页面不存在</Typography>
            </Grid>
        </Grid>
    );
}

const useStyle = makeStyles(theme => ({
    contain: {
        background: '100% no-repeat',
        backgroundImage: `url(${loginBg})`,
        backgroundSize: 'cover',
        overflow: 'auto',
        height: '100vh',
        color: '#fff',
        textAlign: 'center',
    },
    text: {
        opacity: 0,
        animation: `$fadein 2000ms forwards`,
        animationDelay: '300ms',
    },
    "@keyframes fadein": {
        "0%": {
            opacity: 0,
            transform: "translateY(30%)",
        },
        "100%": {
            opacity: 1,
            transform: "translateY(0)",
        },
    },
    h1: {
        fontSize: '10rem',
        letterSpacing: '10px',
    },
}));
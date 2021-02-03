import React from 'react';
import { makeStyles } from '@material-ui/core';
import { CSSTransition } from 'react-transition-group';
import './slide.less';

export default function Slide(props) {
    const arrow = props.arrow;
    const timeout = props.timeout

    const handleArrow = () => {
        let enter;
        switch(arrow){
            case 'left':
                return 'translateX(100%)'
            case 'right':
                return 'translateX(-100%)'
            case 'up':
                return 'translateY(50%)'
            case 'down':
                return 'translateY(-50%)'
        }
    }

    const useStyles = makeStyles(theme => ({
        slideEnter: {
            transform: handleArrow(),
            opacity: 0,
        },
        slideEnterActive: {
            transform: 'translate(0)',
            transition: `all ${timeout}ms ease-in-out`,
        },
        slideExit: {
            transform: 'translate(0)',
            opacity: 1,
        },
        slideExitActive: {
            transform: handleArrow(),
            transition: `all ${timeout}ms ease-in-out`,
        },
    }));

    const slidestyle = useStyles();

    return (
        <CSSTransition {...props}
            classNames="slide"
        >
            {props.children}
        </CSSTransition>
    );
}
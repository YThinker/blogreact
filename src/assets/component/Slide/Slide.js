import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './Slide.less';

export default function Slide(props) {

    return (
        <CSSTransition {...props}
            classNames="Slide"
        >
            {props.children}
        </CSSTransition>
    );
}
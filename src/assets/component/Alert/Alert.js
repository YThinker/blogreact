import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { TransitionGroup, CSSTransition} from 'react-transition-group';
import { CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import './Alert.less';

class AlertComponent extends Component {
    state = {
        default: {
            message: '',
            type: 'info',
            position: { vertical: 'top', horizontal: 'center' },
            action: undefined,
            timeout: 3000,
            timer: null,
            icon: null,
            color: null,
            close: true,
            variant: "standard",
            key: null
        },
        snackMap: [],
    }

    close = (key) => {
        let removeAlert = null;
        const snackMap = this.state.snackMap.filter(item => {
            if(key === item.key) {
                removeAlert = item;
            }
            return key!==item.key;
        })
        clearTimeout(removeAlert.timer);
        this.setState({snackMap});
    }

    closeAll = () => {
        this.state.snackMap.forEach(item => {
            clearTimeout(item.timer);
        })
        this.setState({snackMap: []});
    }

    open = (options) => {
        const key = Date.now()+Math.random();
        let close = undefined;
        if(options.close){
            close = () => this.close(key)
        }
        const optionsCopy = {
            ...options,
            key,
            timer: setTimeout(() => {
                // this.close(options.key);
            }, options.timeout),
            close
        }
        const snackMap = this.state.snackMap.concat([optionsCopy]);
        this.setState({snackMap});
        return key;
    }

    success = (message) => {
        const key = this.open({
            ...this.state.default, 
            message, 
            type: 'success', 
        });
        return key;
    }
    error = (message) => {
        const key = this.open({
            ...this.state.default, 
            message, 
            type: 'error', 
        });
        return key;
    }
    warning = (message) => {
        const key = this.open({
            ...this.state.default, 
            message, 
            type: 'warning', 
        });
        return key;
    }
    info = (message) => {
        const key = this.open({
            ...this.state.default, 
            message, 
            type: 'info', 
        });
        return key;
    }
    loading = (message) => {
        const key = this.open({
            ...this.state.default, 
            message, 
            type: 'success', 
            close: false,
            icon: <CircularProgress style={{width: '22px', height: '22px'}} color="secondary"/>
        });
        return key;
    }

    render() {
        return (
            <TransitionGroup className="alert-group">
                {
                    this.state.snackMap.map( item => 
                        <CSSTransition key={item.key} classNames="item" timeout={500}>
                            <Alert 
                                action={item.action && item.action}
                                icon={item.icon && item.icon}
                                color={item.color && item.color}
                                variant={item.variant}
                                key={item.key}
                                className="alert"
                                onClose={item.close}
                                severity={item.type}
                            >
                                {item.message}
                            </Alert>
                        </CSSTransition>
                    )
                }
            </TransitionGroup>
        );
    }
}

const div = document.createElement('div');
div.id = 'Alert';
if(!document.getElementById('Alert')){
    document.body.insertBefore(div, document.getElementById('root'));
}
document.getElementById('Alert').style.position = 'fixed';
document.getElementById('Alert').style.width = '100%';
document.getElementById('Alert').style.zIndex = 100;

const _Alert = ReactDOM.render(React.createElement(AlertComponent), div);

export default _Alert;
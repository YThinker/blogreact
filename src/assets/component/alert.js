import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

class AlertComponent extends Component {
    state = {
        show: false,
        content: '',
        type: 'success',
        position: { vertical: 'top', horizontal: 'center' },
        timeNum: null,
    }

    remove = () => {
        this.setState({
            show: false,
        });
        clearTimeout(this.state.timeNum);
        setTimeout(()=>{
            document.getElementById('Alert').remove();
        },800);
    }

    open = (options) => {
        this.setState({
            ...options,
            show:true
        });
    }

    close = () => {
        this.remove();
    }

    componentDidMount(){
        let timeNum = setTimeout(()=>{
            this.remove();
        },4000);
        this.setState({timeNum:timeNum});
    };

    render() {
        
        return (
            <Snackbar onClose={this.close} open={this.state.show} anchorOrigin={this.state.position}>
                <Alert onClose={this.close} severity={this.state.type}>{this.state.content}</Alert>
            </Snackbar>
        );
    }
}

const alert = ()=>{
    let div = document.createElement('div');
    div.id = 'Alert';
    document.body.insertBefore(div,document.getElementById('root'));
    let Alert = ReactDOM.render(React.createElement(AlertComponent),div);
    return Alert;
}

export default alert;
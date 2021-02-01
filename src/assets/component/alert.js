import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './alert.less';

class AlertComponent extends Component {
    state = {
        show: false,
        context: '',
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
        },3000);
        this.setState({timeNum:timeNum});
    };

    render() {
        
        return (
            <div style={{
                position: 'fixed',
                zIndex: '100',
                backgroundColor: '#fdf6ec',
                color: '#e6a23c',
                width: '20%',
                minHeight: '36px',
                borderRadius: '4px',
                left: '40%',
                padding: '0 16px',
                lineHeight: '36px',
                fontSize: '15px',
                animation: 'alertShow .3s',
                top: this.state.show?'50px':'0',
                transform: this.state.show?'translateY(0)':'translateY(-100%)',
                opacity:this.state.show?'1':'0'
            }}>
                <span>{this.state.context}</span>
                <i onClick={()=>this.close()}>X</i>
            </div>
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
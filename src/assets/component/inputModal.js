import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import './inputModal.less';

class Modal extends Component{
    state = {
        show: false,
        value: '',
        confirm: ()=>{},
    };

    confirm = ()=>{
        this.state.confirm(this.state.value);
        this.remove();
    }
    open = (options)=>{
        console.log('open Input Modal');
        this.setState({...options,show:true});
    }
    close = ()=>{this.remove()}
    remove = () => {
        this.setState({show:false,value:''});
        setTimeout(()=>{
            document.getElementById('inputModal').remove();
        },800);
    }

    render(){
        let style = {
            position: 'fixed',
            zIndex: '100',
            width: '100vw',
            height: '100vh',
            backgroundColor :'rgba(230,230,230,0.2)',
            animation: 'inputhidden .3s forwards',
            animationName: this.state.show?'inputShow':'inputHidden',
            visibility: this.state.show?'visible':'hidden',
            backdropFilter:'blur(10px)'
        };
        return (
            <div style={style} className="inputModal">
                <div style={{...style,zIndex:'-1',}} onClick={()=>this.close()}></div>
                <textarea className="textArea" type="text" onChange={(e)=>this.setState({value:e.target.value})} value={this.state.value}></textarea>
                <button onClick={this.confirm}>确定</button>
                <button onClick={this.close}>取消</button>
            </div>
        )
    }
}

// const Modal = () => {
//     const [value,setValue] = useState('');
//     const close = () => {

//     }
//     const add = () => {

//     }
//     let style = {
//         width: '100%',
//         height: '100%',
//         backgroundColor :'rgba(200,200,200,0.5)',
//     };

//     return (
        
//     )
// }

const inputModal = () => {
    let div = document.createElement('div');
    div.id = 'inputModal';
    document.body.insertBefore(div,document.getElementById('root'));
    let inputModal = ReactDOM.render(React.createElement(Modal),div);
    console.log(inputModal);
    return inputModal;
}

export default inputModal;
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import todolistless from './todolist.module.less';
import inputModal from '../../assets/component/inputModal';
import {Alert} from '@/assets/component';
import deleteIcon from '../../assets/todolist/delete.svg';
// import qs from 'query-string';

function TodoList(props) {
    const [todoList,setTodoList] = useState(['第一周']);

    function handleDelete(index){
        let todoList_copy = [...todoList];
        todoList_copy.splice(index,1);
        setTodoList(todoList_copy);
    };
    function handleInput(item) {
        if(!!item){
            setTodoList(todoList.concat([item]));
            console.log(todoList);
        }
        else {
            Alert.warning('请输入计划');
        }
    }

    return (
        <section className={todolistless.todolist}>
            <TodoInput getItem={handleInput}></TodoInput>
            {
                todoList.map( (item, index) => {
                    // console.log(item,index);
                    return <TodoItem
                             key={item}
                             id={index}
                             todoItem={item} 
                             deleteItem={handleDelete}
                            />
                })
            }
        </section>
    );
}

function TodoItem(props) {
    console.log('TodoItem');

    return (
        <div className={todolistless.todoitem}>
            <p>{props.todoItem}</p>
            <img className={todolistless.icon} src={deleteIcon} alt="删除" onClick={() => props.deleteItem(props.id)}/>
        </div>
    );
}

function TodoInput(props) {
    // const obj = useContext(AlertShow);
    // console.log(obj);

    const [todoInput,setTodoInput] = useState('');
    console.log(!!todoInput);
    const addInput = () => {
        props.getItem(todoInput);
        setTodoInput('');
        // else {
        //     let conf = {show:true, content:'请输入内容'};
        //     setAlertConfig(conf);
        //     setTimeout(function () {
        //         setAlertConfig({show:false});
        //     },2000);
        // }
    }

    const openModal = () => {
        inputModal().open({
            confirm: (e) => {
                props.getItem(e);
            }
        })
    }

    return (
        <div className={todolistless.todoinput}>
            <input type="text" placeholder="请输入计划" value={todoInput} onChange={(e) => setTodoInput(e.target.value)} onFocus={openModal}/>
            {/* <button onClick={addInput}>添加</button> */}
            <button onClick={openModal}>添加</button>
        </div>
    );
}

export default TodoList;
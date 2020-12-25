/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './style/todolist.css';
// import qs from 'query-string';

function TodoList(props) {
    const [todoList,setTodoList] = useState(['第一周']);

    function handleDelete(index){
        let todoList_copy = [...todoList];
        todoList_copy.splice(index,1);
        setTodoList(todoList_copy);
    };
    function handleInput(item) {
        let todoList_copy = [...todoList]
        todoList_copy.push(item);
        console.log(todoList_copy);
        setTodoList(todoList_copy);
        console.log(todoList);
    }

    const [queryContent] = useState(props.location.query.content);
    // console.log(props.location);
    // const [queryContent] = useState(qs.parse(props.location.search).content);
    useEffect(() => {
        handleInput(queryContent);
    },[queryContent]);

    return (
        <section className="todolist">
            <TodoInput getItem={handleInput}></TodoInput>
            {
                todoList.map( (item, index) => {
                    console.log(item,index);
                    return <TodoItem
                             key={index}
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

    return (
        <div>
            <p>{props.todoItem}</p>
            <button onClick={() => props.deleteItem(props.id)}>删除</button>
        </div>
    );
}

function TodoInput(props) {
    const [todoInput,setTodoInput] = useState('');

    return (
        <div className="todoinput">
            <input type="text" placeholder="请输入计划" value={todoInput} onChange={(e) => setTodoInput(e.target.value)}/>
            <button onClick={() => {props.getItem(todoInput);setTodoInput('');}}>添加</button>
        </div>
    );
}

export default TodoList;
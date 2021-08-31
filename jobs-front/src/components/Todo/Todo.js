import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../css/Todo.css';
import TodoItems from './TodoItems';
const Todo = (props) => {
  const id = props.match.params.id;
  let readyItems = [];
  let ingItems = [];
  let doneItems = [];

  const [todo, setTodo] = useState([]);

  const todos = todo.map((todo) => (
    <TodoItems key={todo.id} todo={todo} task_id={id} />
  ));

  for (let i = 0; i < todos.length; i++) {
    console.log(todos[i].props.todo.status);
    if (todos[i].props.todo.status === 'todo') {
      readyItems.push(todos[i]);
    } else if (todos[i].props.todo.status === 'ing') {
      ingItems.push(todos[i]);
    } else {
      doneItems.push(todos[i]);
    }
  }

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/todo/' + id)
      .then((res) => {
        console.log(res.data);
        setTodo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className=" circle">준비</div>
            {readyItems}
          </div>
          <div className="col-md-4">
            <div className="circle">할 일</div>
            {ingItems}
          </div>
          <div className="col-md-4">
            <div className="circle">끝</div>
            {doneItems}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;

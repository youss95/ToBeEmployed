import axios from 'axios';
import React, { useState } from 'react';
import '../../css/AddTodoForm.css';
const AddTodoForm = (props) => {
  const id = props.match.params.id;
  const [todo, setTodo] = useState({
    title: '',
    content: '',
    priority: '',
    status: '',
    startDate: '',
    endDate: '',
  });
  const [todoCheck, setTodoCheck] = useState(false);
  const [contentCheck, setContentCheck] = useState(false);
  const [priorityCheck, setPriorityCheck] = useState(false);
  const [statusCheck, setStatusCheck] = useState(false);

  const changeValue = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
    console.log(todo);
  };

  const submitTodo = (e) => {
    e.preventDefault();
    if (!todo.title) {
      setTodoCheck(true);
    } else if (todo.title !== null) {
      setTodoCheck(false);
    }
    if (!todo.content) {
      setContentCheck(true);
    } else if (todo.content !== null) {
      setContentCheck(false);
    }
    if (!todo.priority) {
      setPriorityCheck(true);
    } else if (todo.priority !== null) {
      setPriorityCheck(false);
    }
    if (!todo.status) {
      setStatusCheck(true);
    } else if (todo.status !== null) {
      setStatusCheck(false);
    }
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    axios
      .post(`http://localhost:8080/api/todo/${id}`, todo, { headers })
      .then((res) => {
        console.log(res.data);
        setTodo(res.data);
        props.history.push('/todo');
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
      });
  };

  return (
    <div className="addTodo">
      <h3>일정을 추가해 주세요!</h3>
      <br />
      <form onSubmit={submitTodo}>
        <dt>What to do</dt>
        <input
          type="text"
          className="inpform"
          placeholder="어떤 일을 하시겠습니까?"
          name="title"
          onChange={changeValue}
        />
        {todoCheck && <div>빈칸은 안되요</div>}
        <dt>내용</dt>
        <textarea
          className="txtareaform"
          name="content"
          id=""
          cols="30"
          rows="4"
          placeholder="내용을 입력해 주세요!"
          onChange={changeValue}
        />
        {contentCheck && <div>내용을 입력해 주세요</div>}
        <dt>우선순위</dt>
        <dd>
          <div className="inp_slct">
            <select className="priority" name="priority" onChange={changeValue}>
              <option value="">선택</option>
              <option value={1}>1(높음)</option>
              <option value={2}>2(중간)</option>
              <option value={3}>3(낮음)</option>
            </select>
          </div>
        </dd>
        {priorityCheck && <div>우선순위를 선택해 주세요</div>}
        <dt>진행상황</dt>
        <dd>
          <div className="inp_slct">
            <select className="status" name="status" onChange={changeValue}>
              <option value="">선택</option>
              <option value="todo">준비</option>
              <option value="ing">진행중</option>
              <option value="done">끝</option>
            </select>
          </div>
        </dd>
        {statusCheck && <div>진행상황을 선택해 주세요</div>}
        <dt>start</dt>
        <div className="startDate">
          <input
            type="date"
            className="inpform"
            name="startDate"
            onChange={changeValue}
          />
        </div>
        <dt>end</dt>
        <div className="startDate">
          <input
            type="date"
            className="inpform"
            name="endDate"
            onChange={changeValue}
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary btn-lg subBtn"
          value="추가"
        />
      </form>
      <br />
    </div>
  );
};

export default AddTodoForm;

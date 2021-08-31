import axios from 'axios';
import React, { useState } from 'react';
import '../../css/AddTodoForm.css';
const AddTodoForm = (props) => {
  const id = props.match.params.id;
  const [todo, setTodo] = useState({
    content: '',
    priority: '',
    status: '',
    startDate: '',
    endDate: '',
  });

  const changeValue = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const submitTodo = (e) => {
    e.preventDefault();
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    axios
      .post(`http://localhost:8080/api/todo/${id}`, todo, { headers })
      .then((res) => {
        console.log(res.data);
        setTodo(res.data);
        props.history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="addTodo">
      <h3>일정을 추가해 주세요!</h3>
      <br />
      <form onSubmit={submitTodo}>
        <dt>할 일</dt>

        <textarea
          class="txtareaform"
          name="content"
          id=""
          cols="30"
          rows="4"
          placeholder="내용을 입력해 주세요!"
          onChange={changeValue}
        />

        <dt>우선순위</dt>
        <dd>
          <div class="inp_slct">
            <select className="priority" onChange={changeValue}>
              <option value={100}>선택</option>
              <option value={1}>1(높음)</option>
              <option value={2}>2(중간)</option>
              <option value={3}>3(낮음)</option>
            </select>
          </div>
        </dd>

        <dt>진행상황</dt>
        <dd>
          <div class="inp_slct">
            <select className="status" onChange={changeValue}>
              <option value="">선택</option>
              <option value="todo">준비</option>
              <option value="ing">진행중</option>
              <option value="done">끝</option>
            </select>
          </div>
        </dd>

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

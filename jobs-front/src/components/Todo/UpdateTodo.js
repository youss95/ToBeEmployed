import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../css/UpdateTodoForm.css';
const UpdateTodo = (props) => {
  const task_id = props.match.params.task_id;
  const id = props.match.params.id;

  const [updateTodo, setUpdateTodo] = useState({
    title: '',
    content: '',
    priority: '',
    status: '',
    startDate: '',
    endDate: '',
  });

  const changeValue = (e) => {
    setUpdateTodo({
      ...updateTodo,
      [e.target.name]: e.target.value,
    });
  };

  const submitUpdate = (e) => {
    e.preventDefault();
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    axios
      .put(
        `http://localhost:8080/api/todo/update/${task_id}/${id}`,
        updateTodo,
        {
          headers,
        },
      )
      .then((res) => {
        console.log(res.data);
        setUpdateTodo(res.data);
        props.history.push('/todo/detail/' + task_id);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/todo/${task_id}/${id}`)
      .then((res) => {
        console.log(res.data);
        setUpdateTodo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="updateTodoForm">
      <h3>수정</h3>
      <br />
      <form onSubmit={submitUpdate}>
        <dt>제목</dt>
        <input
          type="text"
          className="inpform"
          placeholder="Placeholder"
          name="title"
          onChange={changeValue}
          value={updateTodo.title}
        />
        <dt>내용</dt>

        <textarea
          class="txtareaform"
          name="content"
          id=""
          cols="30"
          rows="4"
          placeholder="내용을 입력해 주세요!"
          onChange={changeValue}
          value={updateTodo.content}
        />
        <dt>우선순위</dt>
        <dd>
          <div class="inp_slct">
            <select
              className="priority"
              name="priority"
              onChange={changeValue}
              value={updateTodo.priority}
            >
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
            <select
              className="status"
              name="status"
              onChange={changeValue}
              value={updateTodo.status}
            >
              <option value="">선택</option>
              <option value="todo">준비</option>
              <option value="ing">진행중</option>
              <option value="done">끝</option>
            </select>
          </div>
        </dd>
        <dt>시작</dt>
        <div className="startDate">
          <input
            type="date"
            className="inpform"
            name="startDate"
            onChange={changeValue}
            value={updateTodo.startDate}
          />
        </div>
        <dt>끝</dt>
        <div className="startDate">
          <input
            type="date"
            className="inpform"
            name="endDate"
            onChange={changeValue}
            value={updateTodo.endDate}
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary btn-lg subBtn"
          value="수정"
        />
      </form>
      <br />
    </div>
  );
};

export default UpdateTodo;

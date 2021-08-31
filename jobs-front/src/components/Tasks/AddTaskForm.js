import axios from 'axios';
import React, { useState } from 'react';
import '../../css/AddTaskForm.css';
const AddTaskForm = (props) => {
  const category = props.match.params.category;

  const [task, setTask] = useState({
    projectName: '',
    content: '',
    category: category,
    startDate: '',
    endDate: '',
  });

  const changeValue = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const submitTask = (e) => {
    e.preventDefault();
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    axios
      .post('http://localhost:8080/api/task/', task, { headers })
      .then((res) => {
        console.log(res.data);
        setTask(res.data);
        props.history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="addForm">
        <h3>일정을 추가해 주세요!</h3>
        <br />
        <form onSubmit={submitTask}>
          <dt>프로젝트 이름</dt>
          <input
            type="text"
            className="inpform"
            placeholder="Placeholder"
            name="projectName"
            onChange={changeValue}
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
          />

          <dt>카테고리</dt>
          <input
            type="text"
            className="inpform"
            placeholder="Placeholder"
            value={category}
            name="category"
            disabled
          />
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
            value="등록"
          />
        </form>
        <br />
      </div>
    </div>
  );
};

export default AddTaskForm;

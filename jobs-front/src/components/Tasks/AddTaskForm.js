import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../css/AddTaskForm.css';
import jwt_decode from 'jwt-decode';
const AddTaskForm = (props) => {
  const category = props.match.params.category;

  const [task, setTask] = useState({
    projectName: '',
    content: '',
    category: category,
    startDate: '',
    endDate: '',
  });

  const [nullNameCheck, setNullNameCheck] = useState(false);
  const [nullContCheck, setNullContCheck] = useState(false);
  const changeValue = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const [userId, setUserId] = useState();

  const isLogin = useSelector((store) => store.isLogin);
  console.log(isLogin);
  useEffect(() => {
    if (!isLogin) {
      alert('로그인을 해주세요!');
      props.history.push('/todo');
    }
  }, []);

  const submitTask = (e) => {
    e.preventDefault();
    if (!task.projectName) {
      //alert('프로젝트 이름이 필요합니다.');
      setNullNameCheck(true);
    } else if (task.projectName !== null) {
      setNullNameCheck(false);
    }
    if (!task.content) {
      setNullContCheck(true);
    } else if (task.content !== null) {
      setNullContCheck(false);
    }
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
    };
    axios
      .post('http://localhost:8080/api/task/', task, { headers })
      .then((res) => {
        console.log(res.data);
        setTask(res.data);
        props.history.push('/');
      })
      .catch((err) => {
        let errorName = err.response.data;
        console.log(errorName.projectName);
        console.log(err.response.data.content);

        if (errorName.projectName === undefined) {
          alert(errorName.content);
        } else {
          alert(errorName.projectName);
        }
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
          {nullNameCheck && (
            <div className="nullCheck">이름을 입력해 주세요</div>
          )}
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
          {nullContCheck && (
            <div className="nullCheck">내용을 입력해 주세요</div>
          )}
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

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../css/updateTask.css';
const UpdateTaskForm = (props) => {
  const [task, setTask] = useState({
    projectName: '',
    content: '',
    category: '',
    startDate: '',
    endDate: '',
  });
  const id = props.match.params.id;

  const [nullNameCheck, setNullNameCheck] = useState(false);
  const [nullContCheck, setNullContCheck] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/task/chosen/' + id)
      .then((res) => {
        console.log(res.data);
        setTask(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changeValue = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

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
        if (errorName.projectName === undefined) {
          alert(errorName.content);
        } else {
          alert(errorName.projectName);
        }
      });
  };

  return (
    <div className="updateTask">
      <h3>수정</h3>
      <br />
      <form onSubmit={submitTask}>
        <dt>프로젝트 이름</dt>
        <input
          type="text"
          className="inpform"
          placeholder="Placeholder"
          name="projectName"
          onChange={changeValue}
          value={task.projectName}
        />
        {nullNameCheck && <div className="nullCheck">이름을 입력해 주세요</div>}
        <dt>내용</dt>

        <textarea
          class="txtareaform"
          name="content"
          id=""
          cols="30"
          rows="4"
          placeholder="내용을 입력해 주세요!"
          value={task.content}
          onChange={changeValue}
        />
        {nullContCheck && <div className="nullCheck">내용을 입력해 주세요</div>}
        <dt>카테고리</dt>
        <input
          type="text"
          className="inpform"
          placeholder="Placeholder"
          value={task.category}
          name="category"
          disabled
        />
        <input
          type="submit"
          className="btn btn-primary btn-lg subBtn"
          value="등록"
        />
      </form>
      <br />
    </div>
  );
};

export default UpdateTaskForm;

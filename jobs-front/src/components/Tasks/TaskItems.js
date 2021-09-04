import axios from 'axios';
import React from 'react';
import {
  BsFillBackspaceFill,
  BsArrow90DegLeft,
  BsPencil,
  BsGearFill,
} from 'react-icons/bs';
import { Link, withRouter } from 'react-router-dom';
import '../../css/taskItem.css';
const TaskItems = (props) => {
  const { projectName, content, startDate, endDate, id } = props.task;

  const deleteTask = () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      axios
        .delete(`http://localhost:8080/api/task/${id}`)
        .then((res) => {
          console.log(res.data);
          if (res.data === 'deleted') {
            props.history.push('/');
          } else {
            alert('삭제 실패');
          }
        })
        .catch((err) => {
          alert('에러');
          console.log(err);
        });
    }
  };

  return (
    <div className="taskItem">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{projectName}</h3>
          <p className="card-text">{content}</p>
          <div>끝: {endDate}</div>
          <div className="doBtn">
            <Link to={`/list/detail/${id}`} className="btn">
              일정 <BsArrow90DegLeft />
            </Link>
            <Link to={`/addTodo/${id}`} className="btn">
              생성 <BsPencil />
            </Link>
            <Link to={`/updateTask/${id}`} className="btn">
              수정 <BsGearFill />
            </Link>
            <span to="#" className="btn" onClick={deleteTask}>
              삭제 <BsFillBackspaceFill />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(TaskItems);

import axios from 'axios';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const TodoItems = (props) => {
  const { id, content, status, priority, startDate, endDate } = props.todo;

  const deleteTodo = () => {
    if (window.confirm('정말로 삭제 하시겠습니까?')) {
      axios
        .delete(`http://localhost:8080/api/todo/${props.task_id}/${id}`)
        .then((res) => {
          if (res.status === 200) {
            window.location.replace(`/todo/detail/${props.task_id}`);
          } else {
            alert('삭제에 실패');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      {' '}
      <div className="card mb-1 bg-light">
        <div className={`card-header text-primary `}>우선순위 : {priority}</div>
        <div className="card-body bg-light">
          <h5 className="card-title">{status}</h5>
          <p className="card-text text-truncate ">{content}</p>
          <Link to="" className="btn btn-primary">
            View / Update
          </Link>

          <button className="btn btn-danger ml-4" onClick={deleteTodo}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(TodoItems);

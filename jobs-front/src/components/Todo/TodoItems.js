import axios from 'axios';
import React from 'react';
import '../../css/TodoItem.css';
import { Link, withRouter } from 'react-router-dom';
import { BsFillBackspaceFill, BsGearFill } from 'react-icons/bs';

const TodoItems = (props) => {
  const { id, content, status, priority, startDate, endDate, title } =
    props.todo;
  let priorityColor;
  if (priority === 1) {
    priorityColor = 'text-red';
  } else if (priority === 2) {
    priorityColor = 'text-blue';
  } else {
    priorityColor = 'text-black';
  }
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
      <div className="todoItem todoHeader ">
        <div className={`${priorityColor}`}>우선순위 : {priority}</div>
        <div className="card-body ">
          <div className="todoTitle">{title}</div>
          <p className="card-text text-truncate ">{content}</p>
          <div className="due">
            시작: {startDate} 마침: {endDate}
          </div>
          <div className="updateAndDel">
            <Link
              to={`/todo/update/${props.task_id}/${id}`}
              className="updateBtn"
            >
              수정 <BsGearFill />
            </Link>

            <button to="" className="deleteBtn" onClick={deleteTodo}>
              삭제 <BsFillBackspaceFill />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(TodoItems);

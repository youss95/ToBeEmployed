import React from 'react';
import { Link } from 'react-router-dom';

const TodoItems = (props) => {
  const { id, content, status, priority, startDate, endDate } = props.todo;

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

          <button className="btn btn-danger ml-4">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TodoItems;

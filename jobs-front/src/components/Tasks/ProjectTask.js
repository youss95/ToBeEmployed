import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../css/task.css';
import TaskItems from './TaskItems';
const ProjectTask = (props) => {
  const category = props.match.params.category;
  const [task, setTask] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/task/' + category)
      .then((res) => {
        console.log(res.data);
        setTask(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="prjTask">
      {task.map((task) => (
        <TaskItems key={task.id} task={task} />
      ))}
    </div>
  );
};

export default ProjectTask;

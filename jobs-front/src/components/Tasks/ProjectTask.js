import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../css/task.css';
import TaskItems from './TaskItems';
import jwt_decode from 'jwt-decode';
import { useSelector } from 'react-redux';
const ProjectTask = (props) => {
  const category = props.match.params.category;
  const userId = props.match.params.userId;
  const [task, setTask] = useState([]);
  const isLogin = useSelector((store) => store.isLogin);
  useEffect(() => {
    if (!isLogin) {
      alert('로그인을 해주세요!');
      props.history.push('/user/login');
    }
  }, []);

  console.log('userId', userId);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/task/${category}/${userId}`)
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
        <TaskItems key={task.id} task={task} userId={userId} />
      ))}
    </div>
  );
};

export default ProjectTask;

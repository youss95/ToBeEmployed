import axios from 'axios';
import React, { useEffect } from 'react';
import '../../css/task.css';
const ProjectTask = (props) => {
  const category = props.match.params.category;

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/task/' + category)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div className="prjTask"></div>;
};

export default ProjectTask;

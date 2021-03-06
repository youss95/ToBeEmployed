import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../css/UpdateTodoForm.css';
const UpdateTodo = (props) => {
  const task_id = props.match.params.task_id;
  const id = props.match.params.id;

  const [updateTodo, setUpdateTodo] = useState({
    title: '',
    content: '',
    priority: '',
    status: '',
    startDate: '',
    endDate: '',
  });

  const [todoCheck, setTodoCheck] = useState(false);
  const [contentCheck, setContentCheck] = useState(false);
  const [priorityCheck, setPriorityCheck] = useState(false);
  const [statusCheck, setStatusCheck] = useState(false);

  const changeValue = (e) => {
    setUpdateTodo({
      ...updateTodo,
      [e.target.name]: e.target.value,
    });
    console.log(updateTodo.priority);
  };

  const submitUpdate = (e) => {
    e.preventDefault();
    if (!updateTodo.title) {
      setTodoCheck(true);
    } else if (updateTodo.title !== null) {
      setTodoCheck(false);
    }
    if (!updateTodo.content) {
      setContentCheck(true);
    } else if (updateTodo.content !== null) {
      setContentCheck(false);
    }
    if (!updateTodo.priority) {
      setPriorityCheck(true);
    } else if (updateTodo.priority !== null) {
      setPriorityCheck(false);
    }
    if (!updateTodo.status) {
      setStatusCheck(true);
    } else if (updateTodo.status !== null) {
      setStatusCheck(false);
    }
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    axios
      .put(
        `http://localhost:8080/api/todo/update/${task_id}/${id}`,
        updateTodo,
        {
          headers,
        },
      )
      .then((res) => {
        console.log(res.data);
        setUpdateTodo(res.data);
        props.history.push('/list/detail/' + task_id);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/todo/${task_id}/${id}`)
      .then((res) => {
        console.log(res.data);
        setUpdateTodo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="updateTodoForm">
      <h3>??????</h3>
      <br />
      <form onSubmit={submitUpdate}>
        <dt>??????</dt>
        <input
          type="text"
          className="inpform"
          placeholder="Placeholder"
          name="title"
          onChange={changeValue}
          value={updateTodo.title}
        />
        {todoCheck && <div>????????? ?????????</div>}
        <dt>??????</dt>

        <textarea
          class="txtareaform"
          name="content"
          id=""
          cols="30"
          rows="4"
          placeholder="????????? ????????? ?????????!"
          onChange={changeValue}
          value={updateTodo.content}
        />
        {contentCheck && <div>????????? ????????? ?????????</div>}
        <dt>????????????</dt>
        <dd>
          <div class="inp_slct">
            <select
              className="priority"
              name="priority"
              onChange={changeValue}
              value={updateTodo.priority}
            >
              <option value="">??????</option>
              <option value={1}>1(??????)</option>
              <option value={2}>2(??????)</option>
              <option value={3}>3(??????)</option>
            </select>
          </div>
        </dd>
        {priorityCheck && <div>??????????????? ????????? ?????????</div>}
        <dt>????????????</dt>
        <dd>
          <div class="inp_slct">
            <select
              className="status"
              name="status"
              onChange={changeValue}
              value={updateTodo.status}
            >
              <option value="">??????</option>
              <option value="todo">??????</option>
              <option value="ing">?????????</option>
              <option value="done">???</option>
            </select>
          </div>
        </dd>
        {statusCheck && <div>??????????????? ????????? ?????????</div>}
        <dt>??????</dt>
        <div className="startDate">
          <input
            type="date"
            className="inpform"
            name="startDate"
            onChange={changeValue}
            value={updateTodo.startDate}
          />
        </div>
        <dt>???</dt>
        <div className="startDate">
          <input
            type="date"
            className="inpform"
            name="endDate"
            onChange={changeValue}
            value={updateTodo.endDate}
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary btn-lg subBtn"
          value="??????"
        />
      </form>
      <br />
    </div>
  );
};

export default UpdateTodo;

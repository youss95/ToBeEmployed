import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../../css/LoginForm.css';
const JoinForm = (props) => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const submitJoin = (e) => {
    e.preventDefault();
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    axios
      .post('http://localhost:8080/join', user, { headers })
      .then((res) => {
        console.log(res);
        setUser(res.data);
        props.history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeValue = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form className="loginForm">
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          name="username"
          onChange={changeValue}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password"
          onChange={changeValue}
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={submitJoin}>
        회원가입
      </Button>
    </Form>
  );
};

export default JoinForm;

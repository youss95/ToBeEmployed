import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../../css/LoginForm.css';
const JoinForm = (props) => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    confirmedPassword: '',
  });

  const [nullUsernameCheck, setUsernameCheck] = useState(false);
  const [nullPwCheck, setPwCheck] = useState(false);
  const submitJoin = (e) => {
    e.preventDefault();
    if (
      user.password !== user.confirmedPassword &&
      user.confirmedPassword !== null
    ) {
      alert('비밀번호 확인이 틀립니다.');
      return;
    }
    if (!user.username) {
      setUsernameCheck(true);
    } else if (user.username !== null) {
      setUsernameCheck(false);
    }
    if (!user.password) {
      setPwCheck(true);
    } else if (user.password !== null) {
      setPwCheck(false);
    }
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
        let errMsg = err.response.data;
        if (user.username.length > 8 || user.username.length < 4) {
          alert(errMsg.username);
        }
      });
  };

  const changeValue = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  console.log(user.password);
  return (
    <Form className="loginForm">
      <Form.Group>
        <Form.Label>아이디</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          name="username"
          onChange={changeValue}
        />
        {nullUsernameCheck && <div>id를 입력해 주세요</div>}
      </Form.Group>

      <Form.Group>
        <Form.Label>비밀번호</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password"
          onChange={changeValue}
        />
        {nullPwCheck && <div>비밀번호를 입력해 주세요</div>}
      </Form.Group>

      <Form.Group>
        <Form.Label>비밀번호 확인</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="confirmedPassword"
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

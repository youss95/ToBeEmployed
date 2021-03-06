import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { login } from '../../store';
import '../../css/LoginForm.css';
const LoginForm = (props) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const changeValue = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        // 로컬 스토리지 저장
        for (let header of res.headers.entries()) {
          if (header[0] === 'authorization') {
            localStorage.setItem('Authorization', header[1]);
          }
        }
        return res.text();
      })
      .then((res) => {
        if (res === 'ok') {
          // 로그인 상태 값 리덕스 저장
          dispatch(login());
          window.location.replace('/');
        } else {
          alert('아이디 혹은 비번을 다시 입력하세요!');
        }
      });
  };

  return (
    <Form className="loginForm">
      <Form.Group>
        <Form.Label>아이디</Form.Label>
        <Form.Control
          type="text"
          placeholder="아이디 입력"
          name="username"
          onChange={changeValue}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>비밀번호</Form.Label>
        <Form.Control
          type="password"
          placeholder="비밀번호 입력"
          name="password"
          onChange={changeValue}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={submitLogin}>
        로그인
      </Button>
    </Form>
  );
};

export default LoginForm;

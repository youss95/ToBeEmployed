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

  const userExist = () => {
    axios.post(`http://localhost:8080/exist/${user.username}`).then((res) => {
      console.log('ㄱ', res.data);
      if (res.data == true) {
        alert('중복된 아이디!!');
      } else if (res.data == false) {
        alert('사용가능한 아이디');
      }
    });
  };

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
    if (user.password.length > 8 || user.password.length < 4) {
      alert('비밀번호는 4~8자 사이');
      return;
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
        <Form.Label>아이디</Form.Label>{' '}
        <Button onClick={userExist}>중복확인</Button>
        <Form.Control
          type="text"
          placeholder="아이디는 4~8자여야 합니다"
          name="username"
          onChange={changeValue}
        />
        {nullUsernameCheck && <div>id를 입력해 주세요</div>}
      </Form.Group>

      <Form.Group>
        <Form.Label>비밀번호</Form.Label>
        <Form.Control
          type="password"
          placeholder="비밀번호는 4~8자여야 합니다."
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

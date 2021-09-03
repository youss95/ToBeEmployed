import React from 'react';
import '../../css/LoginForm.css';



const LoginForm = () => {
  return (
    <div className="loginForm">
      <form>
        <dt>아이디</dt>
        <input
          type="text"
          className="inpform"
          placeholder="아이디"
          name="username"
        />

        <dt>비밀번호</dt>
        <input
          type="password"
          className="inpform"
          placeholder="비밀번호"
          name="password"
        />

        <input
          type="submit"
          className="btn btn-primary btn-lg subBtn"
          value="로그인"
        />
      </form>
    </div>
  );
};

export default LoginForm;

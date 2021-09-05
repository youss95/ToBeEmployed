import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/style.css';
import { logout } from '../store';
import jwt_decode from 'jwt-decode';
const Header = () => {
  const isLogin = useSelector((store) => store.isLogin);
  const dispatch = useDispatch();
  console.log(isLogin);
  const [userId, setUsername] = useState();

  useEffect(() => {
    let jwtTokenTemp = localStorage.getItem('Authorization');
    console.log('s1', jwtTokenTemp);

    if (jwtTokenTemp) {
      let jwtToken = jwtTokenTemp.replace('Bearer ', '');
      setUsername(jwt_decode(jwtToken).id);
    }
  }, []);

  const logoutProc = () => {
    localStorage.removeItem('Authorization');

    dispatch(logout());
    window.location.href = '/';
  };
  return (
    <div>
      <header className="header">
        <h1 className="logo">
          <Link to={'/'}>ToBe Employed</Link>
        </h1>
        <div className="gnb">
          <ul className="clear">
            <li className="has">
              <Link to={'/todo'}>할 일</Link>
            </li>
            <li className="has">
              <Link to={`/map/${userId}`}>Map</Link>
            </li>
          </ul>
        </div>

        <div className="utils">
          <ul className="clear">
            {isLogin ? (
              <>
                <li>
                  <Link onClick={logoutProc}>로그아웃</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={`/user/login`}>로그인</Link>
                </li>
                <li>
                  <Link to={`/user/register`}>회원가입</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="s_menu_bg"></div>
      </header>
    </div>
  );
};

export default Header;

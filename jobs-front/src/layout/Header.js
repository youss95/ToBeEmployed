import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/style.css';
import { logout } from '../store';
const Header = () => {
  const isLogin = useSelector((store) => store.isLogin);
  const dispatch = useDispatch();
  console.log(isLogin);
  const logoutProc = () => {
    localStorage.removeItem('Authorization');
    dispatch(logout());
  };
  return (
    <div>
      <header className="header">
        <h1 className="logo">
          <Link to="#">LOGO IMG</Link>
        </h1>
        <div className="gnb">
          <ul className="clear">
            <li className="has">
              <Link to="/todo">일정</Link>
            </li>
            <li className="has">
              <Link to="#">Map</Link>
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

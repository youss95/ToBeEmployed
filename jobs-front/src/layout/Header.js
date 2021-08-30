import React from 'react';
import { Link } from 'react-router-dom';
import '../css/style.css';
const Header = () => {
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
            <li>
              <Link to="#">로그인</Link>
            </li>
            <li>
              <Link to="#">회원가입</Link>
            </li>
          </ul>
        </div>
        <div className="s_menu_bg"></div>
      </header>
    </div>
  );
};

export default Header;

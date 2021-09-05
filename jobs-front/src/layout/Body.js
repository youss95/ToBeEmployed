import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/body.css';
const Body = () => {
  return (
    <div className="mainBody">
      <h2>취업성공을 위한 할 일 관리 프로젝트</h2>
      <hr />
      <div className="youtuVideo">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/OZu_BRDqJEQ"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div className="githubLink">
        <a href="http://www.github.com/youss95/ToBeEmployed">Github</a>
      </div>
    </div>
  );
};

export default Body;

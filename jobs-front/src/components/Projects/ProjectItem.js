import React from 'react';
import { Card } from 'react-bootstrap';
import { BsFillLayersFill, BsGraphUp, BsPen, BsPencil } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import '../../css/projectItem.css';
const ProjectItem = () => {
  return (
    <div className="backGround">
      <div className="pItem">
        <div className="categoryTitle">Category</div>
        <div className="row col-48 rCard ">
          <div className="card col-6 eCard">
            <div className="card-body bCard">
              <h5 className="card-title">
                Work <BsFillLayersFill />
              </h5>
              <p className="card-text">
                make a simple to-do list about work !!
              </p>
              <Link to={'/todo/work'} className="btn btn-primary">
                일정 보기
              </Link>
              <Link to={'/addTask/work'} className="btn btn-primary">
                일정 추가
              </Link>
            </div>
          </div>

          <div className="card col-6 eCard">
            <div className="card-body bCard">
              <h5 className="card-title">
                Learning <BsPen />
              </h5>
              <p className="card-text">
                make a simple to-do list about learning something useful !!
              </p>
              <Link to={'/todo/learning'} className="btn btn-primary">
                일정 보기
              </Link>
              <Link to={'/addTask/learning'} className="btn btn-primary">
                일정 추가
              </Link>
            </div>
          </div>

          <div className="card col-6 eCard">
            <div className="card-body bCard">
              <h5 className="card-title">
                Study <BsPencil />
              </h5>
              <p className="card-text">
                make a simple to-do list about studying something to upgrade
                your knowledge !!
              </p>
              <Link to={'/todo/study'} className="btn btn-primary">
                일정 보기
              </Link>
              <Link to={'/addTask/study'} className="btn btn-primary">
                일정 추가
              </Link>
            </div>
          </div>
          <div className="card col-6 eCard">
            <div className="card-body bCard">
              <h5 className="card-title">
                Fitness <BsGraphUp />
              </h5>
              <p className="card-text">
                make a simple to-do list about fitness to build your body and
                mind more strong !!
              </p>
              <Link to={'/todo/fitness'} className="btn btn-primary">
                일정 보기
              </Link>
              <Link to={'/addTask/fitness'} className="btn btn-primary">
                일정 추가
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;

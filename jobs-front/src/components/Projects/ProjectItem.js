import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../css/projectItem.css';
const ProjectItem = () => {
  return (
    <div className="backGround">
      <div className="pItem">
        <div className="row col-48 rCard ">
          <div className="card col-6 eCard">
            <div className="card-body bCard">
              <h5 className="card-title">Work</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
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
              <h5 className="card-title">Learning</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <Link to={'/todo/learning'} className="btn btn-primary">
                Go somewhere
              </Link>
            </div>
          </div>

          <div className="card col-6 eCard">
            <div className="card-body bCard">
              <h5 className="card-title">Study</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
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
              <h5 className="card-title">Fitness</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <Link to={'/todo/fitness'} className="btn btn-primary">
                Go somewhere
              </Link>
            </div>
          </div>
          <div className="card col-6 eCard">
            <div className="card-body bCard">
              <h5 className="card-title">Fitness</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <Link to="#" className="btn btn-primary">
                Go somewhere
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;

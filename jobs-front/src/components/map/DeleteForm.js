import React, { useEffect, useState } from 'react';
import '../../css/deleteForm.css';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const DeleteForm = (props) => {
  const id = props.match.params.id;
  const [map, setMap] = useState({
    address: '',
    bizName: '',
    content: '',
    interviewDate: '',
  });

  const deleteMap = () => {
    if (window.confirm('정말로 삭제 하시겠습니까?')) {
      axios
        .delete(`http://localhost:8080/api/map/${id}`)
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            props.history.push(`/`);
          } else {
            alert('삭제 실패');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/map/one/${id}`)
      .then((res) => {
        console.log(res.data);
        setMap(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="deleteForm">
      <Form>
        <Form.Group>
          <Form.Label>주소</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="address"
            value={map.address}
            disabled
          />
          <Form.Label>회사이름</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="bizName"
            value={map.bizName}
            disabled
          />
          <Form.Label>내용</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="content"
            value={map.content}
            disabled
          />
          <Form.Label>날짜</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter username"
            name="interviewDate"
            value={map.interviewDate}
            disabled
          />
        </Form.Group>
      </Form>
      <Button onClick={deleteMap}>삭제</Button>
    </div>
  );
};

export default DeleteForm;

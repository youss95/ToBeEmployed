import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import '../../css/addmap.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
const { kakao } = window;

const AddMapInfo = (props) => {
  const [findAddr, setFind] = useState({
    findAddress: '',
  });
  const [clickedAdd, setAdd] = useState({
    content: '',
    bizName: '',
    interviewDate: '',
    address: '',
  });
  console.log(findAddr.findAddress);
  console.log(clickedAdd.address);
  const [nullAddCheck, setAddCheck] = useState(false);
  const [nullConCheck, setConCheck] = useState(false);
  const [nullNameCheck, setNameCheck] = useState(false);
  const [userId, setUsername] = useState();
  const changeValue = (e) => {
    setAdd({
      ...clickedAdd,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const changeAdd = (e) => {
    setFind({
      ...findAddr,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  useEffect(() => {
    let jwtTokenTemp = localStorage.getItem('Authorization');
    let jwtToken = jwtTokenTemp.replace('Bearer ', '');

    setUsername(jwt_decode(jwtToken).id);
  }, []);

  const submitMap = (e) => {
    e.preventDefault();
    if (!clickedAdd.address) {
      setAddCheck(true);
    } else if (clickedAdd.address !== null) {
      setAddCheck(false);
    }
    if (!clickedAdd.bizName) {
      setNameCheck(true);
    } else if (clickedAdd.bizName !== null) {
      setNameCheck(false);
    }
    if (!clickedAdd.content) {
      setConCheck(true);
    } else if (clickedAdd.content !== null) {
      setConCheck(false);
    }
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    axios
      .post(`http://localhost:8080/api/map/${userId}`, clickedAdd, { headers })
      .then((res) => {
        console.log(res.data);
        setAdd(res.data);
        props.history.push(`/map/${userId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //주소검색
  const findAdd = () => {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 2, // 지도의 확대 레벨
      };

    var map = new kakao.maps.Map(mapContainer, mapOption);

    var geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(findAddr.findAddress, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 인포윈도우로 장소에 대한 설명을 표시합니다

        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
      }
    });

    var marker = new kakao.maps.Marker(),
      infowindow = new kakao.maps.InfoWindow({ zindex: 1 });

    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          var detailAddr = !!result[0].road_address
            ? '<div>도로명주소 : ' +
              result[0].road_address.address_name +
              '</div>'
            : '';
          detailAddr +=
            '<div>지번 주소 : ' + result[0].address.address_name + '</div>';

          var content =
            '<div class="bAddr">' +
            '<span class="title">선택한 주소</span>' +
            detailAddr +
            '</div>';

          console.log('지번주소:', result[0].address.address_name);
          let address = result[0].address.address_name;
          setAdd({ ...clickedAdd, address: address });

          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);

          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      });
    });

    kakao.maps.event.addListener(map, 'idle', function () {
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    function searchAddrFromCoords(coords, callback) {
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    function searchDetailAddrFromCoords(coords, callback) {
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var infoDiv = document.getElementById('centerAddr');
      }
    }
  };

  useEffect(() => {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 2, // 지도의 확대 레벨
      };

    var map = new kakao.maps.Map(mapContainer, mapOption);

    var geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch('아리랑로5길 111', function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 인포윈도우로 장소에 대한 설명을 표시합니다

        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
      }
    });

    var marker = new kakao.maps.Marker(),
      infowindow = new kakao.maps.InfoWindow({ zindex: 1 });

    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          var detailAddr = !!result[0].road_address
            ? '<div>도로명주소 : ' +
              result[0].road_address.address_name +
              '</div>'
            : '';
          detailAddr +=
            '<div>지번 주소 : ' + result[0].address.address_name + '</div>';

          var content =
            '<div class="bAddr">' +
            '<span class="title">선택한 주소</span>' +
            detailAddr +
            '</div>';

          console.log('지번주소:', result[0].address.address_name);
          let address = result[0].address.address_name;
          setAdd({ ...clickedAdd, address: address });

          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);

          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      });
    });

    kakao.maps.event.addListener(map, 'idle', function () {
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    function searchAddrFromCoords(coords, callback) {
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    function searchDetailAddrFromCoords(coords, callback) {
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var infoDiv = document.getElementById('centerAddr');
      }
    }
  }, []);
  return (
    <div>
      <div className="addmap">
        <form className="mapForm" onSubmit={submitMap}>
          <div className="eleTitle">위치</div>
          <input
            type="text"
            className="addform"
            name="findAddress"
            placeholder="주소를 검색해 보세요"
            onChange={changeAdd}
          />
          <Button onClick={findAdd}>검색</Button>

          <div
            className="map"
            id="map"
            style={{ width: '1000px', height: '400px' }}
          ></div>
          {nullAddCheck && (
            <div className="addMapNull">주소를 클릭하여 선택해주세요!</div>
          )}
          <div className="eleTitle">회사이름</div>
          <input
            type="text"
            className="addform"
            placeholder="회사이름을 입력"
            name="bizName"
            onChange={changeValue}
          />
          {nullNameCheck && (
            <div className="addMapNull">회사이름을 입력해 주세요</div>
          )}
          <div className="eleTitle">내용</div>
          <input
            type="text"
            className="addform"
            placeholder="내용 한줄 입력해 주세요"
            name="content"
            onChange={changeValue}
          />
          {nullConCheck && (
            <div className="addMapNull">내용을 입력해 주세요</div>
          )}
          <div className="eleTitle">날짜</div>
          <div className="interviewDate">
            <input
              type="date"
              className="addform"
              name="interviewDate"
              onChange={changeValue}
            />
          </div>

          {/*  <input
            type="text"
            class="addform"
            name="address"
            value={nullAddCheck ? clickedAdd.address : '맵을 클릭하여 주소입력'}
            disabled
          /> */}
          <input
            type="submit"
            className="btn btn-primary btn-lg subBtn"
            value="등록"
          />
        </form>
      </div>
    </div>
  );
};

export default AddMapInfo;

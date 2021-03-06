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

  //????????????
  const findAdd = () => {
    var mapContainer = document.getElementById('map'), // ????????? ????????? div
      mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // ????????? ????????????
        level: 2, // ????????? ?????? ??????
      };

    var map = new kakao.maps.Map(mapContainer, mapOption);

    var geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(findAddr.findAddress, function (result, status) {
      // ??????????????? ????????? ???????????????
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // ?????????????????? ????????? ?????? ????????? ???????????????

        infowindow.open(map, marker);

        // ????????? ????????? ??????????????? ?????? ????????? ??????????????????
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
            ? '<div>??????????????? : ' +
              result[0].road_address.address_name +
              '</div>'
            : '';
          detailAddr +=
            '<div>?????? ?????? : ' + result[0].address.address_name + '</div>';

          var content =
            '<div class="bAddr">' +
            '<span class="title">????????? ??????</span>' +
            detailAddr +
            '</div>';

          console.log('????????????:', result[0].address.address_name);
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
    var mapContainer = document.getElementById('map'), // ????????? ????????? div
      mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // ????????? ????????????
        level: 2, // ????????? ?????? ??????
      };

    var map = new kakao.maps.Map(mapContainer, mapOption);

    var geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch('????????????5??? 111', function (result, status) {
      // ??????????????? ????????? ???????????????
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // ?????????????????? ????????? ?????? ????????? ???????????????

        infowindow.open(map, marker);

        // ????????? ????????? ??????????????? ?????? ????????? ??????????????????
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
            ? '<div>??????????????? : ' +
              result[0].road_address.address_name +
              '</div>'
            : '';
          detailAddr +=
            '<div>?????? ?????? : ' + result[0].address.address_name + '</div>';

          var content =
            '<div class="bAddr">' +
            '<span class="title">????????? ??????</span>' +
            detailAddr +
            '</div>';

          console.log('????????????:', result[0].address.address_name);
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
          <div className="eleTitle">??????</div>
          <input
            type="text"
            className="addform"
            name="findAddress"
            placeholder="????????? ????????? ?????????"
            onChange={changeAdd}
          />
          <Button onClick={findAdd}>??????</Button>

          <div
            className="map"
            id="map"
            style={{ width: '1000px', height: '400px' }}
          ></div>
          {nullAddCheck && (
            <div className="addMapNull">????????? ???????????? ??????????????????!</div>
          )}
          <div className="eleTitle">????????????</div>
          <input
            type="text"
            className="addform"
            placeholder="??????????????? ??????"
            name="bizName"
            onChange={changeValue}
          />
          {nullNameCheck && (
            <div className="addMapNull">??????????????? ????????? ?????????</div>
          )}
          <div className="eleTitle">??????</div>
          <input
            type="text"
            className="addform"
            placeholder="?????? ?????? ????????? ?????????"
            name="content"
            onChange={changeValue}
          />
          {nullConCheck && (
            <div className="addMapNull">????????? ????????? ?????????</div>
          )}
          <div className="eleTitle">??????</div>
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
            value={nullAddCheck ? clickedAdd.address : '?????? ???????????? ????????????'}
            disabled
          /> */}
          <input
            type="submit"
            className="btn btn-primary btn-lg subBtn"
            value="??????"
          />
        </form>
      </div>
    </div>
  );
};

export default AddMapInfo;

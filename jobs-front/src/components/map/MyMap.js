import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../css/mymap.css';
const { kakao } = window;
const MyMap = () => {
  useEffect(() => {
    let listData = [
      /* */
    ];
    //get으로 불러와서
    /* 이부분은 주소대로 카카오 마커에 찍고 누르면 정보 나옴 */
    for (let i = 0; i < 2; i++) {
      listData.push([
        '서울 중구 세종대로 110',
        '<img class="ooh" src="nn.jpg">',
        '이름은?',
        '나이는 12',
      ]);
    }

    console.log(listData);
    // 맵을 넣을 div
    var mapContainer = document.getElementById('map');
    var mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 8,
    };
    // 맵 표시
    var map = new kakao.maps.Map(mapContainer, mapOption);

    //markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다

    // 주소 -> 좌표 변환 라이브러리
    const geocoder = new kakao.maps.services.Geocoder();
    // foreach loop
    listData.forEach(function (addr, index) {
      geocoder.addressSearch(addr[0], function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          var marker = new kakao.maps.Marker({
            position: coords,

            clickable: true,
          });
          // 마커를 지도에 표시합니다.
          marker.setMap(map);
          // 인포윈도우를 생성합니다

          //listData를 여기다가 바인딩
          var infowindow = new kakao.maps.InfoWindow({
            content:
              '<div style="width:150px;height:300px;text-align:center;padding:6px 0;">' +
              addr[1] +
              '<br><br>' +
              addr[2] +
              '<br><br>' +
              addr[3] +
              '</div>',
            removable: true,
          });
          // 마커에 클릭이벤트를 등록합니다
          kakao.maps.event.addListener(marker, 'click', function () {
            // 마커 위에 인포윈도우를 표시합니다
            infowindow.open(map, marker);
          });
        }
      });
    });
  }, []);

  return (
    <div className="mymap">
      <div className="searchInput">
        <input
          type="text"
          className="inpform"
          placeholder="주소를 검색해 보세요"
        />{' '}
        <Button>검색</Button>
        <Link class="btn btn-primary" to={`/map/add`}>
          추가
        </Link>
      </div>
      <div
        className="map"
        id="map"
        style={{ width: '1300px', height: '800px' }}
      ></div>
    </div>
  );
};

export default MyMap;

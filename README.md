# 토이 프로젝트 ToBeEmployed

---

## Description

- Spring-Boot를 개인적으로 학습하던 중 Restful-Api를 사용하여 간단한 개인 프로젝트를 만들고 싶었고 이에 대해서 뷰단을 서버에서 담당하지 않고 뷰 렌더링을 웹 브라우저가 담당하는 SPA방식인 리액트를 선택하였습니다.리액트는 함수형 컴포넌트를 사용하여 간단하지만 취준생 입장으로서 사용할만한 할 일 관리 기능과 카카오맵 API를 사용하여 면접을 본곳에 대한 기록을 보여주는 기능을 만들어 보았습니다.

## 일정

- 2021-8-30 ~ 2021-9-6

## Feature

---

### 로그인, 회원가입

1. JWT사용 하여 비로그인시 일정 추가, Map 사용을 제한
2. 회원가입시 front ,back단 에서 null값 체크, 다른 유효성 검사는 back단에서 처리
3. 로그인 id 중복체크 , 스프링 시큐리티로 filter를 통해 로그인 처리

### 일정관리

1. 관리할 일정에 대한 주제 만들기
2. 그 주제에 대해 일정을 만들어 화면에 준비, 진행중, 끝 으로 나누어져 표시

### 면접 Map

1.  면접에 대한 피드백을 그 회사의 주소와 함께 등록
2.  맵에 마커 생성과 함께 등록한 내용 보이기

## PostMan

---

<img src="../ToBeEmployed/img/postMan.png" width="250px" height="350px">

### [시연영상 보러가기](https://www.youtube.com/watch?v=jbQZ4RCRKPg)

## Requirements

---

### FrontEnd

- Javascript
- React
- BootStrap 4

### BackEnd

- Java 8
- Spring-Boot 2.5.4
- Spring Data JPA

### DataBase

- MariaDB

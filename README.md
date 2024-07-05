# API 명세서

## 개요

이 API는 콘서트 예약 서비스의 RESTful API입니다.

## 기본 URL

<!-- `https://api.example.com/v1` -->

## 인증

API 요청에는 모든 엔드포인트에 대해 Bearer Token 인증이 필요합니다.

<details>
  <summary><span style="font-size: 1.5em;">API Spec</span></summary>

### 유저 토큰 발급 API

- 로그인
- 로그아웃
- 유저 조회
- 유저 전체 조회
<!-- - 토큰 발급 -->

### 예약 가능 날짜 / 좌석 API

- 콘서트 조회
- 콘서트 등록
- 콘서트 삭제
- 예약 가능 날짜 조회
- 예약 가능 날짜 별 좌석 조회

### 좌석 예약 요청 API

- 예약 가능 날짜 별 좌석 예약
- 좌석 예약 취소 요청

### 잔액 충전 / 조회 API

- 잔액 조회
- 잔액 충전

### 결제 API

- 결제 요청
</details>

<details>
  <summary><span style="font-size: 1.5em;">엔드포인트</span></summary>

### 유저 토큰 발급 API

#### 로그인

##### EndPoint

- **URL**: `/login`
- **Method**: `POST`
- **Description**: 로그인 기능

##### Request

- **Headers**:
  - `Authorization`: `Bearer {token}`
  - `Content-Type`: `application/json`
- **Body**:
  ```json
  {
    "userId": "string",
    "password": "string"
  }
  ```

##### Response

- **Success(201)**:
  ```json
  {
    "userId": "string",
    "token": "jwt토큰"
  }
  ```
- **Error(400)**:
  ```json
  {
    "error": "400",
    "message": "Invalid input data"
  }
  ```

##### Error

- 400 : 잘못된 요청
- 401 : 인증 실패
- 403 : 접근 권한 없음
- 404 : 리소스 없음
- 500 : 서버 오류

#### 로그아웃

##### EndPoint

- **URL**: `/logout`
- **Method**: `POST`
- **Description**: 로그아웃 기능

##### Request

- **Headers**:
  - `Authorization`: `Bearer {token}`
  - `Content-Type`: `application/json`
- **Body**:
  ```json
  {
    "userId": "string"
  }
  ```

##### Response

- **Success(201)**:
  ```json
  {
    "token": null
  }
  ```

#### 유저 조회

##### EndPoint

- **URL**: `/getUserInfo`
- **Method**: `POST`
- **Description**: 특정 유저 조회

##### Request

- **Headers**:
  - `Authorization`: `Bearer {token}`
  - `Content-Type`: `application/json`
- **Body**:
  ```json
  {
    "userId": "string"
  }
  ```

##### Response

- **Success(201)**:
  ```json
  {
    "userId": "string",
    "userName": "string",
    "userEmail": "string",
    "token": "string"
  }
  ```
- **Error(404)**:
  ```json
  {
    "error": 404,
    "message": "Not found"
  }
  ```

#### 유저 전체 조회

##### EndPoint

- **URL**: `/getUserInfoAll`
- **Method**: `POST`
- **Description**: 전체 유저 조회

##### Request

- **Headers**:
  - `Authorization`: `Bearer {token}`
  - `Content-Type`: `application/json`
- **Body**:
  ```json
  {}
  ```

##### Response

- **Success(201)**:
  ```json
  [
    {
      "userId": "string",
      "userName": "string",
      "userEmail": "string",
      "token": "string"
    },
    {
      "userId": "string",
      "userName": "string",
      "userEmail": "string",
      "token": "string"
    },
    {
      "userId": "string",
      "userName": "string",
      "userEmail": "string",
      "token": "string"
    }
  ]
  ```
- **Error(404)**:
  ```json
  {
    "error": 404,
    "message": "Not found"
  }
  ```

<!-- #### 유저 토큰 발급

##### EndPoint

- **URL**: `/setToken`
- **Method**: `POST`
- **Description**: 토큰 발급

##### Request

- **Headers**:
  - `Authorization`: `Bearer {token}`
  - `Content-Type`: `application/json`
- **Body**:
  ```json
  {
    "userId": "string"
  }
  ```

##### Response

- **Success(201)**:
  ```json
  {
    "userId": "string",
    "token": "string"
  }
  ``` -->

### 예약 가능 날짜 / 좌석 API

#### 콘서트 조회

##### EndPoint

- **URL**: `/getConcert`
- **Method**: `POST`
- **Description**: 전체 콘서트를 조회

##### Request

- **Headers**:
  - `Authorization`: `Bearer {token}`
  - `Content-Type`: `application/json`
- **Body**:
  ```json
  {
    "concertName": "string"
  }
  ```

##### Response

- **Success(201)**:

  ```json
  [
    {
      "concertName" : "string",
      "concertOpenedDate" : "dateTime",
      "concertClosedDate" : "dateTime",
      "concertMaxCapacity" : number,
      "concertApplyCapacity" : number
    },
    {
      "concertName" : "string",
      "concertOpenedDate" : "dateTime",
      "concertClosedDate" : "dateTime",
      "concertMaxCapacity" : number,
      "concertApplyCapacity" : number
    }
  ]

  ```

- **Error(404)**:
  ```json
  {
    "error": "404",
    "message": "Not Found"
  }
  ```

#### 콘서트 등록

##### EndPoint

- **URL**: `/setConcert`
- **Method**: `POST`
- **Description**: 콘서트 등록

##### Request

- **Headers**:
  - `Authorization`: `Bearer {token}`
  - `Content-Type`: `application/json`
- **Body**:
  ```json
  {
    "concertName" : "string",
    "concertOpenedDate" : "dateTime",
    "concertClosedDate" : "dateTime",
    "concertMaxCapacity" : number
  }
  ```

##### Response

- **Success(201)**:

  ```json
  {
    "concertId": number,
    "concertName" : "string",
    "concertOpenedDate" : "dateTime",
    "concertClosedDate" : "dateTime",
    "concertMaxCapacity" : number,
    "concertApplyCapacity" : number
  }
  ```

#### 콘서트 삭제

##### EndPoint

- **URL**: `/delConcert`
- **Method**: `POST`
- **Description**: 콘서트 삭제

##### Request

- **Headers**:

  - `Authorization`: `Bearer {token}`
  - `Content-Type`: `application/json`

- **Body**:
  ```json
  {
    "concertName": "string",
    "concertOpenDate": "dateTime"
  }
  ```

##### Response

- **Success(201)**:

  ```json
  {
    "result" : boolean
  }
  ```

- **Error(404)**:
  ```json
  {
    "error": "404",
    "message": "Not Found"
  }
  ```

#### 예약 가능 날짜 조회

##### EndPoint

- **URL**: `/getConcertDate`
- **Method**: `POST`
- **Description**: 예약 가능 날짜 조회

##### Request

- **Headers**:

  - `Authorization`: `Bearer {token}`
  - `Content-Type`: `application/json`

- **Body**:
  ```json
  {
    "concertName": "string"
  }
  ```

##### Response

- **Success(201)**:

  ```json
  [
    {
      "concertName" : "string",
      "concertOpenedDate" : dateTime
    },
    {
      "concertName" : "string",
      "concertOpenedDate" : dateTime
    },
    {
      "concertName" : "string",
      "concertOpenedDate" : dateTime
    },
    {
      "concertName" : "string",
      "concertOpenedDate" : dateTime
    }
  ]
  ```

- **Error(404)**:
  ```json
  {
    "error": "404",
    "message": "Not Found"
  }
  ```

#### 예약 가능 날짜 별 좌석 조회

##### EndPoint

- **URL**: `/getConcertDateToCapacity`
- **Method**: `POST`
- **Description**: 예약 가능 날짜 별 좌석 조회

##### Request

- **Headers**:

  - `Authorization`: `Bearer {token}`
  - `Content-Type`: `application/json`

- **Body**:
  ```json
  {
    "concertName" : "string",
    "concertOpenedDate" : dateTime
  }
  ```

##### Response

- **Success(201)**:

  ```json
  [
    {
      "concertName" : "string",
      "concertOpenedDate" : dateTime,
      "concertSeatNumber" : [ number, number, number ]
    }
  ]
  ```

- **Error(404)**:
  ```json
  {
    "error": "404",
    "message": "Not Found"
  }
  ```

### 좌석 예약 요청 API

#### 예약 가능 날짜 별 좌석 예약

##### EndPoint

- **URL**: `/setConcertDateToCapacity`
- **Method**: `POST`
- **Description**: 예약 가능 날짜 별 좌석 예약

##### Request

- **Headers**:

  - `Authorization`: `Bearer {token}`
  - `Content-Type`: `application/json`

- **Body**:
  ```json
  {
    "concertname" : string,
    "concertOpenedDate" : dateTime,
    "concertSeatNumber" : number
  }
  ```

##### Response

- **Success(201)**:

  ```json
  {
    "result" : boolean
  }
  ```

- **Error(404)**:
  ```json
  {
    "error": "404",
    "message": "Not Found"
  }
  ```

#### 좌석 예약 취소 요청

##### EndPoint

- **URL**: `/delConcertDateToCapacity`
- **Method**: `POST`
- **Description**: 좌석 예약 취소 요청

##### Request

- **Headers**:

  - `Authorization`: `Bearer {token}`
  - `Content-Type`: `application/json`

- **Body**:
  ```json
  {
    "concertName" : string,
    "concertOpenedDate" : dateTime,
    "concertSeatNumber" : number
  }
  ```

##### Response

- **Success(201)**:

  ```json
  {
    "result": boolean
  }
  ```

- **Error(404)**:
  ```json
  {
    "error": "404",
    "message": "Not Found"
  }
  ```

### 잔액 충전 / 조회 API

#### 잔액 조회

##### EndPoint

- **URL**: `/getAmount`
- **Method**: `POST`
- **Description**: 잔액 조회

##### Request

- **Headers**:

  - `Authorization`: `Bearer {token}`
  - `Content-Type`: `application/json`

- **Body**:
  ```json
  {
    "userId": "string"
  }
  ```

##### Response

- **Success(201)**:

  ```json
  {
    "userId": "string",
    "userAmount": number
  }
  ```

#### 잔액 충전

##### EndPoint

- **URL**: `/setAmount`
- **Method**: `POST`
- **Description**: 잔액 충전

##### Request

- **Headers**:

  - `Authorization`: `Bearer {token}`
  - `Content-Type`: `application/json`

- **Body**:
  ```json
  {
    "userId" : "string",
    "chargeAmount" : number
  }
  ```

##### Response

- **Success(201)**:

  ```json
  {
    "userId": "string",
    "userAmount": number
  }
  ```

### 결제 API

#### 결제 요청

##### EndPoint

- **URL**: `/setPayment`
- **Method**: `POST`
- **Description**: 결제 요청

##### Request

- **Headers**:

  - `Authorization`: `Bearer {token}`
  - `Content-Type`: `application/json`

- **Body**:
  ```json
  {
    "userId": "string",
    "usingAmount": number
  }
  ```

##### Response

- **Success(201)**:

  ```json
  {
    "result": boolean
  }
  ```

- **Error(500)**:

  ```json
  {
    "error": "500",
    "message": "금액이 부족합니다".
  }
  ```

  </details>

<details>
  <summary><span style="font-size: 1.5em;">시퀀스 다이어그램</span></summary>
  
  - 로그인 시나리오
  ![로그인_시나리오](./src/asset/로그인_시나리오.png)
  
  - 충전 시나리오
  ![충전_시나리오](./src/asset/충전_시나리오.png)

- 콘서트 예약 시나리오
  ![콘서트_예약_시나리오](./src/asset/콘서트_예약_시나리오.png)

</details>

<details>
  <summary><span style="font-size: 1.5em;">마일스톤 정리</span></summary>
  
  ![프로젝트_마일스톤](./src/asset/프로젝트_마일스톤.png)

</details>

<details>
  <summary><span style="font-size: 1.5em;">ERD</span></summary>
  
  ![ERD](./src/asset/erd_구조.png)

</details>

<details>
  <summary><span style="font-size: 1.5em;">마일스톤 정리</span></summary>
  
  ![프로젝트_마일스톤](./src/asset/프로젝트_마일스톤.png)

</details>

<details>
  <summary><span style="font-size: 1.5em;">시나리오 분석</span></summary>
  
  ### 유저 대기열 토큰 기능
  * 유저 토큰 발급
    - 유저는 서비스에 접속하여 대기열 토큰을 요청합니다.
    - 서버는 유저의 UUID와 대기열 정보를 포함한 토큰을 생성하여 반환합니다.
    - 대기열 정보에는 대기 순서와 잔여 시간이 포함될 수 있습니다.
    - 유저는 발급받은 토큰을 이용하여 다른 API를 호출할 수 있습니다.
  
  ### 예약 가능 날짜 / 좌석 API
  * 예약 가능 날짜 조회
    - 유저는 예약 가능한 날짜 목록을 요청합니다.
    - 서버는 예약 가능한 날짜 목록을 반환합니다.
  * 예약 가능 좌석 조회
    - 유저는 특정 날짜의 예약 가능한 좌석 정보를 요청합니다.
    - 서버는 해당 날짜의 예약 가능한 좌석 정보를 반환합니다.
  
  ### 좌석 예약 요청 API
  * 좌석 예약 요청
    - 유저는 날짜와 좌석 번호를 입력하여 좌석 예약을 요청합니다.
    - 서버는 해당 좌석을 임시 예약 상태로 변경하고, 유저에게 5분 동안 임시 배정합니다.
    - 유저는 5분 내에 결제를 완료해야 합니다.
    - 5분 내에 결제가 완료되지 않으면 임시 예약이 해제되고, 다른 유저가 해당 좌석을 예약할 수 있게 됩니다.
  
  ### 잔액 충전 / 조회 API
  * 잔액 충전
    - 유저는 충전 금액을 입력하여 잔액을 충전합니다.
    - 서버는 유저의 잔액을 업데이트합니다.
  * 잔액 조회
    - 유저는 자신의 잔액을 조회합니다.
    - 서버는 유저의 잔액을 반환합니다.
  
  ### 결제 API
  * 결제 요청
    - 유저는 임시 예약된 좌석에 대한 결제를 요청합니다.
    - 서버는 유저의 잔액을 확인하고 결제를 처리합니다.
    - 결제가 완료되면 좌석 소유권을 유저에게 배정하고, 대기열 토큰을 만료시킵니다.

</details>

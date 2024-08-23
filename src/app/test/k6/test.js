import http from 'k6/http';
import { check, sleep, group } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 10 }, // 30초 동안 10명의 사용자
    { duration: '1m', target: 50 }, // 1분 동안 50명의 사용자
    { duration: '30s', target: 0 }, // 30초 동안 사용자를 줄임
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95%의 요청이 2초 이내에 완료되어야 함
  },
};

export default function () {
  // 1. 콘서트 조회
  group('콘서트 조회', function () {
    let res = http.get('http://localhost:3000/ticatch-api#/concerts');
    check(res, {
      'status was 200': (r) => r.status === 200,
    });
    sleep(1);
  });

  // 2. 유저 생성
  group('유저 생성', function () {
    let payload = JSON.stringify({
      userId: `user_${__VU}_${__ITER}`, // 각 사용자가 고유한 ID를 갖도록 설정
      userName: 'Test User',
      userEmail: `testuser_${__VU}_${__ITER}@example.com`,
    });
    let params = { headers: { 'Content-Type': 'application/json' } };
    let res = http.post(
      'http://localhost:3000/ticatch-api#/userInfo/setUserInfo',
      payload,
      params,
    );

    check(res, {
      'status was 201': (r) => r.status === 201,
    });
    sleep(1);
  });

  // 3. 충전 금액 조회
  group('충전 금액 조회', function () {
    let res = http.get(
      'http://localhost:3000/ticatch-api#/amount/getChargeAmount',
    );
    check(res, {
      'status was 200': (r) => r.status === 200,
    });
    sleep(1);
  });

  // 4. 예약 상태 조회
  group('예약 상태 조회', function () {
    let res = http.get('http://localhost:3000/ticatch-api#/reservations/1'); // 1번 예약 상태 조회
    check(res, {
      'status was 200': (r) => r.status === 200,
    });
    sleep(1);
  });
}

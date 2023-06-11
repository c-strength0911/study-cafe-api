const router = require('express').Router();
const admin_controller = require('../controller/admin_controller');

/** 관리자 가입
 * @swagger
 *
 * /api/admin/join:
 *  post:
 *    summary: "회원 가입"
 *    description: "POST 방식으로 회원을 등록한다."
 *    tags: [Admin]
 *    requestBody:
 *      description: id, password, phone을 입력 받아 회원가입을 함
 *      required: false
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *                description: "유저 계정\ 글자수 제한 : 45"
 *              password:
 *                type: string
 *                description: "비밀번호  글자수 제한 : 45"
 *              phone:
 *                  type: string
 *                  description : "000-0000-0000 형식"
 *    responses:
 *      "201":
 *        description: 회원등록 성공시 success = true 실패시 error_message = error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: boolean
 *                  example : true
 *      "400":
 *        description: 아이디 또는 전화번호 중복시 result = false, error_message = '아이디 또는 전화번호가 중복됩니다.'
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: boolean
 *                  example : false
 *                error_message:
 *                  type: string
 *                  example : "아이디 또는 전화번호가 중복됩니다."
 *
 */
router.post('/join', admin_controller.c_UserJoin);

/** 관리자 로그인
 * @swagger
 *
 * /api/admin/login:
 *  post:
 *    summary: "관리자 로그인"
 *    description: "관리자 로그인"
 *    tags: [Admin]
 *    requestBody:
 *      description: id, password
 *      required: false
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *                description: "유저 계정\ 글자수 제한 : 45"
 *              password:
 *                type: string
 *                description: "비밀번호  글자수 제한 : 45"
 *    responses:
 *      "200":
 *        description: 로그인 성공시 result = true, message = '로그인 성공'
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: boolean
 *                  example : true
 *                message:
 *                  type: string
 *                  example : "로그인 성공"
 *      "400":
 *        description: 로그인 실패시 result = false, error_message = '로그인 실패'
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: boolean
 *                  example : false
 *                error_message:
 *                  type: string
 *                  example : "로그인 실패"
 */
router.post('/login', admin_controller.c_AdminLogin);

/** 회원 삭제
 * @swagger
 *
 * /api/admin/kick:
 *  delete:
 *    summary: "회원 삭제"
 *    description: "관리자 권한으로 회원을 삭제"
 *    tags: [Admin]
 *    requestBody:
 *      description: 회원 id를 받아 삭제함
 *      required: false
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *                description: "유저 계정\ 글자수 제한 : 45"
 *    responses:
 *      "400":
 *        description: 회원 삭제 실패시 result = false, error_message = '회원 삭제 실패'
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error_message:
 *                  type: string
 *                  example : "존재하지 않는 아이디입니다."
 *
 *
 */
router.delete('/kick', admin_controller.c_UserKick);

/** 예약된 좌석 확인
 * @swagger
 *
 * /api/admin/scheduled:
 *  get:
 *    summary: "예약된 좌석 확인"
 *    description: "예약된 좌석 확인"
 *    tags: [Admin]
 *    requestBody:
 *      description: 회원 id를 받아 삭제함
 *      required: false
 *
 *    responses:
 *      "400":
 *        description: 검색 실패
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: boolean
 *                  example : false
 *                error_message:
 *                  type: string
 *                  example : "검색 실패"
 *
 *
 */
router.get('/scheduled', admin_controller.c_AdminScheduled);

/** 좌석 추가
 * @swagger
 *
 * /api/admin/seat-add:
 *  post:
 *    summary: "좌석 추가"
 *    description: "좌석 추가"
 *    tags: [Admin]
 *    requestBody:
 *      description: 빈칸에 "empty"를 입력하면 좌석이 추가됨. "empty"가 아닌 다른 값이 들어가면 좌석이 추가되지 않음.
 *      required: false
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              seat:
 *                type: string
 *                description: "empty"
 *    responses:
 *      "200":
 *        description: 좌석 추가 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: boolean
 *                  example : true
 *
 *
 *      "400":
 *        description: 좌석 추가 실패
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: boolean
 *                  example : false
 *                error_message:
 *                  type: string
 *                  example : "알 수 없는 오류가 발생했습니다."
 */
router.post('/seat-add', admin_controller.c_AdminAddSeat);
module.exports = router;

const router = require('express').Router();
const user_controller = require('../controller/user_controller');

//swagger 완료
/** 로그인
 * @swagger
 *
 * /api/user/login:
 *  post:
 *    summary: "로그인"
 *    description: "로그인."
 *    tags: [User]
 *    requestBody:
 *      description: 로그인
 *      required: false
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *                description: "유저 계정 글자수 제한 : 45"
 *              password:
 *                type: string
 *                description: "비밀번호  글자수 제한 : 45"
 *    responses:
 *      "200":
 *        description: 회원등록 성공시 result = true, message = '로그인 성공' 실패시 success = false, message = '로그인 실패 아이디 혹은 암호가 틀립니다.'
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
 *
 *
 *      "400":
 *        description: 실패시 success = false, message = '로그인 실패 아이디 혹은 암호가 틀립니다.'
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: boolean
 *                  example : false
 *                message:
 *                  type: string
 *                  example : "로그인 실패 아이디 혹은 암호가 틀립니다."
 */
router.post('/login', user_controller.c_UserLogin);
//swagger 완료
/** 로그 아웃
 * @swagger
 *
 * /api/user/logout:
 *  delete:
 *    summary: "로그 아웃"
 *    description: "로그인 된 유저를 로그아웃 시킴"
 *    tags: [User]
 *    responses:
 *      "200":
 *        description: 로그아웃 성공시 result = true, message = '로그아웃 성공'
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
 *                  example : "로그아웃 성공"
 *      "401":
 *             description: 실패시 result = false, error_message = '로그인이 되어있지 않습니다.'
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     result:
 *                       type: boolean
 *                       example : false
 *                     error_message:
 *                       type: string
 *                       example : "로그인이 되어있지 않습니다."
 *
 */
router.delete('/logout', user_controller.c_UserLogout);
//swagger 완료
/** 회원 가입
 * @swagger
 *
 * /api/user/join:
 *  post:
 *    summary: "회원 가입"
 *    description: "POST 방식으로 회원을 등록한다."
 *    tags: [User]
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
router.post('/join', user_controller.c_UserJoin);

//swagger 완료
/** 회원 비밀번호 수정
 * @swagger
 *
 * /api/user/change/password:
 *  patch:
 *    summary: "회원 비밀번호 수정"
 *    description: "patch 방식으로 회원 비밀번호를 수정."
 *    tags: [User]
 *    requestBody:
 *      description: 회원 비밀번호 수정.
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              password:
 *                type: string
 *                description: "변경전 비밀번호	글자수 제한 : 45"
 *              new_password:
 *                type: string
 *                description : "변경후 비밀번호	글자수 제한 : 45"
 *    responses:
 *      "200":
 *        description: 회원 비밀번호 수정 성공시 result = true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: boolean
 *                  example : true
 *      "400":
 *        description: 회원 비밀번호 수정 실패시 result = false, error_message = '비밀번호가 일치하지 않습니다.'
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
 *                  example : "비밀번호가 일치하지 않습니다."
 *      "401":
 *        description: 로그인이 되어있지 않을 경우 result = false, error_message = '로그인이 되어있지 않습니다.'
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
 *                  example : "로그인이 되어있지 않습니다."
 */
router.patch('/change/password', user_controller.c_UserPasswordUpdate);

//swagger 완료
/** 회원 전화번호 수정
 * @swagger
 *
 * /api/user/change/phone:
 *  patch:
 *    summary: "회원 전화번호 수정"
 *    description: "patch 방식으로 회원 전화번호를 수정."
 *    tags: [User]
 *    requestBody:
 *      description: 회원 전화번호 수정.
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              phone:
 *                type: string
 *                description: "000-0000-0000"
 *              new_phone:
 *                type: string
 *                description : "000-0000-0000"
 *    responses:
 *      "200":
 *        description: 회원 전화번호 수정 성공시 result = true , message = '전화번호 변경 성공'
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
 *                  example : "전화번호 변경 성공"
 *      "400":
 *        description: 회원 전화번호 수정 실패시 result = false, error_message = '현재 전화번호가 일치하지 않습니다.'
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
 *                  example : "현재 전화번호가 일치하지 않습니다."
 *      "401":
 *        description: 로그인이 되어있지 않을 경우 result = false, error_message = '로그인이 되어있지 않습니다.'
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
 *                  example : "로그인이 되어있지 않습니다."
 */
router.patch('/change/phone', user_controller.c_UserPhoneUpdate);

//swagger 완료
/** 회원 삭제
 * @swagger
 *
 * /api/user/delete:
 *  delete:
 *    summary: "회원 삭제"
 *    description: "로그인한 회원을 삭제."
 *    tags: [User]
 *    requestBody:
 *      description:
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *                description: "삭제할 유저 계정"
 *    responses:
 *      "200":
 *        description: 유저 삭제시 result = true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: boolean
 *                  example : true
 *      "400":
 *        description: 유저 삭제 실패시 result = false error_message = 'id가 일치하지 않습니다.'
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
 *                  example : "id가 일치하지 않습니다."
 *      "401":
 *        description: 로그인이 안되어있을 경우 result = false error_message = '로그인이 되어있지 않습니다.'
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
 *                  example : "로그인이 되어있지 않습니다."
 */
router.delete('/delete', user_controller.c_UserLeave);

/** 회원 정보 가져오기
 * @swagger
 * /api/user/{id}:
 *  get:
 *    summary: "회원 정보 가져오기"
 *    description: "회원 정보를 가져온다."
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 회원 정보를 돌려준다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user_id:
 *                  type: string
 *                  example : "test"
 *                user_phone:
 *                  type: string
 *                  example : "010-1234-5678"
 *      "404":
 *        description: 회원 정보를 찾을 수 없을 경우 result = false, error_message = '회원 정보를 찾을 수 없습니다.'
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
 *                  example : "회원 정보를 찾을 수 없습니다."
 *
 */
router.get('/:id', user_controller.c_UserSearch);

module.exports = router;

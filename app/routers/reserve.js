const router = require('express').Router();
const reserve_controller = require('../controller/reservation_controller');

/** 예약
 * @swagger
 * /api/reserve/checking:
 *  post:
 *    summary: "예약"
 *    description: "예약."
 *    tags: [Reserve]
 *    requestBody:
 *      description: 예약
 *      required: false
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              phone:
 *                type: string
 *                description: "000-0000-0000"
 *              date:
 *                type: string
 *                description: "예약 날짜 YYYY-MM-DD"
 *              time:
 *                type: string
 *                description: "시간단위로 입력 0~23"
 *              seat:
 *                type: string
 *                description: "좌석번호 1~5"
 *    responses:
 *      "200":
 *        description: 회원등록 성공시 result = true, message = '로그인 성공' 실패시 success = false, message = '로그인 실패 아이디 혹은 암호가 틀립니다.'
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: string
 *      "400":
 *        description: 필수값이 누락
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: boolean
 *                  example: false
 *                error_message:
 *                  type: string
 *                  example: "필수값이 누락되었습니다."
 *
 *
 */
router.post('/checking', reserve_controller.c_ReserveCheck);

module.exports = router;

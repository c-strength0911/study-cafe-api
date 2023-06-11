const router = require('express').Router();
const user = require('./user');
const reserve = require('./reserve');
const admin = require('./admin');
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: 예약기능
 */
router.use('/admin', admin);

/**
 * @swagger
 * tags:
 *   name: Reserve
 *   description: 예약기능
 */
router.use('/reserve', reserve);

/**
 * @swagger
 * tags:
 *   name: User
 *   description: 회원 정보 관리
 */
router.use('/user', user);

module.exports = router;

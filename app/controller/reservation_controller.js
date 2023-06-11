const reservation_model = require('../model/reservation_model');
module.exports = {
	async c_ReserveCheck(req, res) {
		if (
			req.body.phone == null ||
			req.body.date == null ||
			req.body.time == null ||
			req.body.seat == null
		) {
			res.status(400);
			res.json({
				result: false,
				error_message: '필수값이 누락되었습니다.',
			});
			return;
		}
		if (!req.session.auth) {
			res.status(401);
			res.json({
				result: false,
				error_message: '로그인이 필요한 서비스입니다.',
			});
			return;
		} else {
			let [result] = await reservation_model.m_ReserveSeatCheck(
				req.body.seat,
				req.body.date
			);
			if (result.length == 0) {
				let code = req.body.date + req.body.time + req.body.seat;

				let ReservationResult = await reservation_model.m_ReserveCheck(
					req.body.phone,
					req.body.date,
					req.body.time,
					req.body.seat,
					code
				);
				res.status(200);
				res.json({ result: true, message: '예약 가능한 좌석입니다.' });
				return;
			} else {
				res.status(400);
				res.json({
					result: false,
					error_message: '이미 예약된 좌석입니다.',
				});
				return;
			}
		}
	},
};

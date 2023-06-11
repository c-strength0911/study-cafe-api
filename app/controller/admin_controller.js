const admin_model = require('../model/admin_model');

module.exports = {
	async c_UserJoin(req, res) {
		const { id, password, phone } = req.body;

		let [result, error] = await admin_model.m_UserJoin(id, password, phone);
		if (result) {
			res.status(201);
			res.json({ result: true });
			return;
		} else if (error.code == 'ER_DUP_ENTRY') {
			res.status(400);
			res.json({
				result: false,
				error_message: '아이디 또는 전화번호가 중복됩니다.',
			});
			return;
		} else if (error) {
			res.status(400);
			res.json({
				result: false,
				error_message: '알 수 없는 오류가 발생했습니다.',
			});
			return;
		}
		res.status(201);
		res.json(result);
	},
	async c_AdminLogin(req, res) {
		const { id, password } = req.body;
		let [result, error] = await admin_model.m_AdminSearch(id);
		let result_data = {
			result: false,
			error_message: '로그인 실패 아이디 혹은 암호가 틀립니다.',
		};
		if (result.length > 0) {
			if (result[0].admin_password == password) {
				req.session.auth = true;
				req.session.admin = true;
				req.session.user_id = id;
				req.session.admin_password = password;

				result_data.result = true;
				result_data.message = '로그인 성공';
				delete result_data.error_message;
			} else {
				result_data.result = false;
				result_data.error_message = '로그인 실패 아이디 혹은 암호가 틀립니다.';
			}
		}

		res.json(result_data);
	},
	async c_UserKick(req, res) {
		if (!req.session.admin) {
			res.status(400).json({ error_message: '관리자 권한이 없습니다.' });
			return;
		} else {
			let { id } = req.body;
			let [result, error] = await admin_model.m_UserKick(id);
			if (result.affectedRows > 0) {
				res.status(200).json({ result: true });
			} else {
				res.status(400).json({
					result: false,
					error_message: '존재하지 않는 아이디입니다.',
				});
			}
		}
	},
	async c_AdminScheduled(req, res) {
		if (!req.session.admin) {
			res.status(400).json({ error_message: '관리자 권한이 없습니다.' });
			return;
		} else {
			let [result, error] = await admin_model.m_AdminScheduleCheck();
			if (result) {
				res.status(200).json(result);
			} else {
				res.status(400).json({
					result: false,
					error_message: '알 수 없는 오류가 발생했습니다.',
				});
			}
		}
	},
	async c_AdminAddSeat(req, res) {
		if (!req.session.admin) {
			res.status(400).json({ error_message: '관리자 권한이 없습니다.' });
			return;
		} else {
			let { seat } = req.body;
			if (seat == 'empty') {
				let [result, error] = await admin_model.m_AdminAddSeat();
				if (result.affectedRows > 0) {
					res.status(200).json({ result: true });
					return;
				} else {
					res.status(400).json({
						result: false,
						error_message: '알 수 없는 오류가 발생했습니다.',
					});
					return;
				}
			} else {
				res.status(400).json({ message: 'empty를 입력해 주세요' });
			}
		}
	},
};

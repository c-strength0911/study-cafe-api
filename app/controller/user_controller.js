const user_model = require('../model/user_model');

module.exports = {
	async c_UserLogin(req, res) {
		const { id, password } = req.body;
		let [result, error] = await user_model.m_UserSearch(id);
		let result_data = {
			result: false,
			error_message: '로그인 실패 아이디 혹은 암호가 틀립니다.',
		};
		if (result.length > 0) {
			if (result[0].user_password == password) {
				// 로그인 성공시 세션에 데이터 저장.
				req.session.auth = true; // auth 프로퍼티를 통해 로그인이 되었는지 확인.
				req.session.user_id = id; // 세션에 유저 아이디값 저장.
				req.session.user_password = password; // 비밀번호 저장.

				// 응답으로 전송하는 데이터에 로그인 성공값을 저장
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

	async c_UserJoin(req, res) {
		const { id, password, phone } = req.body;

		let [result, error] = await user_model.m_UserJoin(id, password, phone);
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

	async c_UserSearch(req, res) {
		const id = req.params.id;
		let [result, err] = await user_model.m_UserSearch(id);
		if (result.length == 0) {
			res.status(404);
			res.json({
				result: false,
				error_message: '회원 정보를 찾을 수 없습니다.',
			});
			return;
		} else {
			res.status(200);
			res.json({
				user_id: result[0].user_id,
				user_phone: result[0].user_phone,
			});
			return;
		}
	},

	async c_UserPasswordUpdate(req, res) {
		if (!req.session.auth) {
			res.status(401);
			res.json({ result: false, error_message: '로그인이 되어있지 않습니다.' });
			return;
		} else {
			const { password, new_password } = req.body;
			let [result, error_message] = await user_model.m_UserPasswordUpdate(
				password,
				new_password
			);
			if (result.affectedRows == 0) {
				res.status(400);
				res.json({
					result: false,
					error_message: '현재 비밀번호가 틀렸습니다.',
				});
				return;
			} else {
				res.status(200);
				res.json({ result: true, message: '비밀번호 변경 성공' });
				return;
			}
		}
	},
	async c_UserPhoneUpdate(req, res) {
		if (!req.session.auth) {
			res.status(401);
			res.json({ result: false, error_message: '로그인이 되어있지 않습니다.' });
			return;
		} else {
			const { phone, new_phone } = req.body;
			let [result] = await user_model.m_UserPhoneUpdate(phone, new_phone);
			if (result.affectedRows == 0) {
				res.status(400);
				res.json({
					result: false,
					error_message: '현재 전화번호가 일치하지 않습니다',
				});
				return;
			} else {
				res.status(200);
				res.json({ result: true, message: '전화번호 변경 성공' });
				return;
			}
		}
	},
	async c_UserLogout(req, res) {
		if (req.session.auth) {
			req.session.destroy();
			res.status(200);
			res.json({ result: true, message: '로그아웃 성공' });
		} else {
			res.status(401);
			res.json({ result: false, message: '로그인이 되어있지 않습니다.' });
		}
	},
	async c_UserLeave(req, res) {
		if (!req.session.auth) {
			res.status(401);
			res.json({ result: false, error_message: '로그인이 되어있지 않습니다.' });
			return;
		} else {
			const { id } = req.body;
			let result = await user_model.m_UserLeave(id);
			if (result.affectedRows == 0) {
				res.status(400);
				res.json({
					result: false,
					error_message: 'id가 일치하지 않습니다.',
				});
				return;
			} else {
				res.status(200);
				res.session.destroy();
				res.json(result);
			}
		}
	},
};

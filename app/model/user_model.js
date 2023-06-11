const user_db = require('./db/user_db');

module.exports = {
	async m_UserJoin(id, password, phone) {
		let query =
			'insert into user set user_id = ? , user_password = ? , user_phone = ? ';
		return await user_db.ReadDB(query, [id, password, phone]);
	},

	async m_UserSearch(id) {
		let query =
			'select user_id, user_password, user_phone from user where user_id = ?';
		return await user_db.ReadDB(query, [id]);
	},

	async m_UserPasswordUpdate(password, new_password) {
		let query = 'update user set user_password = ? where user_password = ?';
		return await user_db.ReadDB(query, [new_password, password]);
	},
	async m_UserPhoneUpdate(phone, new_phone) {
		let query = 'update user set user_phone = ? where user_phone = ?';
		return await user_db.ReadDB(query, [new_phone, phone]);
	},

	async m_UserLeave(id) {
		let query = 'delete from user where user_id = ?';
		return await user_db.ReadDB(query, [id]);
	},
};

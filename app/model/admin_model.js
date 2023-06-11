const user_db = require('./db/user_db');

module.exports = {
	async m_UserJoin(id, password, phone) {
		let query =
			'insert into admin set admin_id = ? , admin_password = ? , admin_phone = ? ';
		return await user_db.ReadDB(query, [id, password, phone]);
	},
	async m_AdminSearch(id) {
		let query = 'select * from admin where admin_id = ?';
		return await user_db.ReadDB(query, [id]);
	},
	async m_UserKick(id) {
		let query = 'delete from user where user_id = ?';
		return await user_db.ReadDB(query, [id]);
	},
	async m_AdminScheduleCheck() {
		let query = 'select * from seat where st_state = ?';
		return await user_db.ReadDB(query, ['scheduled']);
	},
	async m_AdminAddSeat() {
		let query =
			'insert into seat set st_state = ? , st_checkin_time = ? , st_time_to_use = ? ';
		return await user_db.ReadDB(query, ['empty', null, null]);
	},
};

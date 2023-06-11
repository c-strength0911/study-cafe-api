const user_db = require('./db/user_db');

module.exports = {
	async m_ReserveSeatCheck(seat, date) {
		let checkQuery =
			'select * from reservation where st_idx = ? and rs_date = ?';
		return await user_db.ReadDB(checkQuery, [seat, date]);
	},

	async m_ReserveCheck(phone, date, time, seat, code) {
		let getUserIdQuery = 'select user_idx from user where user_phone = ?';
		let [user] = await user_db.ReadDB(getUserIdQuery, [phone]);
		let seatQuery =
			'update seat set st_state = ?, st_checkin_time = ?, st_time_to_use = ? where st_idx = ?';
		await user_db.ReadDB(seatQuery, ['scheduled', date, time, seat]);
		let query =
			'insert into reservation set user_idx = ? , rs_date = ? , st_idx = ? , rs_code = ?';
		return await user_db.ReadDB(query, [user[0].user_idx, date, seat, code]);
	},
};

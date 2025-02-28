const UserModel = {
	initializeTable: async (db) => {
		const sql = `
      CREATE TABLE IF NOT EXISTS user_crud_list (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        date_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        request_count INT DEFAULT 0
      )`;
		try {
			await db.query(sql);
			console.log("user_crud_list table is ready");
		} catch (err) {
			console.error("Error creating table:", err);
		}
	},

	createUser: async (db, title, description) => {
		const sql = `INSERT INTO user_crud_list (title, description) VALUES (?, ?)`;
		try {
			const [result] = await db.query(sql, [title, description]);

			if (result.affectedRows === 1) {
				const [rows] = await db.query(
					`SELECT * FROM user_crud_list WHERE id = ?`,
					[result.insertId]
				);
				return rows[0];
			} else {
				throw new Error("Failed to insert user");
			}
		} catch (err) {
			console.error("Error creating user:", err);
			throw err;
		}
	},

	getAllUsers: async (db) => {
		const sql = `SELECT * FROM user_crud_list`;
		try {
			const [rows] = await db.query(sql);
			return rows;
		} catch (err) {
			console.error("Error fetching users:", err);
			throw err;
		}
	},

	updateUser: async (db, id, title, description) => {
		const sql = `UPDATE user_crud_list SET title = ?, description = ?, date_updated = NOW() WHERE id = ?`;
		try {
			const [result] = await db.query(sql, [title, description, id]);
			return result;
		} catch (err) {
			console.error("Error updating user:", err);
			throw err;
		}
	},

	deleteUser: async (db, id) => {
		const sql = `DELETE FROM user_crud_list WHERE id = ?`;
		try {
			const [result] = await db.query(sql, [id]);
			return result;
		} catch (err) {
			console.error("Error deleting user:", err);
			throw err;
		}
	},
};

module.exports = UserModel;

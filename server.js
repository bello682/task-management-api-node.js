const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();
const UserModel = require("./models/userModel");

const app = express();

const userRoute = require("./routers/userRoute");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const db = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

app.use((req, res, next) => {
	req.db = db;
	next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		credentials: true,
		origin: function (origin, callback) {
			const allowedOrigins = ["*", "http://localhost:3000"];
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
	})
);

app.use("/api/task_management", userRoute);

app.use(notFound);
app.use(errorHandler);

(async () => {
	try {
		const connection = await db.getConnection();
		console.log("Connected to MySQL database successfully");
		connection.release();

		await UserModel.initializeTable(db);

		const PORT = process.env.PORT || 5000;
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (err) {
		console.error("Error connecting to MySQL:", err);
		process.exit(1);
	}
})();

const HttpError = require("../models/errorModel");
const Users = require("../models/userModel");

const CreateUserTask = async (req, res, next) => {
	try {
		const { title, description } = req.body;

		if (!title || !description) {
			return next(new HttpError("Title and description are required", 400));
		}

		const newUser = await Users.createUser(req.db, title, description);
		res.status(201).json(newUser);
	} catch (error) {
		next(new HttpError("Error creating task", 500));
	}
};

const UpdateUserTask = async (req, res, next) => {
	try {
		const userId = req.params.id;
		const { title, description } = req.body;

		if (!title || !description) {
			return next(new HttpError("Title and description are required", 400));
		}

		const updatedResult = await Users.updateUser(
			req.db,
			userId,
			title,
			description
		);

		if (updatedResult.affectedRows === 0) {
			return next(new HttpError("Task not found or no changes made", 404));
		}

		const updatedUser = await Users.getUserById(req.db, userId);

		res.status(200).json({ message: "Task updated successfully", updatedUser });
	} catch (error) {
		next(new HttpError("Error editing task", 500));
	}
};

const DeleteUserTask = async (req, res, next) => {
	try {
		const id = req.params.id;

		const userToDelete = await Users.getUserById(req.db, id);

		if (!userToDelete) {
			return next(new HttpError("Task not found", 404));
		}

		const deletedUserResult = await Users.deleteUser(req.db, id);

		if (deletedUserResult.affectedRows === 0) {
			return next(new HttpError("Error deleting task", 500));
		}

		res.status(200).json({
			message: "This task has been deleted successfully",
			deletedUser: userToDelete,
		});
	} catch (error) {
		console.error("Error deleting task:", error);
		next(new HttpError("Error deleting task", 500));
	}
};

const FetchUserTask = async (req, res, next) => {
	try {
		const allUsersTask = await Users.getAllUsers(req.db);
		res.status(200).json(allUsersTask);
	} catch (error) {
		next(new HttpError("Error fetching all user task", 500));
	}
};

module.exports = {
	DeleteUserTask,
	UpdateUserTask,
	CreateUserTask,
	FetchUserTask,
};

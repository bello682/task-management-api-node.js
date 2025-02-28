const { Router } = require("express");
const {
	DeleteUserTask,
	UpdateUserTask,
	CreateUserTask,
	FetchUserTask,
} = require("../controllers/userController");

const router = Router();

router.post("/create-user-task", CreateUserTask);
router.put("/update-user-task/:id", UpdateUserTask);
router.delete("/delete-user-task/:id", DeleteUserTask);
router.get("/fetch-user-task", FetchUserTask);

module.exports = router;

const express = require('express');
const { updateUser, deleteUser, getUser, getUsers, createUser } = require("../controllers/userController");

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.post('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;


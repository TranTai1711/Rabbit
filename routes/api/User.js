const express = require('express');
const userController = require('../../controllers/UserController');

// const mq = require('../../controllers/rabbitmq')

const router = express.Router();

router.get('/', userController.getUser);

router.post('/add', userController.addUser);

router.delete('/delete/:id', userController.deleteUser);

router.put('/edit/:id', userController.editUser);

router.post('/login', userController.loginUser);

// mq.consume('user','created','created_user', (msg) => {
//     console.log(msg);
// })

module.exports = router;
const express = require('express');
const { register, list, update, destroy } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

router.post('/register', register);
router.get('/list', authenticateToken, list);
router.put('/update/:id', authenticateToken, update);
router.delete('/delete/:id', authenticateToken, destroy);

module.exports = router;
const express = require('express');
const { register, list, update, destroy } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

router.post('/register', register);
router.get('/list', authenticateToken("user"), list);
router.put('/update/:id', authenticateToken("user"), update);
router.delete('/delete/:id', authenticateToken("user"), destroy);

module.exports = router;
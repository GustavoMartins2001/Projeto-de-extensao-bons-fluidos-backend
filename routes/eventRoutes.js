const express = require('express');
const { create, getById, list, destroy, update } = require('../controllers/eventController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

router.post('/create', authenticateToken("user"), create);
router.get('/getById', authenticateToken("user"), getById);
router.get('/list', authenticateToken("user"), list);
router.delete('/delete/:id', authenticateToken("user"), destroy);
router.put('/update/:id', authenticateToken("user"), update);

module.exports = router;
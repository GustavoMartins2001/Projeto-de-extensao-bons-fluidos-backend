const express = require('express');
const { create, list, destroy, update } = require('../controllers/eventController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

router.post('/create', authenticateToken, create);
router.get('/list', authenticateToken, list);
router.delete('/delete/:id', authenticateToken, destroy);
router.put('/update/:id', authenticateToken, update);

module.exports = router;
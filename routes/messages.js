const router = require('express').Router();
const getMessages = require('../controllers/getMessages');
const addMessages = require('../controllers/addMessages');

router.post('/add', addMessages);
router.get('/get', getMessages);

module.exports = router;
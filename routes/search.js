
const router = require('express').Router();
//Controllers
const { search } = require('../controllers/Search');

router.get('/:collection/:search', search);



module.exports = router;
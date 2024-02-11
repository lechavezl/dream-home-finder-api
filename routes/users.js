const express = require('express');
const router = express.Router();

const propertiesController = require('../controllers/users');
// const validation = require('../middleware/validate');
// const { } = require('../middleware/authenticate');

router.get('/', propertiesController.getAll);
router.get('/:id', propertiesController.getSingle);

router.post('/', propertiesController.createUser);

router.put('/:id', propertiesController.updateUser);

router.delete('/:id', propertiesController.deleteUser);
module.exports = router;
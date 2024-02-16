const express = require('express');
const router = express.Router();

const propertiesController = require('../controllers/users');
const { isAuthenticated } = require('../utilities/authenticate');


router.get('/', propertiesController.getAll);
router.get('/:id', propertiesController.getSingle);

router.post('/', isAuthenticated,propertiesController.createUser);

router.put('/:id', isAuthenticated,propertiesController.updateUser);

router.delete('/:id', isAuthenticated,propertiesController.deleteUser);
module.exports = router;
const express = require('express');
const router = express.Router();
const validateUsers = require("../utilities/users-validation");
const propertiesController = require('../controllers/users');
const { isAuthenticated } = require('../utilities/authenticate');

// const validation = require('../middleware/validate');
// const { } = require('../middleware/authenticate');

router.get('/', propertiesController.getAll);
router.get('/:id', propertiesController.getSingle);

router.post('/',
    isAuthenticated,
    validateUsers.usersRules(),
    validateUsers.checkUserData,
    propertiesController.createUser
);

router.put('/:id',
    isAuthenticated,
    validateUsers.usersRules(),
    validateUsers.checkUserData,
    propertiesController.updateUser
);

router.delete('/:id', isAuthenticated, propertiesController.deleteUser);
module.exports = router;
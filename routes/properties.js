const express = require('express');
const router = express.Router();
const validateProperties = require("../utilities/properties-validation");
const propertiesController = require('../controllers/properties');
const { isAuthenticated } = require('../utilities/authenticate');

// const validation = require('../middleware/validate');
// const { } = require('../middleware/authenticate');

router.get('/', propertiesController.getAll);
router.get('/:id', propertiesController.getSingle);

router.post('/',
    isAuthenticated,
    validateProperties.propertiesRules(),
    validateProperties.checkPropertyData,
    propertiesController.createProperty
);

router.put('/:id',
    isAuthenticated,
    validateProperties.propertiesRules(),
    validateProperties.checkPropertyData,
    propertiesController.updateProperty
);

router.delete('/:id', isAuthenticated, propertiesController.deleteProperty);
module.exports = router;
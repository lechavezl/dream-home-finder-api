const express = require('express');
const router = express.Router();
const validateRealtors = require("../utilities/realtors-validation");
const propertiesController = require('../controllers/realtor');
const { isAuthenticated } = require('../utilities/authenticate');

// const validation = require('../middleware/validate');
// const { } = require('../middleware/authenticate');

router.get('/', propertiesController.getAll);
router.get('/:id', propertiesController.getSingle);

router.post('/',
    isAuthenticated,
    validateRealtors.realtorsRules(),
    validateRealtors.checkRealtorData,
    propertiesController.createRealtor
);

router.put('/:id',
    isAuthenticated,
    validateRealtors.realtorsRules(),
    validateRealtors.checkRealtorData,
    propertiesController.updateRealtor
);

router.delete('/:id', isAuthenticated, propertiesController.deleteRealtor);
module.exports = router;
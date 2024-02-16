const express = require('express');
const router = express.Router();

const propertiesController = require('../controllers/properties');
const { isAuthenticated } = require('../utilities/authenticate');


router.get('/', propertiesController.getAll);
router.get('/:id', propertiesController.getSingle);

router.post('/', isAuthenticated,propertiesController.createProperty);

router.put('/:id', isAuthenticated,propertiesController.updateProperty);

router.delete('/:id', isAuthenticated,propertiesController.deleteProperty);
module.exports = router;
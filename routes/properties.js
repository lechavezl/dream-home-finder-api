const express = require('express');
const router = express.Router();

const propertiesController = require('../controllers/properties');
// const validation = require('../middleware/validate');
// const { } = require('../middleware/authenticate');

router.get('/', propertiesController.getAll);
router.get('/:id', propertiesController.getSingle);

router.post('/', propertiesController.createProperty);

router.put('/:id', propertiesController.updateProperty);

router.delete('/:id', propertiesController.deleteProperty);
module.exports = router;
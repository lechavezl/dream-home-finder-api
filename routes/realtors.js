const express = require('express');
const router = express.Router();

const propertiesController = require('../controllers/realtor');
// const validation = require('../middleware/validate');
// const { } = require('../middleware/authenticate');

router.get('/', propertiesController.getAll);
router.get('/:id', propertiesController.getSingle);

router.post('/', propertiesController.createRealtor);

router.put('/:id', propertiesController.updateRealtor);

router.delete('/:id', propertiesController.deleteRealtor);
module.exports = router;
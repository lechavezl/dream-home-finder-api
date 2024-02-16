const express = require('express');
const router = express.Router();

const propertiesController = require('../controllers/realtor');
const { isAuthenticated } = require('../utilities/authenticate');


router.get('/', propertiesController.getAll);
router.get('/:id', propertiesController.getSingle);

router.post('/', isAuthenticated,propertiesController.createRealtor);

router.put('/:id', isAuthenticated,propertiesController.updateRealtor);

router.delete('/:id', isAuthenticated,propertiesController.deleteRealtor);
module.exports = router;
const express = require('express');
const router = express.Router();

const propertiesController = require('../controllers/favorites');
// const validation = require('../middleware/validate');
// const { } = require('../middleware/authenticate');

router.get('/', propertiesController.getAll);
router.get('/:id', propertiesController.getSingle);

router.post('/', propertiesController.createFavorite);

router.put('/:id', propertiesController.updateFavorite);

router.delete('/:id', propertiesController.deleteFavorite);
module.exports = router;
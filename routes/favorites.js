const express = require('express');
const router = express.Router();
const propertiesController = require('../controllers/favorites');
const { isAuthenticated } = require('../utilities/authenticate');

// const validation = require('../middleware/validate');
// const { } = require('../middleware/authenticate');

router.get('/', propertiesController.getAll);
router.get('/:id', propertiesController.getSingle);

router.post('/', isAuthenticated, propertiesController.createFavorite);

router.put('/:id', isAuthenticated, propertiesController.updateFavorite);

router.delete('/:id', isAuthenticated, propertiesController.deleteFavorite);
module.exports = router;
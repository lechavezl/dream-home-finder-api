const router = require('express').Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger-output.json");
const utilities = require("../utilities/index");
const passport = require('passport');

//Properties Route
router.use('/properties', require('./properties'))
//Realtor Route
router.use('/realtors', require('./realtors'))
//User Route
router.use('/users', require('./users'))
//Favorites Route
router.use('/favorites', require('./favorites'))

// Swagger routes
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

// Main route response
// router.get("/", (req, res) => {
//     //#swagger.tags=["Dream Home Finder API"]
//     res.send("Dream Home Finder API");
// });

// Authentication (OAuth) route (log in / logout)
router.get("/login", passport.authenticate("github"), (req, res) => {
    //#swagger.tags=["OAuth"]
});

router.get("/logout", function(req, res, next) {
    //#swagger.tags=["OAuth"]
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect("/");
    })
});

module.exports = router;
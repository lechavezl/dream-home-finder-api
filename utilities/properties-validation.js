const { body, validationResult } = require("express-validator");
const mongodb = require("../db/database");
const propertiesController = require("../controllers/properties");

/*  **********************************
 *  Create Properties Validation Rules
 * ********************************* */

const propertiesRules = () => {
    return [
        body("title")
            .trim()
            .notEmpty().withMessage("Title is required.")
            .isString().withMessage("Title must be a string."),
        
        body("description")
            .trim()
            .notEmpty().withMessage("Description is required.")
            .isString().withMessage("Description must be a string."),

        body("price")
            .notEmpty().withMessage("Price is required.")
            .isNumeric().withMessage("Price must be a numeric value."),

        body("location")
            .trim()
            .notEmpty().withMessage("Location is required.")
            .isString().withMessage("Location must be a string."),

        body("bedrooms")
            .notEmpty().withMessage("Bedrooms is required.")
            .isInt({ min: 0 }).withMessage("Bedrooms must be a positive integer."),

        body("bathrooms")
            .notEmpty().withMessage("Bathrooms is required.")
            .isInt({ min: 0 }).withMessage("Bathrooms must be a positive integer."),

        body("status")
            .notEmpty().withMessage("Status is required.")
            .isString().withMessage("Status must be a string."),

        body("realtorId")
            .notEmpty().withMessage("Realtor ID is required.")
            .isString().withMessage("Realtor ID must be a string.")
    ]
};

/*  **********************************
 *  Check if there are errors or continue
 *  Creating or updating the new property
 * ********************************* */
const checkPropertyData = (req, res, next) => {
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
        return next()
    };

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))

    // return res.send(errors.array())
    return res.status(422).json({ errors: extractedErrors });
};

module.exports = { propertiesRules, checkPropertyData }
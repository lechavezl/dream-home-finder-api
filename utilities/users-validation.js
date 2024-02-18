const { body, validationResult } = require("express-validator");
const mongodb = require("../db/database");
const realtorsController = require("../controllers/users");

/*  **********************************
 *  Create Properties Validation Rules
 * ********************************* */
const usersRules = () => {
    return [
        body("name")
            .trim()
            .notEmpty().withMessage("Name is required.")
            .isString().withMessage("Name must be a string."),
        
        body("lastname")
            .trim()
            .notEmpty().withMessage("Last name is required.")
            .isString().withMessage("Last name must be a string."),

        body("email")
            .trim()
            .notEmpty().withMessage("Email is required.")
            .isEmail().withMessage("Invalid email format.")
    ]
};

/*  **********************************
 *  Check if there are errors or continue
 *  Creating or updating the realtor account
 * ********************************* */
const checkUserData = (req, res, next) => {
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
        return next()
    };

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))

    // return res.send(errors.array())
    return res.status(422).json({ errors: extractedErrors });
};

module.exports = { usersRules, checkUserData }
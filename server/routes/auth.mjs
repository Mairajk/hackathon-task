import express from 'express';
import { check } from 'express-validator'

/** Import Controllers */

import AuthController from '../controllers/AuthController.mjs';

/**  ---------------  */

const router = express.Router();

/** ----------------------------> Signup route start <------------------------------ */
router.post("/api/v1/signup",

    [
        check(fullName).notEmpty().withMessage({
            message: 'Full Name is required ! '
        }),
        check(phoneNumber).notEmpty().withMessage({
            message: 'Phone Number is required ! '
        }),
        check(email).notEmpty().withMessage({
            message: 'Email is required ! '
        }).isEmail.withMessage({
            message: 'Please enter valid email'
        }),
        check(password).notEmpty().withMessage({
            message: 'Password is required ! '
        }),

    ],

    AuthController.signup

);
/** ----------------------------> Login end <------------------------------------- */


/** ----------------------------> Login route start <------------------------------ */
router.post("/api/v1/login",
    [
        check(password).notEmpty().withMessage({
            message: 'Password is required ! '
        }),
        check(email).notEmpty().withMessage({
            message: 'Email is required ! '
        }).isEmail.withMessage({
            message: 'Please enter valid email'
        }),
    ],

    AuthController.login

);
/** ----------------------------> Login end <------------------------------------- */


export default router;
import express from 'express';
import { check } from 'express-validator'

/** Import Controllers */

/**  ---------------  */

const router = express.Router();


/** ----------------------------> Product route start <------------------------------ */

/** Get all products */
router.get('/product', ProductController.list)
/**------------------ */
import bookingController from "../controllers/bookingController";
import { check } from "express-validator";

import express from "express";
import authenticate from "../middleware/authenticate";

const router = express.Router();

router.use(authenticate);

router.post(
    '/create',
    [
        check('movie').not().isEmpty(),
        check('image').not().isEmpty(),
        check('summary').not().isEmpty(),
        check('year').not().isEmpty(),
    ],
    bookingController.book
);

router.get(
    '/search',
    bookingController.search
);

router.get(
    '/getTickets',
    bookingController.get
);


export default router;
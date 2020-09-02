import express from "express";
import { check } from "express-validator";
import usersController from "../controllers/usersController";

const router = express.Router();

router.post(
    "/signup",
    [
        check("name").not().isEmpty(),
        check("email")
            .normalizeEmail() // This@test.com => this@test.com
            .isEmail(),
        check("password").not().isEmpty(),
        // check("password").isLength({ min: 6 }), // to validate password length
    ],
    usersController.signup
);

router.post('/login', usersController.login);

export default router;

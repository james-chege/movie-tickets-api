import { User } from "../../database/models";
import { validationResult } from "express-validator";
import HttpError from "../utils/http-error";
import bcrypt from "bcrypt";
import { generateAuthToken } from "../utils";

export default {
    signup: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(
                new HttpError(
                    "Invalid inputs passed, please check your data.",
                    422
                )
            );
        }

        try {
            let password;
            try {
                password = await bcrypt.hash(req.body.password, 12);
            } catch (err) {
                const error = new HttpError(
                    "Could not create user. Please try again.",
                    500
                );
                return next(error);
            }

            const { email } = req.body;
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser){
                return res.status(409).json({ message: "user exists" });
            }
            const user = await User.create({
                ...req.body,
                password,
            });
            // extra feature (send email)
            // sendConfirmationEmail(user);
            return res.json({ user, message: "User created successfully." });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    login: async (req, res, next) => {
        const { email, password } = req.body;

        let existingUser;

        try {
            existingUser = await User.findOne({ where: { email } });
        } catch (err) {
            const error = new HttpError(
                'Logging in failed, please try again later.',
                500
            );
            return next(error);
        }

        if (!existingUser) {
            const error = new HttpError(
                'Invalid credentials, could not log you in.',
                403
            );
            return next(error);
        }

        let isValidPassword = false;
        try {
            isValidPassword = await bcrypt.compare(password, existingUser.password);
        } catch (err) {
            const error = new HttpError(
                'Unable to log you in. Please check you credentials and try again.',
                500
            );

            return next(error);
        }

        if (!isValidPassword) {
            const error = new HttpError(
                'Invalid credentials, could not log you in.',
                401
            );
            return next(error);
        }

        let token;
        try {
            token = await generateAuthToken({ userId: existingUser.id, email: existingUser.email });
        } catch (err) {
            const error = new HttpError('Logging in failed, please try again.', 500);
            return next(error);
        }
        console.log(existingUser.id)
        res.json({ userId: existingUser.id, email: existingUser.email, token });
    }
};

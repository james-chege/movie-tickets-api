import { Ticket, User } from "../../database/models";
import { validationResult } from "express-validator";
import axios from "axios";

import HttpError from "../utils/http-error";

export default {
    book: async (req, res, next) => {
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
            const ticket = await Ticket.create({
                ...req.body,
                userId: req.userData.userId,
            });

            return res.json({
                ticket,
                message: "Ticket created successfully.",
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    search: async (req, res, next) => {
        const url = `${process.env.OMDB_URL}/?s=${req.query.q}&apikey=${process.env.API_KEY}`;
        await axios
            .get(url)
            .then((result) => {
                return res.json({ result: result.data });
            })
            .catch((error) => {
                return res.status(500).json({ error: error.message });
            });
    },
    get: async (req, res, next) => {
        try {
            const tickets = await Ticket.findAll({
                where: { userId: req.userData.userId },
                include: [
                    {
                        model: User,
                        as: "owner",
                    },
                ],
            });
            return res.json({ tickets });
        } catch (err) {
            console.log(err.message)
            const error = new HttpError(
                "Could not get tickets, please try again later.",
                500
            );
            return next(error);
        }
    },
};

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import users from './routes/users';
import tickets from './routes/tickets';
import HttpError from './utils/http-error';

dotenv.config()
const app = express()
app.use(bodyParser.json())

app.use('/api/users', users);
app.use('/api/tickets', tickets);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error, req, res, next) => {
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});

app.listen(8080, () => console.log('Running on localhost:8080'))

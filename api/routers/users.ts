import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import {OAuth2Client} from 'google-auth-library';
import config from '../config';
import crypto from 'crypto';

const usersRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

usersRouter.post('/', async (req, res, next) => {
    try {
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            displayName: req.body.displayName
        });

        user.generateToken();
        await user.save();
        return res.send({message: 'Registered successfully!', user});
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

usersRouter.post('/sessions', async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if (!user) {
            return res.status(400).send({error: 'Email or password incorrect'});
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            return res.status(400).send({error: 'Email or password incorrect'});
        }

        user.generateToken();
        await user.save();

        return res.send({message: 'Email and password correct!', user});
    } catch (e) {
        return next(e);
    }
});

usersRouter.post('/google', async (req, res, next) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: config.google.clientId,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            return res.status(400).send({error: 'Wrong Google token!'});
        }

        const email = payload['email'];
        const googleId = payload['sub'];
        const displayName = payload['name'];

        if (!email) {
            return res
                .status(400)
                .send({error: 'Not enough user data to continue'});
        }

        let user = await User.findOne({googleId});

        if (!user) {
            user = new User({
                email,
                password: crypto.randomUUID(),
                googleId,
                displayName,
            });
        }

        user.generateToken();

        await user.save();

        return res.send({message: 'Login with Google successful!', user});
    } catch (e) {
        return next(e);
    }
});


usersRouter.delete('/sessions', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const success = {message: 'Deleted!'};

        if (!token) {
            return res.send(success);
        }

        const user = await User.findOne({token});

        if (!user) {
            return res.send({message: 'Not found this user!'});
        }

        user.generateToken();
        await user.save();
        return res.send(success);
    } catch (e) {
        return next(e);
    }
});

export default usersRouter;

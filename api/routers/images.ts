import express from "express";
import mongoose from "mongoose";
import Image from "../models/Image";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import {ImageWithId} from "../types";

const imagesRouter = express.Router();


imagesRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;

        await Image.create({
            user: user._id,
            title: req.body.title,
            image: req.file && req.file.filename,
        });

        return res.send({message: 'Created image!'});
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            return next(e)
        }
    }
});

imagesRouter.get('/', async (req, res, next) => {
    try {
        let images: ImageWithId[] | null;

        if (req.query.user) {
            images = await Image.find({user: req.query.user}).populate('user', 'displayName _id');
        } else {
            images = await Image.find().populate('user', 'displayName _id');
        }
        if (!images) {
            return res.status(404).send({message: 'Not found'});
        }
        return res.send(images);
    } catch (e) {
        return next(e);
    }
});

imagesRouter.get('/:id', async (req, res, next) => {
    try {
        const image = await Image.findById(req.params.id);

        if (!image) {
            return res.status(404).send({message: 'Not found'});
        }
        return res.send(image);
    } catch (e) {
        next(e);
    }
});

imagesRouter.delete('/:id', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;

        const image: ImageWithId | null = await Image.findById(req.params.id);

        if (!image) {
            return res.status(404).send({message: 'Not found image!'});
        }

        if (user.role === 'admin' || user._id.toString() === image.user._id.toString()) {
            await Image.deleteOne({_id: req.params.id});
            return res.send({message: 'Deleted image!'});
        }

        return res.send({message: 'You cannot delete!'});
    } catch (e) {
        next(e);
    }
});

export default imagesRouter;
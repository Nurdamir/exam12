import mongoose from 'mongoose';
import crypto from "crypto";
import config from './config';
import User from "./models/User";
import Image from "./models/Image";

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.db);
    const db = mongoose.connection;
    try {
        await db.dropCollection('images');
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }
    const [user, girl] = await User.create({
        email: 'user@gmail.com',
        password: '1',
        role: 'user',
        displayName: 'UserBro',
        token: crypto.randomUUID(),
    }, {
        email: 'admin@gmail.com',
        password: '1',
        role: 'admin',
        displayName: 'AdminSister',
        token: crypto.randomUUID()
    });

    await Image.create({
        user: user,
        title: 'Flag',
        image: 'fixtures/flag.jpeg',
    }, {
        user: user,
        title: 'Nature',
        image: 'fixtures/nature.jpeg',
    }, {
        user: user,
        title: 'Lake',
        image: 'fixtures/lake.jpeg',
    }, {
        user: girl,
        title: 'Mountains',
        image: 'fixtures/mountain.jpeg',
    }, {
        user: girl,
        title: 'Sary-Chelek',
        image: 'fixtures/south.jpeg',
    })

    await db.close();
};
void run();
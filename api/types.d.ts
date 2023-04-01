import {Types} from "mongoose";

export interface IUser {
    email: string;
    password: string;
    token: string;
    role: string;
    displayName: string;
    googleId?: string;
}

export interface UserAuthor {
    _id: Types.ObjectId;
    displayName: string;
}

export interface ImageWithId {
    _id: Types.ObjectId;
    user: UserAuthor;
    title: string;
    image: string;
}
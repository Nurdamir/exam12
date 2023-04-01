import {Types} from "mongoose";

export interface IUser {
    email: string;
    password: string;
    token: string;
    role: string;
    displayName: string;
    googleId?: string;
}

export interface ImageWithId {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    title: string;
    image: string;
}
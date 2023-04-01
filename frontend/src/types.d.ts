export interface RegisterMutation {
    email: string;
    password: string;
    displayName: string;
}

export interface User {
    _id: string;
    username: string;
    token: string;
    displayName: string;
    role: string;
}

export interface RegisterResponse {
    message: string;
    user: User;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _name: string;
}

export interface LoginMutation {
    email: string;
    password: string;
}

export interface GlobalError {
    error: string;
}

export interface ImageMutation {
    title: string;
    image: string;
}

export interface Image {
    _id: string;
    user: string;
    title: string;
    image: string;
}


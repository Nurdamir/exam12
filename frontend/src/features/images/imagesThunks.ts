import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {Image, ImageMutation, ValidationError} from "../../types";
import {isAxiosError} from "axios";

export const fetchImages = createAsyncThunk<Image[], string | undefined>(
    'images/fetchAll',
    async (id) => {
        let url = '/images';

        if (id !== undefined) {
            url = `/images?user=${id}`;
        }
        const response = await axiosApi.get(url);
        return response.data;
    }
);

export const createImage = createAsyncThunk<void, ImageMutation, { rejectValue: ValidationError }>(
    'images/create',
    async (imageMutation, {rejectWithValue}) => {
        try {
            const formData = new FormData();

            const keys = Object.keys(imageMutation) as (keyof ImageMutation)[];

            keys.forEach(key => {
                const value = imageMutation[key];

                if (value !== null) {
                    formData.append(key, value);
                }
            });
            await axiosApi.post('/images', formData);
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            throw e;
        }
    }
);

export const removeImage = createAsyncThunk<void, string>(
    'images/delete',
    async (imageId) => {
        await axiosApi.delete('/images/' + imageId);
    }
);
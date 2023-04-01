import {Image, OneImage, ValidationError} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {createImage, fetchImages, fetchOneImage, removeImage} from "./imagesThunks";

interface ImagesState {
    images: Image[] | null;
    oneImage: OneImage | null;
    fetchLoading: boolean;
    fetchOne: boolean;
    createError: ValidationError | null;
    createLoading: boolean;
    deleteLoading: boolean | string;
}

const initialState: ImagesState = {
    images: null,
    oneImage: null,
    fetchLoading: false,
    fetchOne: false,
    createError: null,
    createLoading: false,
    deleteLoading: false,
};

export const imagesSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchImages.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchImages.fulfilled, (state, {payload: images}) => {
            state.fetchLoading = false;
            state.images = images;
        });
        builder.addCase(fetchImages.rejected, (state) => {
            state.fetchLoading = false;
        });

        builder.addCase(createImage.pending, (state) => {
            state.createLoading = true;
            state.createError = null;
        });
        builder.addCase(createImage.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createImage.rejected, (state, {payload: error}) => {
            state.createLoading = false;
            state.createError = error || null;
        });

        builder.addCase(removeImage.pending, (state, {meta: {arg: id}}) => {
            state.deleteLoading = id;
        });
        builder.addCase(removeImage.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(removeImage.rejected, (state) => {
            state.deleteLoading = false;
        });

        builder.addCase(fetchOneImage.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchOneImage.fulfilled, (state, {payload: oneImage}) => {
            state.fetchLoading = false;
            state.oneImage = oneImage;
        });
        builder.addCase(fetchOneImage.rejected, (state) => {
            state.fetchLoading = false;
        });
    }
});

export const imagesReducer = imagesSlice.reducer;

export const selectImages = (state: RootState) => state.images.images;
export const selectOneImage = (state: RootState) => state.images.oneImage;
export const selectCreateError = (state: RootState) => state.images.createError;
export const selectImagesFetching = (state: RootState) => state.images.fetchLoading;
export const selectOneFetching = (state: RootState) => state.images.fetchOne;
export const selectImageCreating = (state: RootState) => state.images.createLoading;
export const selectImageDeleting = (state: RootState) => state.images.deleteLoading;




import React, {useState} from 'react';
import {Grid, TextField} from '@mui/material';
import FileInput from "../../../components/UI/FileInput/FileInput";
import ButtonWithProgress from "../../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {useAppSelector} from "../../../app/hooks";
import {selectCreateError, selectImageCreating} from "../imagesSlice";
import {ImageMutation} from "../../../types";

interface Props {
    onSubmit: (mutation: ImageMutation) => void;
}

const ImageForm: React.FC<Props> = ({ onSubmit }) => {
    const createLoading = useAppSelector(selectImageCreating);
    const error = useAppSelector(selectCreateError);

    const [state, setState] = useState<ImageMutation>({
        title: '',
        image: null
    });

    const submitFormHandler = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(state);
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState) => {
            return { ...prevState, [name]: value };
        });
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: files && files[0],
        }));
    };

    const getFieldError = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <form autoComplete="off" onSubmit={submitFormHandler}>
            <Grid container direction="column" spacing={2}>
                <Grid item xs>
                    <TextField
                        multiline
                        id="title"
                        label="Title"
                        value={state.title}
                        onChange={inputChangeHandler}
                        name="title"
                        required
                        error={Boolean(getFieldError('title'))}
                        helperText={getFieldError('title')}
                    />
                </Grid>

                <Grid item xs>
                    <FileInput label="Image" onChange={fileInputChangeHandler} name="image" type="image/*" />
                </Grid>

                <Grid item xs>
                    <ButtonWithProgress
                        type="submit"
                        variant="contained"
                        color="primary"
                        loading={createLoading}
                        disabled={createLoading}
                    >
                        Create
                    </ButtonWithProgress>
                </Grid>
            </Grid>
        </form>
    );
};

export default ImageForm;

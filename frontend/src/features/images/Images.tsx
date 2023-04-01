import {Button, Grid, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import React, {useEffect} from 'react';
import Preloader from "../../components/UI/Preloader/Preloader";
import {selectUser} from "../users/usersSlice";
import {Link} from "react-router-dom";
import {fetchImages, removeImage} from "./imagesThunks";
import {selectImages, selectImagesFetching} from "./imagesSlice";
import ImageItem from "./components/ImageItem";

interface Props {
    authorId?: string;
}

const Images: React.FC<Props> = ({authorId}) => {
    const dispatch = useAppDispatch();
    const images = useAppSelector(selectImages);
    const loading = useAppSelector(selectImagesFetching);
    const user = useAppSelector(selectUser);

    useEffect(() => {
        if(authorId) {
            dispatch(fetchImages(authorId));
        } else {
            dispatch(fetchImages());
        }
    }, [dispatch, authorId]);

    const onRemove = async (id: string) => {
        await dispatch(removeImage(id));
        await dispatch(fetchImages());
    };

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item container justifyContent="space-between" alignItems="center">
                {!images.length && (<Grid item>
                    <Typography variant="h4">
                        No Images!
                    </Typography>
                </Grid>)}
                <Grid item>
                    {authorId === user?._id && (
                        <Button color="primary" component={Link} to="/images/add">
                            Add image
                        </Button>
                    )}
                </Grid>
            </Grid>

            <Grid item container direction="row" spacing={1}>
                {loading ? (
                    <Preloader loading={loading}/>
                ) : images.map(image => (
                    <ImageItem
                        key={image._id}
                        title={image.title}
                        image={image.image}
                        id={image.user._id}
                        name={image.user.displayName}
                        onRemove={() => onRemove(image._id)}
                    />
                ))}
            </Grid>
        </Grid>
    );
}

export default Images;
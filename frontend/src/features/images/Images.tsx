import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {Button, Grid, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import Preloader from '../../components/UI/Preloader/Preloader';
import {selectUser} from '../users/usersSlice';
import {
    fetchImages,
    fetchOneImage,
    removeImage,
} from './imagesThunks';
import {
    selectImages,
    selectImagesFetching,
    selectOneImage,
} from './imagesSlice';
import ImageItem from './components/ImageItem';
import ModalImage from './components/ModalImage';

interface Props {
    authorId?: string;
    authorIdState?: boolean;
}

const Images: React.FC<Props> = ({
                                     authorId,
                                     authorIdState,
                                 }) => {
    const dispatch = useAppDispatch();
    const images = useAppSelector(selectImages);
    const oneImage = useAppSelector(selectOneImage);
    const loading = useAppSelector(selectImagesFetching);
    const user = useAppSelector(selectUser);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (authorId) {
            dispatch(fetchImages(authorId));
        } else {
            dispatch(fetchImages());
        }
    }, [dispatch, authorId]);

    const onRemove = async (id: string) => {
        await dispatch(removeImage(id));
        await dispatch(fetchImages());
    };

    const getPhoto = (id: string) => {
        dispatch(fetchOneImage(id));
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (!authorId) {
        authorIdState = false;
    }

    return (
        <Grid container direction="column" spacing={2}>
            <Grid
                item
                container
                justifyContent="space-between"
                alignItems="center"
            >
                {!images || (images && !images.length) ? (
                    <Grid item>
                        <Typography variant="h5" color="#046dbc">No Images!</Typography>
                    </Grid>
                ) : null}

                {authorId && images && images[0]?.user?.displayName && (
                    <Typography variant="h5" color="#046dbc">
                        {images[0].user.displayName}'s images!
                    </Typography>
                )}
                <Grid item>
                    {authorId && user?._id === authorId && (
                        <Button color="primary" component={Link} to="/images/add">
                            Add image
                        </Button>
                    )}
                </Grid>
            </Grid>

            <Grid item container direction="row" spacing={1}>
                {loading ? (
                    <Preloader loading={loading}/>
                ) : images &&
                    Array.isArray(images) &&
                    images.map((image) => (
                        <ImageItem
                            key={image._id}
                            id={image._id}
                            title={image.title}
                            image={image.image}
                            userAuthorId={image.user._id}
                            name={image.user.displayName}
                            onRemove={() => onRemove(image._id)}
                            authorIdState={authorIdState}
                            onClickOpenModal={() => getPhoto(image._id)}
                        />
                    ))}

                <ModalImage
                    handleClose={handleClose}
                    open={open}
                    image={oneImage}
                />
            </Grid>
        </Grid>
    );
};

export default Images

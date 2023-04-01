import {Button, CardMedia, Fade, Grid, Modal, Paper} from '@mui/material';
import React from 'react';
import {apiURL} from "../../../constants";

interface Photo {
    _id: string
    image: string;
    title: string;
}

interface Props {
    image?: Photo | null;
    handleClose: () => void;
    open: boolean;
}

const styles = {
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        height: '80%',
        width: '60%',
        textAlign: 'center'
    },
    imageModal: {
        width: '100%',
        height: '80%',
    },
};

const ModalImage: React.FC<Props> = ({ image, handleClose, open }) => {
    return (
        <>
            {image && (<Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                sx={styles.modal}
            >
                <Fade in={open}>
                    <Paper sx={styles.paper}>
                        <CardMedia
                            image={`${apiURL}/${image.image}`}
                            title={image.title}
                            sx={styles.imageModal}
                        />
                        <Grid item marginTop={4}>
                            <Button variant="contained" color="primary" onClick={handleClose}>Close</Button>
                        </Grid>
                    </Paper>
                </Fade>
            </Modal>)}
        </>
    );
};

export default ModalImage;

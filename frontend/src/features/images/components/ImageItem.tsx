import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {Button, Card, CardActionArea, Grid, Typography} from '@mui/material';
import styled from '@emotion/styled';
import {apiURL} from "../../../constants";
import {useAppSelector} from "../../../app/hooks";
import {selectUser} from "../../users/usersSlice";

const StyledCard = styled(Card)`
  width: 90%;
  margin: 0 auto;
`;

const StyledImage = styled('img')({
    height: '300px',
    width: '100%',
    borderRadius: '12px',
});

interface PhotoCardProps {
    title: string;
    image: string;
    id: string;
    name: string;
    onRemove: (id: string) => void;
    onClickOpenModal?: () => void;
}

const ImageItem: FC<PhotoCardProps> = ({
                                           title,
                                           image,
                                           id,
                                           name,
                                           onRemove,
                                           onClickOpenModal
                                       }) => {

    const user = useAppSelector(selectUser);


    return (
        <Grid item xs={6} md={4} marginBottom={3}>
            <StyledCard>
                <CardActionArea onClick={onClickOpenModal}>
                    <Grid item>
                        <StyledImage src={apiURL + '/' + image}/>
                    </Grid>
                </CardActionArea>
                <Grid container textAlign="center" flexDirection="column">
                    <Typography component={Link} to={`/users/${id}`}>{title}</Typography>
                    <Typography
                        component={Link}
                        to={`/users/${id}`}
                    >
                        By: {name}
                    </Typography>
                </Grid>
                {user && user.role === 'admin' && (
                    <Grid container justifyContent="center" padding={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => onRemove(id)}
                        >
                            Delete
                        </Button>
                    </Grid>
                )}
            </StyledCard>
        </Grid>
    );
};

export default ImageItem;

import React, {FC} from 'react';
import {useAppSelector} from "../../../app/hooks";
import {apiURL} from "../../../constants";
import {Link} from 'react-router-dom';
import {Card, CardActionArea, Grid, Typography} from '@mui/material';
import styled from '@emotion/styled';
import {selectUser} from "../../users/usersSlice";
import {selectImageDeleting} from "../imagesSlice";
import ButtonWithProgress from "../../../components/UI/ButtonWithProgress/ButtonWithProgress";

const StyledCard = styled(Card)`
  width: 90%;
  margin: 0 auto;
`;

const StyledImage = styled('img')({
    height: '300px',
    width: '100%',
    borderRadius: '12px',
});

interface Props {
    id: string;
    title: string;
    image: string;
    userAuthorId: string;
    name: string;
    onRemove: (id: string) => void;
    onClickOpenModal?: () => void;
    authorIdState?: boolean;
}

const ImageItem: FC<Props> = ({
                                  id,
                                  title,
                                  image,
                                  userAuthorId,
                                  name,
                                  onRemove,
                                  onClickOpenModal,
                                  authorIdState
                              }) => {

    const user = useAppSelector(selectUser);
    const deleteLoading = useAppSelector(selectImageDeleting);


    return (
        <Grid item xs={6} md={4} marginBottom={3}>
            <StyledCard>
                <CardActionArea onClick={onClickOpenModal}>
                    <Grid item>
                        <StyledImage src={apiURL + '/' + image}/>
                    </Grid>
                </CardActionArea>
                <Grid container textAlign="center" flexDirection="column" paddingBottom={2}>
                    <Typography variant="h6" component={Link} to={`/users/${userAuthorId}`}>{title}</Typography>

                    {authorIdState === false && (
                        <Typography
                            component={Link}
                            to={`/users/${userAuthorId}`}
                        >
                            By: {name}
                        </Typography>
                    )}
                </Grid>
                {((user && user.role === 'admin') || (authorIdState === true && user?._id === userAuthorId)) && (
                    <Grid container justifyContent="center" padding={2}>
                        <ButtonWithProgress
                            loading={deleteLoading ? deleteLoading === id : false}
                            disabled={deleteLoading ? deleteLoading === id : false}
                            variant="contained"
                            color="primary"
                            onClick={() => onRemove(userAuthorId)}
                        >
                            Delete
                        </ButtonWithProgress>
                    </Grid>
                )}
            </StyledCard>
        </Grid>
    );
};

export default ImageItem;

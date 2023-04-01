import {Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks";
import {ImageMutation} from "../../types";
import {createImage} from "./imagesThunks";
import ImageForm from "./components/ImageForm";


const AddImage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onFormSubmit = async (imageMutation: ImageMutation) => {
        try {
            await dispatch(createImage(imageMutation)).unwrap();
            navigate('/');
        } catch (e) {
            throw new Error();
        }
    };

    return (
        <>
            <Typography variant="h4" sx={{mb: 2}} color="#046dbc">New image</Typography>
            <ImageForm onSubmit={onFormSubmit}/>
        </>
    );
};

export default AddImage;
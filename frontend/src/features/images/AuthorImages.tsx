import React from 'react';
import Images from "./Images";
import {useParams} from "react-router-dom";

const AuthorImages = () => {
    const {id} = useParams() as { id: string };
    return (
        <>
            <Images authorId={id} authorIdState={true}/>
        </>
    );
};

export default AuthorImages;
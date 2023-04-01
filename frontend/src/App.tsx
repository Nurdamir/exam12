import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Container, CssBaseline} from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import Login from "./features/users/Login";
import Register from "./features/users/Register";
import Images from "./features/images/Images";
import {useAppSelector} from "./app/hooks";
import {selectUser} from "./features/users/usersSlice";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AddImage from "./features/images/AddImage";
import AuthorImages from "./features/images/AuthorImages";

const App = () => {
    const user = useAppSelector(selectUser);

    return (
        <>
            <CssBaseline/>
            <header>
                <AppToolbar/>
            </header>
            <main>
                <Container maxWidth="xl">
                    <Routes>
                        <Route path="/" element={<Images/>}/>
                        <Route
                            path="/images/add"
                            element={
                                <ProtectedRoute isAllowed={user !== null}>
                                    <AddImage/>
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/users/:id" element={<AuthorImages/>}/>
                        <Route path="/myImages" element={<Images authorId={user?._id}/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="*" element={<h1>Not found!</h1>}/>
                    </Routes>
                </Container>
            </main>
        </>
    );
}
export default App;

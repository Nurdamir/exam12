import React from 'react';
import {Button, CircularProgress} from '@mui/material';
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {logout} from "../../../features/users/usersThunks";
import {User} from "../../../types";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import {selectLogoutLoading} from "../../../features/users/usersSlice";
import LogoutIcon from '@mui/icons-material/Logout';
import HandshakeIcon from '@mui/icons-material/Handshake';

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const logoutLoading = useAppSelector(selectLogoutLoading);


    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/');
    };

    return (
        <>
            <Button
                component={Link}
                to={"/myImages"}
                color="inherit"
            >
                <PermMediaIcon/>
            </Button>
            <Button
                color="inherit"
            >
                <HandshakeIcon/>
                {user.displayName}
            </Button>
            <Button
                color="inherit"
                onClick={handleLogout}
                disabled={logoutLoading}
            >
                {logoutLoading ? <CircularProgress/> : null}
                <LogoutIcon/>
            </Button>
        </>
    );
};

export default UserMenu;
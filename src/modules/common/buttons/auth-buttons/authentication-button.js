import React from 'react';
import { LoginButton } from './login-button';
import { SignOutButton } from './signout-button';
import { useAuth0 } from '@auth0/auth0-react';

export const AuthenticationButton = () => {
    const { isAuthenticated } = useAuth0();
    return isAuthenticated ? <SignOutButton /> : <LoginButton />;
};


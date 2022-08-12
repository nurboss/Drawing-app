import React, { createContext } from 'react';
import useFirebase from '../useFirebase';

export const AuthContext = createContext();
const AuthPorver = ({children}) => {
    const allContext = useFirebase();
    return (
        <AuthContext.Provider value={allContext}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthPorver;



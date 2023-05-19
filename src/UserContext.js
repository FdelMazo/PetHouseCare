import React, { useContext } from 'react';
import { db } from './db';

export const UserContext = React.createContext(null);
export const useUser = () => {
    const { user, setUser } = useContext(UserContext);
    const save = (user) => {
        db.users.put(user)
    }
    return { user, setUser, save }
}

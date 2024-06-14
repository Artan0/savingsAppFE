import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { User } from '../types/user';
import { request } from '../helper/axios_helper';

export interface UserContextProps {
    user: User | null;
    setUser: (user: User | null) => void;
    fetchUserInfo: () => void;
    logout: () => void;
}

interface UserProviderProps {
    children: ReactNode;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = (): UserContextProps => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            fetchUserInfo();
        }
    }, []);

    const fetchUserInfo = async () => {
        try {
            const response = await request("GET", "/user-info", null);
            setUser(response.data); // Assuming response.data is the user object
        } catch (error) {
            console.error('Error fetching user info:', error);
            setUser(null); // Clear user state if fetching fails
        }
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, fetchUserInfo, logout }}>
            {children}
        </UserContext.Provider>
    );
};

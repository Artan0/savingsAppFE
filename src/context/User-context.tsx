import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { User } from '../types/user';

export interface UserContextProps {
    user: User | null;
    setUser: (user: User | null) => void;
    fetchUserInfo: () => void;
    logout: () => void;
    loadUserInfo: () => void; // Add loadUserInfo to context props
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
        loadUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const response = await axios.get('http://localhost:8081/user-info', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user info:', error);
                setUser(null); // Clear user state if fetching fails
            }
        }
    };

    const loadUserInfo = async () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const response = await axios.get('http://localhost:8081/user-info', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user info:', error);
                setUser(null); // Clear user state if fetching fails
            }
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, fetchUserInfo, logout, loadUserInfo }}>
            {children}
        </UserContext.Provider>
    );
};

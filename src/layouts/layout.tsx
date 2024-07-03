import React, { useState } from 'react';
import CustomFooter from '../components/common/Footer';
import CustomHeader from '../components/common/Header';


interface CustomLayoutProps {
    children: React.ReactNode;
}

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    return (
        <div>
            <CustomHeader isMenuOpen={isMenuOpen} />
            <>{children}</>
            <CustomFooter />
        </div>
    );
};

export default CustomLayout;

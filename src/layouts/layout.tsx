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
            <CustomHeader />
            <div style={{ paddingTop: '4rem', }}>{children}</div>
            <CustomFooter />
        </div>
    );
};

export default CustomLayout;

import React, { ReactNode } from 'react';
import CustomHeader from './common/header';
import CustomFooter from './common/footer';

interface CustomLayoutProps {
    children: ReactNode;
}

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
    return (
        <div>
            <CustomHeader />
            <>{children}</>
            <CustomFooter />
        </div>
    );
};

export default CustomLayout;

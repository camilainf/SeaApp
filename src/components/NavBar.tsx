// components/NavBar.tsx
import React from 'react';
import { Button } from 'react-native';

const NavBar: React.FC = () => {

    const handleLogout = () => {
    };

    return (
        <Button title="Cerrar sesión" onPress={handleLogout} />
    );
};

export default NavBar;

import React from 'react';
import AppNavigator from './src/routes/AppNavigator';
import { AlertProvider } from './src/context/AlertContext'; // Asegúrate de que la ruta sea correcta

const App: React.FC = () => {
    return (
        <AlertProvider>
            <AppNavigator />
        </AlertProvider>
    );
};

export default App;

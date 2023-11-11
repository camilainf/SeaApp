import React, { createContext, useState, useContext, ReactNode } from 'react';

type AlertInfo = {
  title: string;
  message: string;
  visible: boolean;
  onConfirm?: () => void;
  onCloseCallback?: () => void; // Cambiado a onCloseCallback para evitar confusiones
};

const defaultAlertInfo: AlertInfo = { title: '', message: '', visible: false };

const AlertContext = createContext({
  showAlert: (title: string, message: string, onConfirm?: () => void, onCloseCallback?: () => void) => {},
  hideAlert: () => {},
  alertInfo: defaultAlertInfo,
});

export const useAlert = () => useContext(AlertContext);

type AlertProviderProps = {
  children: ReactNode;
};

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alertInfo, setAlertInfo] = useState<AlertInfo>(defaultAlertInfo);

  const showAlert = (title: string, message: string, onConfirm?: () => void, onCloseCallback?: () => void) => {
    console.log("Mostrando alerta con título:", title, "y onConfirm:", !!onConfirm);
    setAlertInfo({ title, message, visible: true, onConfirm, onCloseCallback });
  };

  const hideAlert = () => {
    setAlertInfo(defaultAlertInfo);
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert, alertInfo }}>
      {children}
    </AlertContext.Provider>
  );
};


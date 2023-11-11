import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAlert } from '../context/AlertContext';

const CustomAlert: React.FC = () => {
    const { alertInfo, hideAlert } = useAlert();
    const { visible, title, message, onConfirm, onCloseCallback } = alertInfo;

    const handleClose = () => {
        if (onCloseCallback) {
            onCloseCallback(); // Llama al callback onClose si está definido
        }
        hideAlert();
    };

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
        hideAlert();
    };

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={handleClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.alertBox}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                    <View style={styles.buttonContainer}>
                        {onConfirm && (
                            <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleConfirm}>
                                <Text style={styles.buttonText}>Confirmar</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity style={styles.button} onPress={handleClose}>
                            <Text style={styles.buttonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    alertBox: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    message: {
        fontSize: 16,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    confirmButton: {
        backgroundColor: '#28a745',
    },
});

export default CustomAlert;

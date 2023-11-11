import * as ImagePicker from 'expo-image-picker';
import { useAlert } from '../context/AlertContext';

export const selectImage = async (): Promise<{ uri: string | null, base64: string | null }> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const { showAlert } = useAlert();

    if (status !== 'granted') {
        
        showAlert('Necesitamos permisos para acceder a tus fotos.', "");
        return { uri: null, base64: null };
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.3,
        base64: true,
    });

    if (!result.canceled && result.assets && result.assets[0].base64) {
        return { uri: result.assets[0].uri, base64: result.assets[0].base64 };
    }

    return { uri: null, base64: null };
};

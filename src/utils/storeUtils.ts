import AsyncStorage from '@react-native-async-storage/async-storage';
import { ServicioData } from '../resources/service';
import { UsuarioCasted } from '../resources/user';

export const storeLastResults = async (userId: string, results: (ServicioData | UsuarioCasted)[]) => {
    try {
        const jsonValue = JSON.stringify(results);
        await AsyncStorage.setItem(`@lastSelectedResults_${userId}`, jsonValue);
    } catch (e) {
        console.error("Error al guardar los últimos resultados:", e);
    }
};

export const getLastResults = async (userId: string): Promise<(ServicioData | UsuarioCasted)[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(`@lastSelectedResults_${userId}`);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error("Error al obtener los últimos resultados:", e);
        return [];
    }
};
import { loginUser as apiLoginUser } from './userService';
import { storeToken, removeToken } from './storageService';

export const login = async (credentials: any) => {
    try {
        const data = await apiLoginUser(credentials);
        await storeToken(data.token);
        return data;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    await removeToken();
};

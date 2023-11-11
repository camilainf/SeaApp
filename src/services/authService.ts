import { loginUser as apiLoginUser } from './userService';
import { storeToken, removeToken, getToken } from './storageService';
import { DecodedToken } from '../types/auth';
import { decodeToken } from './tokenService';
import { HttpError } from '../resources/httpError';

export const login = async (credentials: any) => {
    try {
        const data = await apiLoginUser(credentials);
        await storeToken(data.token);
        return data;
    } catch (error) {
        console.log("ERROR",error);
        throw error as HttpError;
    }
};
export const getUserIdFromToken = async () => {
    const token = await getToken();
    if (!token) return null;
    
    const decodedToken = decodeToken(token) as DecodedToken;
    return decodedToken.id;
};

export const logout = async () => {
    await removeToken();
};

export const getUserIsAdminFromToken = async () => {
    const token = await getToken();
    if (!token) return null;
    
    const decodedToken = decodeToken(token) as DecodedToken;
    return decodedToken.isAdmin;
};

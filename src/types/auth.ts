export interface DecodedToken {
    id: string;
    email: string;
    isAdmin: boolean;
    iat: number;
    exp: number;
}
import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
    try {
        const decode = jwtDecode(token).exp;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        return decode?.exp < currentTimestamp;
    } catch (error) {
        return true
    }
}
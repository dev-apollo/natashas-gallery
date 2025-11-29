import axios from "axios";

const firebase = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1"
});

export const getAdminToken = (email: string, senha: string) => {
    const API_KEY = import.meta.env.VITE_FIREBASE_KEY;
    return firebase.post(`/accounts:signInWithPassword?key=${API_KEY}`, {
        email, password: senha, returnSecureToken: true
    });
}
import axios from "axios";

export interface LoginData {
    identifier: string;
    password: string
}

export const login = (data: LoginData) => axios.post('/auth/local', data);

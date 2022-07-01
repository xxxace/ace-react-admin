import axios from "axios";

export interface LoginData {
    identifier: string;
    password: string
}

export const login = <T,R>(data: LoginData) => axios.post<T,R>('/auth/local', data);

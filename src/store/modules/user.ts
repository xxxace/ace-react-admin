import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setToken, removeToken } from '@/utils/auth';

interface UserState {
    id: number | string;
    name: string;
    avatar?: string;
}

const initialState: UserState = {
    id: 0,
    name: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserState & { token: string }>) => {
            const { id, name, avatar, token } = action.payload;
            state.id = id;
            state.name = name;
            state.avatar = avatar;
            setToken(token);
        },
        logout: (state) => {
            state = Object.assign({}, initialState);
            removeToken();
            window.location.reload();
        }
    }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
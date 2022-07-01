import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setToken, removeToken } from '@/utils/auth';
import { getStorageItem } from '@/hooks/useStorage';
interface UserState {
    id: number | string;
    name: string;
    avatar?: string;
}

export type UserStateToken = UserState & { token: string };

const initialState: UserState = getStorageItem('user-info') || {
    id: 0,
    name: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<UserStateToken>) {
            const { id, name, avatar, token } = action.payload;
            state.id = id;
            state.name = name;
            state.avatar = avatar;

            localStorage.setItem('user-info', JSON.stringify({ id, name, avatar }))
            setToken(token);
        },
        logout: (state) => {
            console.log(state,'xxxx')
            state = Object.assign({}, initialState);
            removeToken();
            window.location.reload();
        }
    }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
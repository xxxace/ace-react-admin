import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from './modules/user';
import { userApiSlice } from './thunk/user';
const store = configureStore({
    reducer: {
        user: userReducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(userApiSlice.middleware);
    }
});

export type ReduxState = ReturnType<typeof store.getState>;

export type ReduxDispatch = typeof store.dispatch;

export default store;


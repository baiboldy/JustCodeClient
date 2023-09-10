import { createSlice } from '@reduxjs/toolkit'
import { extraReducers } from './extraReducers'

//Инициализация state начала
const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null,
}


//Управлячемм состоянием redux
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    //очистка при выходе из профиля
    reducers: {
        //обновляем в первоначальное положение
        logout: (state) => {
            state.user = null
            state.token = null
            state.isLoading = false
            state.status = null
        },
    },
    extraReducers: extraReducers
})

//проверяем есть ли токен при обновлении страницы
export const checkIsAuth = (state) => Boolean(state.auth.token)
export const getName = (state) => state.auth.user?.username;
console.log(getName);



export const { logout } = authSlice.actions

export default authSlice.reducer
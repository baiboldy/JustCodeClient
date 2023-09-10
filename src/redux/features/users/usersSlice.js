import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'
import { toast } from "react-toastify";

//Инициализация state начала
const initialState = {
    user: null,
    isLoading: false,
    status: null,
}


//Update redux
export const updateUser = createAsyncThunk('user/updateUser', async ({ username, password, phone, email }) => {
    try {
        const { data } = await axios.put('/user/update', {
            username,
            password,
            phone,
            email,
        })
        toast(data.message);
        return data

    } catch (error) {
        console.log("updateUser" + error)
    }
},
)

//Update redux
export const getUser = createAsyncThunk('user/getUser', async ({ username }) => {
    try {
        const { data } = await axios.put('/user', {
            username,
        })
        toast(data.message);
        return data

    } catch (error) {
        console.log("getUser" + error)
    }
},
)


export const removePost = createAsyncThunk('user/removePost', async (id) => {
    try {
        const { data } = await axios.delete(`/user/${id}`, id)
        return data
    } catch (error) {
        console.log(error)
    }
})





//Управлячемм состоянием redux
export const userSlice = createSlice({
    name: 'user',
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
    extraReducers: {
        // Register user
        //запрос отпрвлется состояние state

        ///////////Update user
        [updateUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        //запрос выполнился состояние state при регистрации
        [updateUser.fulfilled]: (state, action) => {
            state.isLoading = false
            //action.payload.message берем из сервера auth.js 
            state.status = action.payload.message
            state.user = action.payload.user
        },
        //запрос ошибка состояние state
        [updateUser.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },

    }
})

//проверяем есть ли токен при обновлении страницы


export default userSlice.reducer
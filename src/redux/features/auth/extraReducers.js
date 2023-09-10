import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'
import { toast } from "react-toastify";

//Регистрация redux
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ username, password, phone, email }) => {
        console.log("phone" + phone);
        console.log("email" + email);
        if (!phone) {
            phone = ""
        }
        if (!email) {
            email = ""
        }
        try {
            const { data } = await axios.post('/auth/register', {
                username,
                phone,
                password,
                email,
            })
            console.log(data);
            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }
            return data

        } catch (error) {
            console.log(error)
        }
    },
)

//Login redux
export const loginUser = createAsyncThunk('auth/loginUser', async ({ username, password }) => {
    try {
        const { data } = await axios.post('/auth/login', {
            username,
            password,
        })
        toast(data.message);
        //помещаем в localStorage
        if (data.token) {
            window.localStorage.setItem('token', data.token)
        }
        return data

    } catch (error) {
        console.log("loginUser" + error)
    }
},
)


//Update redux
export const updateUser = createAsyncThunk('auth/updateUser', async ({ _id, username, password, phone, email }) => {
    try {
        const { data } = await axios.put('/auth/update', {
            _id,
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

export const removeUser = createAsyncThunk('auth/removeUser', async ({ _id }) => {
    try {
        await axios.delete('/auth/remove/' + _id); // Замените userId на актуальный ID пользователя
        toast('Пользователь успешно удален');
    } catch (error) {
        console.error("removeUser", error);
        toast('Ошибка при удалении пользователя');
    }
});


//Login redux
export const getMe = createAsyncThunk('auth/loginUser', async () => {
    try {
        const { data } = await axios.get('/auth/me')
        console.log(data);
        return data

    } catch (error) {
        console.log(error)
    }
},
)


export const extraReducers = {
    // Register user
    //запрос отпрвлется состояние state
    [registerUser.pending]: (state) => {
        state.isLoading = true
        state.status = null
    },
    //запрос выполнился состояние state при регистрации
    [registerUser.fulfilled]: (state, action) => {
        state.isLoading = false
        //action.payload.message берем из сервера auth.js
        state.status = action.payload.message
        state.user = action.payload.user
        state.token = action.payload.token
    },
    //запрос ошибка состояние state
    [registerUser.rejectWithValue]: (state, action) => {
        state.status = action.payload.message
        state.isLoading = false
    },
    ///////////Login user
    [loginUser.pending]: (state) => {
        state.isLoading = true
        state.status = null
    },
    //запрос выполнился состояние state при регистрации
    [loginUser.fulfilled]: (state, action) => {
        state.isLoading = false
        //action.payload.message берем из сервера auth.js 
        state.status = action.payload.message
        state.user = action.payload.user
        state.token = action.payload.token
    },
    //запрос ошибка состояние state
    [loginUser.rejectWithValue]: (state, action) => {
        state.status = action.payload.message
        state.isLoading = false
    },
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
    //GetMe user Проверка авторизации
    [getMe.pending]: (state) => {
        state.isLoading = true
        state.status = null
    },
    //запрос выполнился состояние state при регистрации
    [getMe.fulfilled]: (state, action) => {
        state.isLoading = false
        //action.payload.message берем из сервера auth.js 
        state.status = null
        state.user = action.payload?.user
        state.token = action.payload?.token
    },
    //запрос ошибка состояние state
    [getMe.rejectWithValue]: (state, action) => {
        state.status = action.payload.message
        state.isLoading = false
    },
    //removeUser user Проверка авторизации
    [removeUser.pending]: (state) => {
        state.isLoading = true
        state.status = null
    },
    //запрос выполнился состояние state при регистрации
    [removeUser.fulfilled]: (state, action) => {
        state.isLoading = false
        //action.payload.message берем из сервера auth.js 
        state.status = action.payload.message

    },
    //запрос ошибка состояние state
    [removeUser.rejectWithValue]: (state, action) => {
        state.status = action.payload.message
        state.isLoading = false
    },
}
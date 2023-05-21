import axios from 'axios';
import { infoToast } from '../../components/Toasts';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
    set(token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    unset() {
        axios.defaults.headers.common.Authorization = '';
    },
};

const register = createAsyncThunk('auth/register', async (credentials, thunkAPI) => {
    try {
        const { data } = await axios.post('/users/signup', credentials);
        token.set(data.token);
        console.log(data);
        return data;
    } catch (error) {
        // console.log(error.message);
        infoToast('The user is alredy registered');
        thunkAPI.rejectWithValue(error.message);
    }
});

const logIn = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
        const { data } = await axios.post('/users/login', credentials);
        token.set(data.token);
        return data;
    } catch (error) {
        // console.log(error.message);
        infoToast('Incorrect login or password');
        thunkAPI.rejectWithValue(error.message);
    }
});

const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await axios.post('/users/logout');
        token.unset();
    } catch (error) {
        // console.log(error.message);
        thunkAPI.rejectWithValue(error.message);
    }
});

const fetchCurrentUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        // console.log(thunkAPI.getState());
        const state = thunkAPI.getState();
        const persistedToken = state.auth.token;
        // console.log(persistedToken);
        if (persistedToken === null) {
            // console.log('!persistedToken');
            return thunkAPI.rejectWithValue();
            // return state;
        }
        token.set(persistedToken);
        try {
            const { data } = await axios.get('/users/current');
            // console.log(data);
            return data;
        } catch (error) {
            // console.log(error.message);
            return thunkAPI.rejectWithValue();
        }
    }
);

const authOperations = {
    register,
    logIn,
    logOut,
    fetchCurrentUser,
};
export default authOperations;
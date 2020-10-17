import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk } from 'index';
import { rootApi } from 'utils/api';
import { setAuthToken } from 'helpers/setAuthToken';

export interface UserState {
  token: string | null;
  isAuthenticated: boolean | null;
  loading: boolean;
  user: any;
}

const initialState: UserState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, { payload }: PayloadAction<{ data: any }>) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = payload.data;
    },
    createUser: (state, { payload }: PayloadAction<{ data: string }>) => {
      localStorage.setItem('token', payload.data);

      state.token = payload.data;
      state.isAuthenticated = true;
      state.loading = false;
    },
  },
});

export const { getUser, createUser } = userSlice.actions;
export default userSlice.reducer;

export const userSelector = (state: { user: UserState }) => state.user;

export interface SignupValues {
  name: string;
  email: string;
  password: string;
}

export const loadUser = (): AppThunk => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`${rootApi}/api/v1/users`);

    dispatch(getUser(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const signUpUser = ({
  name,
  email,
  password,
}: SignupValues): AppThunk => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post(`${rootApi}/api/v1/users`, body, config);

    dispatch(createUser(res.data));
    dispatch(loadUser());
  } catch (error) {
    console.log(error);
  }
};

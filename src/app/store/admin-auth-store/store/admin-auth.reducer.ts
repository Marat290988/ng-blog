import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailed } from './admin-auth.actions';
import { getAccessToken } from './admin-auth.selectors';

export const ADMIN_AUTH_FEATURENAME = 'admin-auth';

export interface AuthData {
    accessToken: string;
}

export interface AdminAuthState {
    loading: boolean;
    loaded: boolean;
    serverError: string;
    authData?: AuthData;
}

const initialState: AdminAuthState = {
    loading: false,
    loaded: true,
    serverError: ''
}

export const adminAuthReducer = createReducer(
    initialState,
    on(login, state => ({
        ...state,
        loading: true
    })),
    on(loginSuccess, (state, authData: AuthData) => ({
        ...state,
        authData,
        loaded: true,
        loading: false,
        serverError: ''
    })),
    on(loginFailed, (state, {serverError}) => ({
        ...state,
        authData: null,
        loaded: true,
        loading: false,
        serverError
    }))
);
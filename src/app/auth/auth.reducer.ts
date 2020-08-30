import { createReducer, on } from '@ngrx/store';
import { setUsuario, unsetUsuario } from './auth.actions';
import { Usuario } from './../models/usuario.model';

export interface State {
  usuario: Usuario;
}

export const initialState: State = {
  usuario: null,
};

const _authReducer = createReducer(
  initialState,

  on(setUsuario, (state, { usuario }) => ({
    ...state,
    usuario: { ...usuario },
  })),
  on(unsetUsuario, (state) => ({ ...state, usuario: null }))
);

export function authReducer(state, action) {
  return _authReducer(state, action);
}

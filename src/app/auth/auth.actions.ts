import { createAction, props } from '@ngrx/store';
import { Usuario } from './../models/usuario.model';

export const setUsuario = createAction(
  '[Auth] setUsuario',
  props<{ usuario: Usuario }>()
);

export const unsetUsuario = createAction(
  '[Auth] unsetUsuario'
);

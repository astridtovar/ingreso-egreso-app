import * as auth from './auth/auth.reducer';
import * as ingresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';
import * as ui from './shared/ui.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  ui: ui.State;
  usuario: auth.State;
  ingresosEgresos: ingresoEgreso.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  usuario: auth.authReducer,
  ingresosEgresos: ingresoEgreso.ingresoEgresoReducer,
};

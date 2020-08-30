import * as authActions from '../auth/auth.actions';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Usuario } from './../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  usuarioSubscription: Subscription;

  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore,
    private store: Store
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((fusuario) => {
      console.log(fusuario);
      if (fusuario) {
        this.usuarioSubscription = this.firestore
          .doc(`${fusuario.uid}/usuario`)
          .valueChanges()
          .subscribe((fsusuario: any) => {
            const usuario = Usuario.fromFirestore(fsusuario);
            this.store.dispatch(authActions.setUsuario({ usuario }));
          });
      } else {
        this.usuarioSubscription.unsubscribe();
        this.store.dispatch(authActions.unsetUsuario());
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const nuevoUsuario = new Usuario(user.uid, nombre, user.email);
        return this.firestore
          .doc(`${user.uid}/usuario`)
          .set({ ...nuevoUsuario });
      });
  }

  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  cerrarSesion() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map((fbUser) => fbUser != null));
  }
}

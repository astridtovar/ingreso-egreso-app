import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Usuario } from './../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((fusuario) => {
      console.log(fusuario);
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

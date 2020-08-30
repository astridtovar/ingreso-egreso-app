export class Usuario {
  static fromFirestore({ correo, nombre, uid }) {
    return new Usuario(uid, nombre, correo);
  }

  constructor(
    public uid: string,
    public nombre: string,
    public correo: string
  ) {}
}

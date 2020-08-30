import Swal from 'sweetalert2';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registroForm: FormGroup;
  constructor(private fb: FormBuilder, private AuthService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  crearUsuario() {
    console.log(this.registroForm.value);
    if (this.registroForm.invalid) {
      return;
    }

    Swal.showLoading();
    const { nombre, correo, password } = this.registroForm.value;
    this.AuthService.crearUsuario(nombre, correo, password)
      .then((credenciales) => {
        console.log(credenciales);
        Swal.hideLoading();
        Swal.close();
        this.router.navigate(['/'])
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          text: 'Error al registrar.'
        })
        console.error(error);
      });
  }
}

import Swal from 'sweetalert2';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  loginUsuario() {
    if (this.loginForm.invalid) {
      return;
    }

    Swal.showLoading();
    const { correo, password } = this.loginForm.value;

    this.AuthService.loginUsuario(correo, password)
      .then((credenciales) => {
        console.log(credenciales);
        Swal.hideLoading();
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch((error) => {
        Swal.hideLoading();
        console.error(error);
        Swal.fire({
          icon: 'error',
          text: 'Usuario o contraseña incorrecto.',
        });
        this.loginForm.reset();
      });
  }
}

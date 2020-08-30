import * as ui from './../../shared/ui.actions';
import Swal from 'sweetalert2';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from './../../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe((ui) => {
      this.cargando = ui.isLoading;
    });
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  loginUsuario() {
    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(ui.isLoading());
    // Swal.showLoading();
    const { correo, password } = this.loginForm.value;

    this.AuthService.loginUsuario(correo, password)
      .then((credenciales) => {
        console.log(credenciales);
        // Swal.hideLoading();
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch((error) => {
        // Swal.hideLoading();
        this.store.dispatch(ui.stopLoading());
        console.error(error);
        Swal.fire({
          icon: 'error',
          text: 'Usuario o contraseña incorrecto.',
        });
        this.loginForm.reset();
      });
  }
}

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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registroForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
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

  crearUsuario() {
    console.log(this.registroForm.value);
    if (this.registroForm.invalid) {
      return;
    }

    this.store.dispatch(ui.isLoading());
    // Swal.showLoading();
    const { nombre, correo, password } = this.registroForm.value;
    this.AuthService.crearUsuario(nombre, correo, password)
      .then((credenciales) => {
        console.log(credenciales);
        this.store.dispatch(ui.stopLoading());
        // Swal.hideLoading();
        // Swal.close();
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          text: 'Error al registrar.',
        });
        console.error(error);
      });
  }
}

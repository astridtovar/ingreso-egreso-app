import { AppState } from 'src/app/app.reducer';
import { AuthService } from './../../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  nombre: string = '';
  usuarioSubs: Subscription;

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.usuarioSubs = this.store.select('usuario')
    .pipe(filter( ({usuario}) => usuario !== null))
    .subscribe(({ usuario }) => {
      this.nombre = usuario.nombre;
    });
  }

  cerrarSesion() {
    this.AuthService.cerrarSesion().then(() => {
      this.router.navigate(['/login']);
    });
  }

  ngOnDestroy() {
    this.usuarioSubs.unsubscribe();
  }
}

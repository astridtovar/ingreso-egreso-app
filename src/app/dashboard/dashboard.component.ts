import * as ingresosEgresosActions from './../ingreso-egreso/ingreso-egreso.actions';
import { AppState } from 'src/app/app.reducer';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from './../services/ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  usuarioSubs: Subscription;
  ingresosEgresosSubs: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.usuarioSubs = this.store
      .select('usuario')
      .pipe(filter((auth) => auth.usuario !== null))
      .subscribe(({ usuario }) => {
        this.ingresosEgresosSubs = this.ingresoEgresoService
          .initIngresosEgresosListener(usuario.uid)
          .subscribe((ingresosEgresos) => {
            console.log(ingresosEgresos)
            this.store.dispatch(
              ingresosEgresosActions.setItems({ items: ingresosEgresos })
            );
          });
      });
  }

  ngOnDestroy() {
    this.ingresosEgresosSubs.unsubscribe();
    this.usuarioSubs.unsubscribe();
  }
}

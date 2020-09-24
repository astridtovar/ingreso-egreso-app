import Swal from 'sweetalert2';
import { AppState } from 'src/app/app.reducer';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IngresoEgreso } from './../../models/ingreso-egreso-model';
import { IngresoEgresoService } from './../../services/ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresosEgresos: IngresoEgreso[] = [];
  ingresosSubs: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.ingresosSubs = this.store
      .select('ingresosEgresos')
      .subscribe(({ items }) => {
        this.ingresosEgresos = items;
      });
  }

  borrar(uid: string) {
    this.ingresoEgresoService
      .borrarIngresoEgreso(uid)
      .then(() => {
        Swal.fire('Borrado', 'Item borrado', 'success');
      })
      .catch((err) => {
        Swal.fire('Borrado', err.message, 'error');
      });
  }

  ngOnDestroy() {
    this.ingresosSubs.unsubscribe();
  }
}

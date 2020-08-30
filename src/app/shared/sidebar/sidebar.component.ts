import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private AuthService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  cerrarSesion() {
    this.AuthService.cerrarSesion().then(() => {
      this.router.navigate(['/login']);
    });
  }
}

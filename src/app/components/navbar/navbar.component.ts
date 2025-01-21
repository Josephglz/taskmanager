import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  logout(): void {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}

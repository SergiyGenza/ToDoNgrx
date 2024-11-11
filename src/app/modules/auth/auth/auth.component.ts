import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss',
    standalone: true
})
export class AuthComponent {

  constructor(
    public authService: AuthService
  ) { }
}

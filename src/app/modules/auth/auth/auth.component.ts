import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss',
    standalone: true,
    imports: [RouterLink]
})
export class AuthComponent {

  constructor(
    public authService: AuthService
  ) { }
}

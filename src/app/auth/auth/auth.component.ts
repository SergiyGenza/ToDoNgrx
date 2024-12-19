import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class AuthComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  public registrForm = new FormGroup({
    userName: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', { validators: [Validators.email, Validators.required] }),
    password: new FormControl<any>('', Validators.required),
  })

  public regist(): void {
    const rawForm = this.registrForm.getRawValue();
    this.authService.register(rawForm.email!, rawForm.userName!, rawForm.password!)
      .subscribe({
        next: () => console.log('regist'),
        error: (e) => console.error(e),
        complete: () => this.router.navigateByUrl('/')
      })
  }

  public auth(): void {
    const rawForm = this.registrForm.getRawValue();
    this.authService.auth(rawForm.email!, rawForm.password)
      .subscribe({
        next: () => console.log('auth'),
        error: (e) => console.error(e),
        complete: () => this.router.navigateByUrl('/')
      })
  }

  public logout(): void {
    this.authService.signOut();
  }
}

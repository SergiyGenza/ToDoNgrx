import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { authRoutes } from '../auth.routes';
import { AuthComponent } from './auth.component';
import { AuthService } from '../services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { firebaseConfig } from 'src/app/environment/environment';



@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    AngularFirestoreModule,
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }

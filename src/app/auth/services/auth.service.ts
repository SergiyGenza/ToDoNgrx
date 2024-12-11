import { inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, User, user, UserCredential } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private firebaseAuth = inject(Auth);
  public currentUserSignal = signal<any>(undefined);
  public user$: Observable<User | null> = user(this.firebaseAuth);

  public register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(response => updateProfile(response.user, { displayName: username }))
    return from(promise);
  }

  public auth(email: string, password: string): Observable<UserCredential> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password);

    return from(promise);
  }

  public signOut(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }
}

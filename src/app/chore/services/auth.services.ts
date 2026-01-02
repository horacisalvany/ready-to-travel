import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  UserCredential,
  AuthProvider,
} from '@angular/fire/auth';

export interface Credential {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth: Auth = inject(Auth); // AngularFire injectado
  readonly authState$ = authState(this.auth);

  signUpWithEmailAndPassword(credentials: Credential): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, credentials.email, credentials.password);
  }

  loginWithEmailAndPassword(credentials: Credential): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, credentials.email, credentials.password);
  }

  signInWithGoogleProvider(): Promise<UserCredential> {
    return this.callPopUp(new GoogleAuthProvider());
  }

  signInWithGithubProvider(): Promise<UserCredential> {
    return this.callPopUp(new GithubAuthProvider());
  }

  private async callPopUp(provider: AuthProvider): Promise<UserCredential> {
    return await signInWithPopup(this.auth, provider);
  }
}

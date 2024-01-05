import { Injectable } from '@angular/core';
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class SocialLoginService {
  constructor() {}

  loginWithGithub() {
    return signInWithPopup(getAuth(), new GithubAuthProvider());
  }

  loginWithGoogle() {
    return signInWithPopup(getAuth(), new GoogleAuthProvider());
  }

  logout() {
    return getAuth().signOut();
  }

  isLoggedIn() {
    return getAuth().currentUser;
  }
  isLoggedOut() {
    return !this.isLoggedIn();
  }
}

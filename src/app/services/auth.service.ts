import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { User } from '../models/users';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<User>;
  public isAuthenticated$: Observable<boolean>;

  constructor(
    private authService: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private usersDB: AngularFirestore
  ) {
    this.usersCollection = this.usersDB.collection<User>('Users');
    this.isAuthenticated$ = this.authService.authState.pipe(
      map((user) => !!user)
    );
  }

  // Register a new user Service with email and password
  async registerUser(userData: User) {
    if (!userData.email || !userData.password) {
      this.toastr.error('Email and password are required');
      return;
    }
    // check if the user already exists
    const existingUser = await this.usersCollection.ref
      .where('email', '==', userData.email)
      .get();

    if (!existingUser.empty) {
      this.toastr.warning(
        'Email already exists. Please use a different email.'
      );
      return;
    }
    try {
      this.authService.createUserWithEmailAndPassword(
        userData.email,
        userData.password
      );
      this.router.navigate(['/']);
      this.toastr.success('Registered Successfully');

      await this.usersCollection.add({
        name: userData.name,
        email: userData.email,
      });
    } catch (error) {
      this.toastr.error('Failed to register');
    }
  }

  // Login a user Service with email and password
  async loginUser(email: string, password: string) {
    if (!email || !password) {
      this.toastr.error('Email and password are required');
      return;
    }
    try {
      await this.authService.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/']);
      this.toastr.success('Logged in Successfully');
    } catch (error) {
      this.toastr.error('invalid email or password');
    }
  }

  // Logout a user Service
  async logoutUser() {
    try {
      await this.authService.signOut();
      this.router.navigate(['/']);
      this.toastr.success('Logged Out Successfully');
    } catch (error) {
      this.toastr.error('Failed to logout');
    }
  }
}

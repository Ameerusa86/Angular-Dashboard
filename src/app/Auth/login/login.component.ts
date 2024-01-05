import { Component, OnInit } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SocialLoginService } from '../../services/social-login.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, NgOptimizedImage],
  standalone: true,
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: '',
  };

  constructor(
    private auth: AuthService,
    private socialAuth: SocialLoginService
  ) {}

  ngOnInit() {}

  async login() {
    try {
      await this.auth.loginUser(
        this.credentials.email,
        this.credentials.password
      );
    } catch (error) {
      console.log(error);
    }
  }
  // Login with Github
  async loginWithGithub() {
    try {
      await this.socialAuth.loginWithGithub();
    } catch (error) {
      console.log(error);
    }
  }
  // Login with Google
  async loginWithGoogle() {
    try {
      await this.socialAuth.loginWithGoogle();
    } catch (error) {
      console.log(error);
    }
  }
}

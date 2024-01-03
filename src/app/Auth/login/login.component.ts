import { Component, OnInit } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule],
  standalone: true,
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: '',
  };

  constructor(private auth: AuthService) {}

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
}

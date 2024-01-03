import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent implements OnInit {
  isAuthenticated = false;
  constructor(public auth: AuthService) {
    this.auth.isAuthenticated$.subscribe((status) => {
      this.isAuthenticated = status;
    });
  }
  ngOnInit() {}

  async logout($event: Event) {
    $event.preventDefault();
    await this.auth.logoutUser();
  }
}

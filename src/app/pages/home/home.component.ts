import { Component } from '@angular/core';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { StatisticsComponent } from '../../components/statistics/statistics.component';
import { ProjectsComponent } from '../../components/projects/projects.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DashboardComponent, StatisticsComponent, ProjectsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}

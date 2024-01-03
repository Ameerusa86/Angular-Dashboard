import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  recentProjects: any[] = [];

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    // Load recently added projects
    this.projectsService.getRecentProjects().subscribe((data) => {
      this.recentProjects = data;
    });
  }
}

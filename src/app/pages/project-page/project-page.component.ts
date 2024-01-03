import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.css',
})
export class ProjectPageComponent implements OnInit {
  projects: any = [];

  constructor(private projectService: ProjectsService) {}
  ngOnInit() {
    this.projectService.loadData().subscribe((data) => {
      this.projects = data;
    });
  }
  onDelete(id: string, imageUrl: string) {
    this.projectService.deleteData(id, imageUrl);
  }
}

import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProjectsService } from '../../services/projects.service';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [MatIconModule, NgFor, NgClass],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent implements OnInit {
  projectsCountQTY: number = 0;
  projectsCountByCategoryQTY: { [key: string]: number } = {};
  constructor(
    private projectsCount: ProjectsService,
    private projectsService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.projectsCount.loadData().subscribe((data) => {
      // count the number of projects
      this.projectsCount.projectsCount = data.length;
      this.projectsCountQTY = this.projectsCount.projectsCount;
    });
    this.projectsService.getCategoryCounts().subscribe((categoryCounts) => {
      // assign category counts to the corresponding variable
      this.projectsCountByCategoryQTY = categoryCounts;
    });
  }
  getCategoryIconClass(category: string): string {
    // Map category names to corresponding icon classes
    const iconClasses = {
      Angular: 'bx bxl-angular bx-flip-horizontal',
      'React & Next JS': 'bx bxl-react bx-flip-horizontal',
      'HTML, CSS & JS': 'bx bxl-javascript bx-horizontal',
    };
    return iconClasses[category as keyof typeof iconClasses] || 'bx bxs-folder'; // Default icon for unknown category
  }
}

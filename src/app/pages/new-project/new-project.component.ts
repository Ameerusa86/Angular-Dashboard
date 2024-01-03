import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Project } from '../../models/project';
import { ProjectsService } from '../../services/projects.service';

import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-new-project',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, NgIf, QuillModule],
  templateUrl: './new-project.component.html',
  styleUrl: './new-project.component.css',
})
export class NewProjectComponent implements OnInit {
  link: string = '';
  imgSrc: any = 'https://placehold.co/600x400';
  ProjectImg: any;
  categories: any = [];
  postForm: FormGroup;

  post: any;

  formStaus: string = 'Add New';

  docId: string = '';

  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private postService: ProjectsService,
    private route: ActivatedRoute
  ) {
    // Initialize postForm here
    this.postForm = this.fb.group({
      title: [''],
      link: [''],
      projectImage: [''],
      category: [''],
      content: [''],
      isFeatured: [''],
      views: [''],
      status: [''],
    });

    this.route.queryParams.subscribe((params) => {
      this.docId = params['id'];

      if (this.docId) {
        this.postService.loadOneData(params['id']).subscribe((data) => {
          this.post = data;
          this.postForm.setValue({
            title: this.post.title,
            link: this.post.link,
            projectImage: '',
            category: `${this.post.category.categoryId}-${this.post.category.category}`, // Fix here
            content: this.post.content,
          });
          this.imgSrc = this.post.projectImage;
          this.formStaus = 'Edit';
        });
      } else {
        this.postForm = this.fb.group({
          title: [''],
          link: [''],
          projectImage: [''],
          category: [''],
          content: [''],
        });
      }
    });
  }
  ngOnInit() {
    this.categoryService.loadData().subscribe((data) => {
      this.categories = data;
    });
  }

  get fc() {
    return this.postForm.controls;
  }

  onTitleChanged($event: any) {
    const title = $event.target.value;
    this.link = title.replace(/\s+/g, '-');
  }
  projectImage($event: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgSrc = e.target.result;
    };
    reader.readAsDataURL($event.target.files[0]);
    this.ProjectImg = $event.target.files[0];
  }

  onSubmit() {
    let splitted = this.postForm.value.category.split('-');

    const postData: Project = {
      title: this.postForm.value.title,
      link: this.postForm.value.link,
      category: {
        categoryId: splitted[0],
        category: splitted[1],
      },
      imageUrl: '',
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date(),
    };

    this.postService.uploadFile(
      this.ProjectImg,
      postData,
      this.formStaus,
      this.docId
    );

    this.postForm.reset();
    this.imgSrc = 'https://placehold.co/600x400';
  }
}

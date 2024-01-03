import { Component, OnInit } from '@angular/core';
// Forms
import { FormsModule, NgForm } from '@angular/forms';
import { NgClass, NgFor } from '@angular/common';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [FormsModule, NgClass, NgFor],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css',
})
export class CategoriesPageComponent implements OnInit {
  categoryArray: Category[] = [];
  formCategory: string = '';
  formTitle: string = 'Add' || 'Edit';
  categoryID: string = '';

  constructor(private categoryService: CategoriesService) {}
  ngOnInit() {
    this.categoryService.loadData().subscribe((data: Category[]) => {
      this.categoryArray = data;
    });
  }

  onSubmit(formData: NgForm) {
    let categoryData: Category = {
      category: formData.value.category,
    };
    if (this.formTitle == 'Add') {
      this.categoryService.saveData(categoryData);
      formData.reset();
    } else if (this.formTitle == 'Edit') {
      this.categoryService.updateData(this.categoryID, categoryData);
      formData.reset();
    }
  }
  onEdit(category: any, id: string | undefined) {
    this.formCategory = category;
    this.formTitle = 'Edit';
    this.categoryID = id!;
  }
  onDelete(id: string | undefined) {
    this.categoryService.deleteData(this.categoryID);
    this.categoryID = id!;
  }
}

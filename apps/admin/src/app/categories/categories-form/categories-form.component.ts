import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@eshop/products';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup
  isSubmitted = false;
  constructor(
    private messageService: MessageService, 
    private formBuilder: FormBuilder, 
    private categoriesService: CategoriesService,
    private location: Location,
    ){}

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        name:['', Validators.required],
        icon:['', Validators.required],
        
      })
  }
  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid) return;
    const category: Category = {
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value
    }
    this.categoriesService.createCategory(category).subscribe({
      next: () => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is created' }),
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category could not be created' }),
      complete: () => setTimeout(() => this.location.back(), 2000)
  });

    console.log(this.categoryForm.name.value);
    console.log(this.categoryForm.icon.value);
  }

  get categoryForm() {
    return this.form.controls;
  }
}

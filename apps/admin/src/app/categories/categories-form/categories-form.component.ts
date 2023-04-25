import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  editMode = false;
  currentCategoryId = "";

  constructor(
    private messageService: MessageService, 
    private formBuilder: FormBuilder, 
    private categoriesService: CategoriesService,
    private location: Location,
    private route: ActivatedRoute,
    ){}

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        name:['', Validators.required],
        icon:['', Validators.required],
      })
      this._checkEditMode();
  }
  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid) return;
    const category: Category = {
      id: this.currentCategoryId,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value
    }
    if(this.editMode){
      this._updateCategory(category)
    } else {
      this._addCategory(category);
    }
  }

  private _addCategory(category: Category){
    this.categoriesService.createCategory(category).subscribe({
      next: () => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is created' }),
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category could not be created' }),
      complete: () => setTimeout(() => this.goBack(), 2000)
  })}

  private _updateCategory(category: Category){
    this.categoriesService.updateCategory(category).subscribe({
      next: () => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is updated' }),
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category could not be updated' }),
      complete: () => setTimeout(() => this.goBack(), 2000)
  })}

  private _checkEditMode(){
    this.route.params.subscribe(params =>{
      if(params.id) {
        this.editMode = true;
        this.currentCategoryId = params.id;
        this.categoriesService.getCategory(params.id).subscribe(category => {
          this.categoryForm.name.setValue(category.name);
          this.categoryForm.icon.setValue(category.icon);
        });
      }
    })
  }

  goBack(){
    this.location.back();
  }

  get categoryForm() {
    return this.form.controls;
  }
}

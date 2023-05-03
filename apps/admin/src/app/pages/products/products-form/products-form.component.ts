import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, ProductsService, Product } from '@eshop/products';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit {
  editMode = false;
  form: FormGroup;
  isSubmitted = false;
  categories = [];
  imageDisplay: string | ArrayBuffer;
  currentProductId: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private productsService: ProductsService,
    private location: Location,
    private route: ActivatedRoute,
    ){
  }

  ngOnInit(): void {
    this._initForm();  
    this._getCategories();  
    this._checkEditMode();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false]
    })
  }

  get productForm() {
    return this.form.controls;
  }

  private _getCategories(){
    this.categoriesService.getCategories().subscribe(categories=>{
      this.categories = categories;
    })
  }

  private _checkEditMode(){
    this.route.params.subscribe(params =>{
      if(params.id) {
        this.editMode = true;
        this.currentProductId = params.id;
        this.productsService.getProduct(params.id).subscribe(product => {
          this.productForm.name.setValue(product.name);
          this.productForm.category.setValue(product.category.id);
          this.productForm.brand.setValue(product.brand);
          this.productForm.price.setValue(product.price);
          this.productForm.countInStock.setValue(product.countInStock);
          this.productForm.isFeatured.setValue(product.isFeatured);
          this.productForm.description.setValue(product.description);
          this.productForm.richDescription.setValue(product.richDescription);
          this.imageDisplay = product.image;
          this.productForm.image.setValidators([]);
          this.productForm.image.updateValueAndValidity();
        });
      }
    })
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.form.invalid) return;

    const productFormData = new FormData();

    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    });
    if(this.editMode){
      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
  }

  private _addProduct(productData: FormData){
    this.productsService.createProduct(productData).subscribe({
      next: () => this.messageService.add({ severity: 'success', summary: 'Success', detail: `Product ${productData.get("name")} is created` }),
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product could not be created' }),
      complete: () => setTimeout(() => this.goBack(), 2000)
  })}

  private _updateProduct(productData: FormData){
    this.productsService.updateProduct(productData, this.currentProductId).subscribe({
      next: () => this.messageService.add({ severity: 'success', summary: 'Success', detail: `Category ${productData.get("name")} is updated` }),
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category could not be updated' }),
      complete: () => setTimeout(() => this.goBack(), 2000)
  })}

  onImageUpload(event){
    const file = event.target.files[0];
    if(file){
      this.form.patchValue({image: file});
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }
  goBack(){
    this.location.back();
  }
}

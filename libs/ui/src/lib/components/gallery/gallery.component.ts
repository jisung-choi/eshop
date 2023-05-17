import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styles: [
  ]
})
export class GalleryComponent implements OnInit{
  @Input() images: string[];
  selectedImageURL : string;
  
  ngOnInit(): void {
    if(this.hasImages){
      this.selectedImageURL = this.images[0];
    }
  }

  changeSelectedImage(imageURL: string){
    this.selectedImageURL = imageURL;
  }

  get hasImages() {
    return this.images?.length > 0;
  }
}

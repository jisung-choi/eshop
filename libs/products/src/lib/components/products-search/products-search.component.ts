import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'products-search',
  templateUrl: './products-search.component.html',
  styles: [
  ]
})
export class ProductsSearchComponent implements OnInit{

  searchWord = "";
  suffixTree = new SuffixTree();
  autoComplete: string[] = [];
  isSuffixTreeFilled = false;
  autoFillClicked = false;
  inputElement: HTMLInputElement;

  constructor(private router: Router, private productsService: ProductsService)
  {return}

  ngOnInit(): void {
    this._asyncInit();
  }

  //suffix tree must be initialized with values before connecting inputElement EventListener
  private async  _asyncInit(){
    this._getProducts();
    try {
      await this.waitUntil(() => {
        return (this.suffixTree.root.children.length !== 0)
      }, 10); // Maximum 5 attempts
    } catch (error) {
      console.error('Condition not satisfied within maximum attempts:', error);
    }
    this._connectInputElement();
  }

  private _connectInputElement(){
    this.inputElement = document.getElementById("search") as HTMLInputElement;
    this.inputElement.addEventListener("input", (event) => {
      const inputValue = (event.target as HTMLInputElement).value;
      this.autoComplete = this.suffixTree.findMatch(inputValue);
    });
  }

  private _getProducts(categoriesFilter?: string[]){
    this.productsService.getProducts(categoriesFilter).subscribe(products => {
      products.forEach(product =>{
        this._addToSuffixTree(product.name.toLowerCase());
      })
    })
  }

  private _addToSuffixTree(str: string){
    this.suffixTree.addString(str, this.suffixTree.root);
  }

  //Buy time in case auto-fill button was clicked & run its function
  onSearchInputBlur(){
    setTimeout(() => {
        this.autoComplete = [];
    }, 200);
  }

  onSearch(event: KeyboardEvent) {
    if(event.key === "Enter"){
      this.searchWord = (event.target as HTMLInputElement).value;
      this.router.navigateByUrl(`/products/search/${this.searchWord}`);
    }  
  }
  onClickAutoComplete(productName: string){
    this.router.navigateByUrl(`/products/search/${productName}`);
  }

  waitUntil(condition: () => boolean, maxAttempts: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let attempts = 0;

      const checkCondition = () => {
        attempts++;

        if (condition()) {
          resolve();
        } else if (attempts >= maxAttempts) {
          reject(new Error('Exceeded maximum attempts'));
        } else {
          setTimeout(checkCondition, 100); // Check again after 100 milliseconds
        }
      };

      checkCondition();
    });
  }
}

export class Node{
  public children: Node[] = [];

  constructor(public value: string, public isEndOfAWord=false){}

  public addChild(node: Node){
    this.children.push(node)
  }

  public hasChild(char: string): boolean{
    for (const child of this.children) {
      if (child.value === char) {
        return true;
      }
    }
    return false;
  }

  //Make sure hasChild is ran before running getChild
  public getChild(char: string): Node {
    for(let i = 0; i < this.children.length; i++){
      if(this.children[i].value === char){
        return this.children[i];
      }
    }
    throw console.error(`No child found with value of ${char}`);
  }
}

export class SuffixTree{
  public root: Node

  constructor(){
    this.root = new Node(null);
  }

  public addString(str: string, currentNode: Node){
    for(let i = 0; i < str.length; i++){
      const char = str[i];
      if(currentNode.children.length === 0 || !currentNode.hasChild(char)){
        currentNode.addChild(new Node(char));
      }
      currentNode = currentNode.getChild(char);
    }
  }

  public findMatch(input: string) : string[]{
    //recommendations is altered within the DFSHelper function
    // eslint-disable-next-line prefer-const
    let recommendations: string[] = [];
    let currentNode = this.root;
    for(let i = 0; i < input.length; i++){
      const char = input[i];
      if(currentNode.hasChild(char)){
        currentNode = currentNode.getChild(char);
      } else {
        break;
      }
    }
    if(currentNode.value === input[input.length-1]){
      this._DFSHelper(currentNode, input.slice(0, input.length-1), recommendations);
    } 
    return recommendations;
  }

  private _DFSHelper(currentNode: Node, input: string, recommendations: string[]){
    if(currentNode.children.length !== 0){
      currentNode.children.forEach(childNode => {
        this._DFSHelper(childNode, input+currentNode.value, recommendations);
      });
    } else {
      recommendations.push(input+currentNode.value);
    }
  } 
}

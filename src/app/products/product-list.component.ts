import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component ({
    //selector:'pm-products', //in comment because we added routes
    templateUrl:`./product-list.component.html`, 
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy {
    PageTitle: string = 'Product List';
    imageWidth: number=50;
    imageMargin: number=2;
    showImage: boolean=false;
    errorMessage: string ='';
    sub!: Subscription;
    //listFilter: string='cart';

    private _listFilter:string = '';
    get listFilter(): string{
      return this._listFilter;
    }
    set listFilter(value: string){
      this._listFilter = value;
      //console.log('baz taw teslek : ', value);
      this.filteredProducts = this.performFilter(value);
    }

    filteredProducts: IProduct[] = [];

    products: IProduct[] = [];
    //private _productService;
    constructor(private productService: ProductService) {
      //this._productService = productService
      this.productService = productService
    }
    toggleImage() : void{
      this.showImage = !this.showImage;
    }
    ngOnInit() : void{
      //this.listFilter = '';
      this.productService.getProduct().subscribe({
        next: products => {
          this.products = products;
          this.filteredProducts = this.products;
        },
        error: err => this.errorMessage = err
      });
      //this.filteredProducts = this.products;
    }
    ngOnDestroy() {
      this.sub.unsubscribe();
    }
    performFilter(filterBy:string) : IProduct[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product:IProduct) => product.productName.toLocaleLowerCase().includes(filterBy))
    }
    onRatingClicked(message:string): void{
      this.PageTitle = 'Product List:'+message;
    }
    
}
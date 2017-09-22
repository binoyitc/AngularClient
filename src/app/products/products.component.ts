import { Component, OnInit } from '@angular/core';
import {ProductsService} from './prodcuts.service';
import { Product } from './products';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsService]
})
export class ProductsComponent implements OnInit {
  data: Object = {};
  public product: Product;
  public products;
  public addFlag = true;
  constructor(private productsService: ProductsService) {
    //this.products = productsService.getProducts();
    productsService.getProducts().subscribe((tempProducts) => {this.products = tempProducts});
    //console.log(this.products);
  }

  ngOnInit() {
    this.productsService.getProducts().subscribe((tempProducts) => {this.products = tempProducts});
  }
  formSubmit(){
    //this.productsService.setProduct(this.data);
    this.productsService.setProduct(this.data).subscribe(
        (newProduct) => {
          this.products = this.products.concat(newProduct);
          console.log(this.products);
          this.data = {};
        }
      )
  }
  loadForUpdate(id: string, name: string, sku: string, price: number){
    this.product = new Product();
    this.product.id = id;
    this.product.name = name;
    this.product.sku = sku;
    this.product.price = price;
    console.log(this.product);
    this.addFlag = false;
  }
  cancelUpdate() {
    this.addFlag = true;
    this.data = {};
  }
  formUpdate(){
    console.log(this.product);
    this.productsService.updateProduct(this.product).subscribe(
        (newProduct) => {
          //this.products = this.products.concat(newProduct);
          this.products = this.products.filter((t) => t.id !== this.product.id);
          this.product.id = newProduct.id;
          this.products = this.products.concat(this.product);
          console.log(this.products);
          this.product = new Product();
          this.addFlag = true;
        }
      )
  }
  deleteProduct(id){
    console.log("delete :" + id);
    this.productsService.delteProduct(id)
    .subscribe(
        (_) => {
          console.log('in side subscribe');
          this.products = this.products.filter((t) => t.id !== id);
        }
      );
  }

}

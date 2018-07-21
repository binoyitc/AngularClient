import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Product } from './products';
import { ProductForUpdate } from './ProductForUpdate';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProductsService {
    private commentsUrl = 'http://cochin1-cochin1.1d35.starter-us-east-1.openshiftapps.com/rest/shop/products';
    constructor(private http: Http) { }

    getProducts(): Observable<Product[]> {
        return this.http
            .get(this.commentsUrl)
            .map(response => {
                const products = response.json();
                return products.map((product) => new Product(product));
            })
            .catch(this.handleError);
    }
    /*getProducts() : Observable<Product[]> {
		return JSON.parse(`[{"_id":"599b3b7ec577052c48330473","name":"TEST",
		"sku":"blablabal1234","price":99.99,"__v":0},{"_id":"599b3b81c577052c48330474",
		"name":"TEST2","sku":"blablabal1234","price":99.99,"__v":0},{"_id":"599b3b85c577052c48330475",
		"name":"TEST3","sku":"blablabal1234","price":99.99,"__v":0}]`);
    }*/
    setProduct(data) {
        let data2 = data; //JSON.parse(`{"name":"TEST59","sku":"blablabal1234","price":99.99}`);
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option
        console.log(data2);
        return this.http.post('http://cochin1-cochin1.1d35.starter-us-east-1.openshiftapps.com/rest/shop/products', JSON.stringify(data2), options)
        .map(response => {
                //const products = response.json();
                return response.json();
            })
        .catch(this.handleError);
    }
    delteProduct(id): Observable<null>{
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option
        return this.http
          .delete('http://cochin1-cochin1.1d35.starter-us-east-1.openshiftapps.com/rest/shop/products/' + id, options)
          .map(response => null)
          .catch(this.handleError); 
          //.subscribe(() => console.log('res'));
    }
    public updateProduct(product: any) {
        let productForUpdate = new ProductForUpdate(product.id, product.name, product.sku, product.price);
    return this.http
      .put('http://cochin1-cochin1.1d35.starter-us-east-1.openshiftapps.com/rest/shop/products/' , productForUpdate)
      .map(response => {
        return new Product(response.json());
      })
      .catch(this.handleError);
  }
    /*setProduct(data){   
        let data2 = data; //JSON.parse(`{"name":"TEST59","sku":"blablabal1234","price":99.99}`);
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option
        console.log(data2);
        this.http.post('http://cochin1-cochin1.1d35.starter-us-east-1.openshiftapps.com/rest/shop/products', JSON.stringify(data2), options)
        .map(res => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error')) //...errors if
        .subscribe();
        console.log('post done');
    }*/
    /*setProductWorking(data){
            
        let data2 = JSON.parse(`{"name":"TEST59",
        "sku":"blablabal1234","price":99.99}`);
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        console.log(data2);
        this.http.post('http://cochin1-cochin1.1d35.starter-us-east-1.openshiftapps.com/rest/shop/products', JSON.stringify(data2), options)
        .map(res => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error')) //...errors if
        .subscribe();
        console.log('post done');        
  
    }*/
    private handleError(error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
    }
}
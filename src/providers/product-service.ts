import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Product } from '../models/product';
import { STARTER_PROD, MAINCOURSE_PROD } from '../models/product.mock';

@Injectable()
export class ProductService {

  constructor(public http: HttpClient) {
  }
  getstarters(): Observable<Product[]> {
    return Observable.of(STARTER_PROD).map(o => o);
  }
  getmaincourse(): Observable<Product[]> {
    return Observable.of(MAINCOURSE_PROD).map(o => o);

  }
  
  handleError(error: any) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}

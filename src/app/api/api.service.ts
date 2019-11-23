import { Injectable } from "@angular/core";
import { IUser } from "./models/user.interface";
import { IProduct } from "./models/product.interface";
import * as faker from "faker";
import { Observable, of, pipe } from "rxjs";
import { map } from "rxjs/operators";

const userList: IUser[] = [
  {
    firstName: "Alexander",
    lastName: "May",
    email: "hello@alexandermay.dev",
    password: "root",
    bankAccount: "111 222 333 444 5"
  }
];

@Injectable({
  providedIn: "root"
})
export class APIService {
  constructor() {
    this.createFakeProducts(30);
  }

  private products: IProduct[] = [];
  /**
   * Returns the user with the given email, or undefined if there is no such user.
   * @param email The email of the user
   */
  public getUserByEmail(email: string): Observable<IUser> {
    return this.getAllUsers().pipe(
      map(users => users.find(user => user.email === email))
    );
  }

  /**
   * Returns an array containing all users of the system
   */
  public getAllUsers(): Observable<IUser[]> {
    return of(userList);
  }

  /**
   * Returns an array containing all products in the system
   */
  public getAllProducts(): Observable<IProduct[]> {
    return of(this.products);
  }

  /**
   * Returns the specific product with the given id
   * @param id The unique identifier of the product
   */
  public getProductById(id: number): Observable<IProduct> {
    return this.getAllProducts().pipe(
      map(products => products.find(product => product.id === id))
    );
  }

  private createFakeProducts(count: number) {
    let id = 1;
    while (count) {
      this.products.push({
        id,
        name: faker.hacker.noun(),
        description: faker.hacker.phrase(),
        price: +faker.commerce.price(),
        stock: Math.random() * (40 - 5) + 5
      });
      count--;
      id++;
    }
  }
}

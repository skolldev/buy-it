import { Injectable, OnDestroy } from "@angular/core";
import { IUser } from "./models/user.interface";
import { IProduct } from "./models/product.interface";
import * as faker from "faker";
import { Observable, of, pipe } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class APIService {
  constructor() {
    this.createFakeProducts(30);
  }

  private products: IProduct[] = [];
  private userList: IUser[] = [
    {
      name: "Alexander May",
      email: "admin@system",
      password: "root",
      bankAccount: "111 222 333 444 5"
    }
  ];
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
    return of(this.userList);
  }

  /**
   * Adds the user to the list of users in the system.
   * No validation is done.
   */
  public addUser(user: IUser): Observable<boolean> {
    this.userList.push(user);
    return of(true);
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

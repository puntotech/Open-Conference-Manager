import { BehaviorSubject, Observable, Subject, of } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Login } from "../models/login";
import { Router } from "@angular/router";
import { User } from "../models/user";
import { UserStoreService } from "../../shared/services/user-store.service";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  public username$: Subject<string> = new BehaviorSubject(null);
  private API_ENDPOINT = "http://localhost:9001/user";
  private _redirectUrl: string;

  constructor(
    private http: HttpClient,
    private userStore: UserStoreService,
    private router: Router
  ) {}

  users: any[] = [
    {
      id: "107640272814502399705",
      name: "Nya García Gallardo",
      email: "nyablk97@gmail.com",
      photoUrl:
        "https://lh3.googleusercontent.com/a-/AOh14Gg7K01nGUKVrWur3azfLfXCI_w7HaHSwKECkSg=s96-c",
      twitter: "https://twitter.com/nyablk",
      github: "https://github.com/NyaGarcia",
    },
  ];

  /* loadUserData() {
    return this.fetchUser()
      .pipe(
        map((res: User) => this.username$.next(res.username)),
        catchError((e) => of(e.message))
      )
      .toPromise();
  } */

  login(user: Login): Observable<any> {
    return this.http.post(`${this.API_ENDPOINT}/login`, user).pipe(
      tap((res: any) => {
        this.userStore.token = res.token;
      }),
      tap(() => this.username$.next(user.username)),
      tap(() => {
        this._redirectUrl
          ? this.router.navigate([this._redirectUrl])
          : this.router.navigate(["/videogames/list"]);
      })
    );
  }

  getUserByEmail(email: string) {
    //return this.http.get<User>(`${this.API_ENDPOINT}/${email}`);
    return of(this.users.find((user) => user.email === email));
  }

  getUserById(id: string) {
    //return this.http.get<User>(`${this.API_ENDPOINT}/${id}`);
    return of(this.users.find((user) => user.id === id));
  }

  update(userID: string, user: User) {
    return this.http.put<User>(`${this.API_ENDPOINT}/${userID}`, user);
  }

  logout() {
    this.userStore.removeToken();
    this.username$.next(null);
  }

  register(user: Login): Observable<any> {
    return this.http.post(`${this.API_ENDPOINT}/register`, user);
  }

  isLoggedIn() {
    return this.userStore.isLoggedIn();
  }

  set redirectUrl(url: string) {
    this._redirectUrl = url;
  }
}

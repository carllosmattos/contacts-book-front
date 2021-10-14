import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Person } from "./person.model";

@Injectable({
  providedIn: "root",
})
export class PersonListService {
  constructor(private http: HttpClient, private _snack: MatSnackBar) {}

  baseUrl: String = environment.baseUrl;

  findAll(): Observable<Person[]> {
    const url = `${this.baseUrl}/persons`;
    return this.http.get<Person[]>(url);
  }

  create(person: Person): Observable<Person> {
    const url = `${this.baseUrl}/persons`;
    return this.http.post<Person>(url, person);
  }

  message(str: String): void {
    this._snack.open(`${str}`, "Ok!", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000,
    });
  }
}

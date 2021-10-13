import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Person } from "./person.model";

@Injectable({
  providedIn: "root",
})
export class PersonListService {
  constructor(private http: HttpClient) {}

  baseUrl: String = environment.baseUrl;

  findAll(): Observable<Person[]> {
    const url = `${this.baseUrl}/persons`;
    return this.http.get<Person[]>(url);
  }
}

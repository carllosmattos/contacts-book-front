import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Contact } from "./contact.model";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient) {}

  finAllByPerson(person_id: String): Observable<Contact[]> {
    const url = `${this.baseUrl}/contacts?person=${person_id}`;
    return this.http.get<Contact[]>(url);
  }
}

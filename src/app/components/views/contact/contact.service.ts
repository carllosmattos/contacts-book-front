import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Contact } from "./contact.model";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private _snack: MatSnackBar) {}

  finAllByPerson(person_id: String): Observable<Contact[]> {
    const url = `${this.baseUrl}/contacts?person=${person_id}`;
    return this.http.get<Contact[]>(url);
  }

  findById(id: String): Observable<Contact> {
    const url = `${this.baseUrl}/contacts/${id}`;
    return this.http.get<Contact>(url);
  }

  update(contact: Contact): Observable<Contact> {
    const url = `${this.baseUrl}/contacts/${contact.id}`;
    return this.http.put<Contact>(url, contact);
  }

  create(contact: Contact, person_id: String): Observable<Contact> {
    const url = `${this.baseUrl}/contacts?person=${person_id}`;
    return this.http.post<Contact>(url, contact);
  }

  delete(id: String): Observable<void> {
    const url = `${this.baseUrl}/contacts/${id}`;
    return this.http.delete<void>(url);
  }

  message(str: String): void {
    this._snack.open(`${str}`, "Ok!", {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 3000,
    });
  }
}

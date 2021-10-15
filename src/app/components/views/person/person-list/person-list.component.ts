import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PersonService } from "../person.service";
import { Person } from "../person.model";
import { Contact } from "../../contact/contact.model";

@Component({
  selector: "app-person-list",
  templateUrl: "./person-list.component.html",
  styleUrls: ["./person-list.component.css"],
})
export class PersonListComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "name",
    "surname",
    "cpf",
    "birthday",
    "contacts",
    "actions",
  ];

  persons: Person[] = [];

  contacts: Contact[] = [];
  person_id: String = "";
  tooltip_text: String = "";

  constructor(private service: PersonService, private router: Router) {}

  ngOnInit(): void {
    this.findAll();
    this.tooltipShow("");
  }

  findAll() {
    this.service.findAll().subscribe((response) => {
      this.persons = response;
    });
  }

  navigateToPersonCreate() {
    this.router.navigate(["persons/create"]);
  }

  findAllContacts(value: string): void {
    this.service.finAllByPerson(value).subscribe((response) => {
      let str: string = "";
      this.contacts = response;

      this.contacts.forEach(function (value) {
        str += value.tipo_contato + " : " + value.valor + ";\n";
      });

      this.tooltip_text = str;
    });
  }

  tooltipShow(value: string): void {
    this.findAllContacts(value);
  }
}

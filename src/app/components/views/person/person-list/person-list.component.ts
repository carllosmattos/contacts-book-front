import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PersonService } from "../person.service";
import { Person } from "../person.model";

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

  constructor(private service: PersonService, private router: Router) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe((response) => {
      this.persons = response;
    });
  }

  navigateToPersonCreate() {
    this.router.navigate(["persons/create"]);
  }
}

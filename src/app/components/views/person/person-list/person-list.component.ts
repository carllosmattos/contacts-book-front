import { Component, OnInit } from "@angular/core";
import { PersonListService } from "../person-list.service";
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

  constructor(private service: PersonListService) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe((response) => {
      console.log(response);
      this.persons = response;
    });
  }
}

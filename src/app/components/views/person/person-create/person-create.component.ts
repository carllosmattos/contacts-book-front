import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PersonListService } from "../person-list.service";
import { Person } from "../person.model";

@Component({
  selector: "app-person-create",
  templateUrl: "./person-create.component.html",
  styleUrls: ["./person-create.component.css"],
})
export class PersonCreateComponent implements OnInit {
  constructor(private service: PersonListService, private router: Router) {}

  person: Person = {
    name: "",
    surname: "",
    cpf: "",
    birthday: new Date(2013, 9, 22),
  };

  ngOnInit(): void {}

  create(): void {
    this.service.create(this.person).subscribe(
      (response) => {
        this.router.navigate(["persons"]);
        this.service.message("Contato salvo com sucesso!");
      },
      (err) => {
        for (let i = 0; i < err.error.errors.length; i++) {
          this.service.message(err.error.errors[i].message);
        }
      }
    );
  }

  cancel(): void {
    this.router.navigate(["persons"]);
  }
}

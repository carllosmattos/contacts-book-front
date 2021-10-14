import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Person } from "../person.model";
import { PersonService } from "../person.service";

@Component({
  selector: "app-person-delete",
  templateUrl: "./person-delete.component.html",
  styleUrls: ["./person-delete.component.css"],
})
export class PersonDeleteComponent implements OnInit {
  person: Person = {
    id: "",
    name: "",
    surname: "",
    cpf: "",
    birthday: new Date(2013, 9, 22),
  };

  constructor(
    private service: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.person.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void {
    this.service.finById(this.person.id!).subscribe((response) => {
      this.person = response;
    });
  }

  delete(): void {
    this.service.delete(this.person.id!).subscribe(
      (response) => {
        this.router.navigate(["persons"]);
        this.service.message("Contato deletado com sucesso!");
      },
      (err) => {
        this.service.message(err.error.error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(["persons"]);
  }
}

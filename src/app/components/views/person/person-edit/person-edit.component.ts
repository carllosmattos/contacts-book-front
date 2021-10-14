import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Person } from "../person.model";
import { PersonService } from "../person.service";

@Component({
  selector: "app-person-edit",
  templateUrl: "./person-edit.component.html",
  styleUrls: ["./person-edit.component.css"],
})
export class PersonEditComponent implements OnInit {
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
      this.person.name = response.name;
      this.person.surname = response.surname;
      this.person.cpf = response.cpf;
      this.person.birthday = response.birthday;
    });
  }

  update(): void {
    this.service.update(this.person).subscribe(
      (response) => {
        this.router.navigate(["persons"]);
        this.service.message("Contato atualizado com sucesso!");
      },
      (err) => {
        this.service.message("Validar preenchimento de campos!");
      }
    );
  }

  cancel(): void {
    this.router.navigate(["persons"]);
  }
}

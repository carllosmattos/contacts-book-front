import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Validations } from "src/helpers/generic-validator";
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

  name = new FormControl("", [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100),
  ]);
  surname = new FormControl("", [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100),
  ]);
  cpf = new FormControl("", [Validators.required, Validations.ValidCpf]);
  birthday = new FormControl("", [Validators.required, Validations.olderAge]);

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
      () => {
        this.router.navigate(["persons"]);
        this.service.message("Contato atualizado com sucesso!");
      },
      () => {
        this.service.message("Validar preenchimento de campos!");
      }
    );
  }

  cancel(): void {
    this.router.navigate(["persons"]);
  }

  getMessageName() {
    if (this.name.invalid) {
      let msg = "";
      this.name.errors?.required ? (msg = `Digite seu nome`) : null;
      Object.keys(this.name.errors?.minlength ?? {}).length > 0
        ? (msg = "Nome muito pequeno!")
        : null;
      Object.keys(this.name.errors?.maxlength ?? {}).length > 0
        ? (msg = "Nome muito grande!")
        : null;
      return msg;
    }
    return false;
  }

  getMessageSurname() {
    if (this.surname.invalid) {
      let msg = "";
      this.surname.errors?.required ? (msg = `Digite seu sobrenome`) : null;
      Object.keys(this.surname.errors?.minlength ?? {}).length > 0
        ? (msg = "Sobrenome muito pequeno!")
        : null;
      Object.keys(this.surname.errors?.maxlength ?? {}).length > 0
        ? (msg = "Sobrenome muito grande!")
        : null;
      return msg;
    }
    return false;
  }

  getMessageCpf() {
    if (this.cpf.invalid) {
      let msg = "";
      this.cpf.errors?.required && this.cpf.errors?.cpfInvalid
        ? (msg = `Digite um CPF`)
        : null;
      this.cpf.errors?.required === undefined && this.cpf.errors?.cpfInvalid
        ? (msg = `CPF inválido!`)
        : null;
      return msg;
    }

    if (this.birthday.errors?.youngerAge) {
      return "Data inválida!";
    }
    return false;
  }

  getMessageBirthday() {
    if (this.birthday.errors?.youngerAge) {
      return "Data inválida!";
    }
    return false;
  }
}

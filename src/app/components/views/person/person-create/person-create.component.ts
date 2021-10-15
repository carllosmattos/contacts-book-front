import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PersonService } from "../person.service";
import { Person } from "../person.model";
import { FormControl, Validators } from "@angular/forms";
import { Validations } from "src/helpers/generic-validator";

@Component({
  selector: "app-person-create",
  templateUrl: "./person-create.component.html",
  styleUrls: ["./person-create.component.css"],
})
export class PersonCreateComponent implements OnInit {
  selected: Date | null | undefined;
  constructor(private service: PersonService, private router: Router) {}

  person: Person = {
    name: "",
    surname: "",
    cpf: "",
    birthday: new Date(),
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

  ngOnInit(): void {}

  create(): void {
    this.person.birthday;
    this.service.create(this.person).subscribe(
      () => {
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

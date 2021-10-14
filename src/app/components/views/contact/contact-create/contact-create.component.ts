import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-contact-create",
  templateUrl: "./contact-create.component.html",
  styleUrls: ["./contact-create.component.css"],
})
export class ContactCreateComponent implements OnInit {
  contactValues: any = {
    typeInput: "",
    typeLabel: "",
    placeholder: "",
  };

  selected = new FormControl("", [Validators.required]);
  value = new FormControl("", [Validators.required]);

  constructor() {}

  ngOnInit(): void {
    this.selectTypeContact("value");
  }

  selectTypeContact(value: String): void {
    value === "EMAIL"
      ? (this.contactValues = {
          typeInput: "email",
          typeLabel: "Email",
          placeholder: "teste@test.com",
        })
      : value === "TELEFONE"
      ? (this.contactValues = {
          typeInput: "phone",
          typeLabel: "Telefone",
          placeholder: "08512345678",
        })
      : (this.contactValues = {
          typeInput: "phone",
          typeLabel: "Celular",
          placeholder: "85123456789",
        });
  }

  getMessage() {
    if (this.selected.invalid) {
      return "Você deve selecionar um tipo de contato!";
    }

    if (this.value.invalid) {
      return `Você deve informar um contato de ${this.contactValues.typeLabel}!`;
    }
    return false;
  }
}

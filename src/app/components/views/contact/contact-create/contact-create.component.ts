import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Contact, ContactType } from "../contact.model";
import { ContactService } from "../contact.service";

@Component({
  selector: "app-contact-create",
  templateUrl: "./contact-create.component.html",
  styleUrls: ["./contact-create.component.css"],
})
export class ContactCreateComponent implements OnInit {
  person_id: String = "";
  contact: Contact = {
    id: "",
    tipo_contato: ContactType.CELULAR,
    valor: "",
  };

  contactValues: any = {
    typeInput: "",
    typeLabel: "",
    placeholder: "",
  };

  selected = new FormControl("", [Validators.required]);
  value = new FormControl("", [Validators.required]);

  constructor(
    private service: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectTypeContact("value");
    this.person_id = this.route.snapshot.paramMap.get("person_id")!;
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

  create(): void {
    this.service.create(this.contact, this.person_id).subscribe(
      () => {
        this.router.navigate([`persons/${this.person_id}/contacts`]);
        this.service.message("Contato salvo com sucesso!");
      },
      () => {
        this.router.navigate([`persons/${this.person_id}/contacts`]);
        this.service.message("Erro ao salvar contato! Tente mais novamente!");
      }
    );
  }

  cancel(): void {
    this.router.navigate([`persons/${this.person_id}/contacts`]);
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

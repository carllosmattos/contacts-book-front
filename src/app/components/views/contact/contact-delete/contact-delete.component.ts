import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Contact, ContactType } from "../contact.model";
import { ContactService } from "../contact.service";

@Component({
  selector: "app-contact-delete",
  templateUrl: "./contact-delete.component.html",
  styleUrls: ["./contact-delete.component.css"],
})
export class ContactDeleteComponent implements OnInit {
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

  constructor(
    private service: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectTypeContact("value");
    this.person_id = this.route.snapshot.paramMap.get("person_id")!;
    this.contact.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
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

  cancel(): void {
    this.router.navigate([`persons/${this.person_id}/contacts`]);
  }

  findById(): void {
    this.service.findById(this.contact.id!).subscribe((response) => {
      this.contact = response;
    });
  }

  delete(): void {
    this.service.delete(this.contact.id!).subscribe(
      () => {
        this.router.navigate([`persons/${this.person_id}/contacts`]);
        this.service.message("Contato excluído com sucesso!");
      },
      () => {
        this.router.navigate([`persons/${this.person_id}/contacts`]);
        this.service.message("Erro ao excluir contato! Volte mais tarde!");
      }
    );
  }
}

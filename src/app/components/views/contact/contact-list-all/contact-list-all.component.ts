import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Contact } from "../contact.model";
import { ContactService } from "../contact.service";

@Component({
  selector: "app-contact-list-all",
  templateUrl: "./contact-list-all.component.html",
  styleUrls: ["./contact-list-all.component.css"],
})
export class ContactListAllComponent implements OnInit {
  displayedColumns: string[] = ["id", "tipo_contato", "valor", "actions"];
  person_id: String = "";

  contacts: Contact[] = [];

  constructor(
    private service: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.person_id = this.route.snapshot.paramMap.get("person_id")!;
    this.findAll();
  }

  findAll(): void {
    this.service.finAllByPerson(this.person_id!).subscribe((response) => {
      this.contacts = response;
      console.log(this.contacts);
    });
  }

  navigateToCreateContact(): void {
    this.router.navigate([`persons/${this.person_id}/contacts/create`]);
  }
}

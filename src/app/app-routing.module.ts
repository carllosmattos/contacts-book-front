import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PersonListComponent } from "./components/views/person/person-list/person-list.component";
import { HomeComponent } from "./components/views/home/home.component";
import { PersonCreateComponent } from "./components/views/person/person-create/person-create.component";
import { PersonDeleteComponent } from "./components/views/person/person-delete/person-delete.component";
import { PersonEditComponent } from "./components/views/person/person-edit/person-edit.component";
import { ContactListAllComponent } from "./components/views/contact/contact-list-all/contact-list-all.component";
import { ContactCreateComponent } from "./components/views/contact/contact-create/contact-create.component";
import { ContactEditComponent } from "./components/views/contact/contact-edit/contact-edit.component";
import { ContactDeleteComponent } from "./components/views/contact/contact-delete/contact-delete.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "persons",
    component: PersonListComponent,
  },
  {
    path: "persons/create",
    component: PersonCreateComponent,
  },
  {
    path: "persons/delete/:id",
    component: PersonDeleteComponent,
  },
  {
    path: "persons/update/:id",
    component: PersonEditComponent,
  },
  {
    path: "persons/:person_id/contacts",
    component: ContactListAllComponent,
  },
  {
    path: "persons/:person_id/contacts/create",
    component: ContactCreateComponent,
  },
  {
    path: "persons/:person_id/contacts/:id/update",
    component: ContactEditComponent,
  },
  {
    path: "persons/:person_id/contacts/:id/delete",
    component: ContactDeleteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

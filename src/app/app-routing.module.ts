import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PersonListComponent } from "./components/views/person/person-list/person-list.component";
import { HomeComponent } from "./components/views/home/home.component";
import { PersonCreateComponent } from "./components/views/person/person-create/person-create.component";
import { PersonDeleteComponent } from "./components/views/person/person-delete/person-delete.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "persons", component: PersonListComponent },
  { path: "persons/create", component: PersonCreateComponent },
  { path: "persons/delete/:id", component: PersonDeleteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PersonListComponent } from "./components/views/person/person-list/person-list.component";
import { HomeComponent } from "./components/views/home/home.component";
import { PersonCreateComponent } from "./components/views/person/person-create/person-create.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "persons", component: PersonListComponent },
  { path: "persons/create", component: PersonCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

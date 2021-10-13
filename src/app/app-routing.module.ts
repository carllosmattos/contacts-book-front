import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PersonListComponent } from "./components/person/person-list/person-list.component";
import { HomeComponent } from "./components/views/home/home.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "persons", component: PersonListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

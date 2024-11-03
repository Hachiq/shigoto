import { Routes } from "@angular/router";
import { HomeComponent } from "../../modules/home/home.component";

export const mainRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
]
import { Routes } from "@angular/router";
import { MainListComponent } from "../../modules/main-list/main-list.component";

export const animeListRoutes: Routes = [
  { path: 'most-popular', component: MainListComponent },
  { path: 'movie', component: MainListComponent },
  { path: 'tv', component: MainListComponent },
  { path: 'ova', component: MainListComponent },
  { path: 'ona', component: MainListComponent },
  { path: 'special', component: MainListComponent },
]
import { Routes } from "@angular/router";

export const wildcard: Routes = [
  { path: '**', redirectTo: 'home' }
]
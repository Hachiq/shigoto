import { Routes } from '@angular/router';
import { RegisterComponent } from '../core/components/register/register.component';
import { LoginComponent } from '../core/components/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
];

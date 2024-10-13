import { Routes } from '@angular/router';
import { RegisterComponent } from '../core/components/register/register.component';
import { LoginComponent } from '../core/components/login/login.component';
import { HomeComponent } from '../modules/home/home.component';
import { ProfileComponent } from '../modules/user/pages/profile/profile.component';
import { ContinueWatchingComponent } from '../modules/user/pages/continue-watching/continue-watching.component';
import { WatchListComponent } from '../modules/user/pages/watch-list/watch-list.component';
import { SettingsComponent } from '../modules/user/pages/settings/settings.component';
import { NotificationComponent } from '../modules/user/pages/notification/notification.component';
import { UserComponent } from '../modules/user/user.component';
import { ConfirmEmailComponent } from '../core/components/confirm-email/confirm-email.component';
import { MainListComponent } from '../modules/main-list/main-list.component';
import { AnimeDetailsComponent } from '../modules/anime-details/anime-details.component';

// TODO: Split them into different files
export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  { path: 'subbed-anime', component: MainListComponent },
  { path: 'dubbed-anime', component: MainListComponent },
  { path: 'most-popular', component: MainListComponent },
  { path: 'movie', component: MainListComponent },
  { path: 'tv', component: MainListComponent },
  { path: 'ova', component: MainListComponent },
  { path: 'ona', component: MainListComponent },
  { path: 'special', component: MainListComponent },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'continue-watching', component: ContinueWatchingComponent },
      { path: 'watch-list', component: WatchListComponent },
      { path: 'notification', component: NotificationComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
    ]
  },
  { path: ':slugId', component: AnimeDetailsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

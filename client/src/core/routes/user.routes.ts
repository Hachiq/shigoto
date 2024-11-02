import { Routes } from "@angular/router";
import { UserComponent } from "../../modules/user/user.component";
import { ProfileComponent } from "../../modules/user/pages/profile/profile.component";
import { ContinueWatchingComponent } from "../../modules/user/pages/continue-watching/continue-watching.component";
import { NotificationComponent } from "../../modules/user/pages/notification/notification.component";
import { SettingsComponent } from "../../modules/user/pages/settings/settings.component";
import { WatchListComponent } from "../../modules/user/pages/watch-list/watch-list.component";

export const userRoutes: Routes = [
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
  }
]
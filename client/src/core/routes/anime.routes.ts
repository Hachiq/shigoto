import { Routes } from "@angular/router";
import { AnimeDetailsComponent } from "../../modules/anime-details/anime-details.component";
import { WatchComponent } from "../../modules/watch/watch.component";

export const animeRoutes: Routes = [
  { path: ':slugId', component: AnimeDetailsComponent },
  { path: 'watch/:slugId', component: WatchComponent },
]
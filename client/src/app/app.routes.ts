import { Routes } from '@angular/router';
import { mainRoutes } from "../core/routes/main.routes";
import { authRoutes } from "../core/routes/auth.routes";
import { userRoutes } from "../core/routes/user.routes";
import { animeRoutes } from "../core/routes/anime.routes";
import { animeListRoutes } from "../core/routes/anime-list.routes";
import { wildcard } from '../core/routes/wildcard.route';

// Do not forget: The order of routes is important because the Router uses a first-match wins strategy!

export const routes: Routes = [
  ...authRoutes,
  ...userRoutes,
  ...animeListRoutes,
  ...mainRoutes,
  ...animeRoutes,
  ...wildcard
]
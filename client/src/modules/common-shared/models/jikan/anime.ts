import { Title } from "@angular/platform-browser";
import { Aired } from "./aired";
import { Broadcast } from "./broadcast";
import { Genre } from "./genre";
import { Images } from "./images";
import { Producer } from "./producer";
import { Trailer } from "./trailer";
import { Licensor } from "./licensor";
import { Studio } from "./studio";
import { ExplicitGenre } from "./explicit-genre";
import { Theme } from "./theme";
import { Demographic } from "./demographic";

export interface Anime {
  mal_id: number;
  url: string;
  images: Images;
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: Broadcast;
  producers: Producer[];
  licensors: Licensor[];
  studios: Studio[];
  genres: Genre[];
  explicit_genres: ExplicitGenre[];
  themes: Theme[];
  demographics: Demographic[];
}
import { Anime } from "./anime";
import { Pagination } from "./pagination";

export interface AnimeSearch {
  data: Anime[];
  pagination: Pagination;
}
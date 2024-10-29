import { AnimeEpisode } from "./anime-episode";
import { PaginationMinimal } from "./pagination-minimal";

export interface AnimeEpisodes {
  data: AnimeEpisode[];
  pagination: PaginationMinimal;
}
import { AnimeEpisode } from "./anime-episode";
import { PaginationMinimal } from "./pagination-minimal";

export interface AnimeEpisodeData {
  data: AnimeEpisode[];
  pagination: PaginationMinimal;
}
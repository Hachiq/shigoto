import { ANIME_RELATIONS } from "../constants/anime-relations";
import { relationPriorities } from "../constants/relation-priorities";
import { AnimeRelations } from "../models/jikan/anime-relations";
import { RelationEntry } from "../models/jikan/relation-entry";

export function mapRelationEntries(data: AnimeRelations[], current: RelationEntry) {
  let result = [];

  // Add Prequel if it exists
  const prequel = data.find(item => item.relation === ANIME_RELATIONS.Prequel);
  if (prequel && prequel.entry.length > 0) {
    result.push(prequel.entry[0]);
  }

  // Add Current Anime
  result.push(current);

  // Add Sequel if it exists
  const sequel = data.find(item => item.relation === ANIME_RELATIONS.Sequel);
  if (sequel && sequel.entry.length > 0) {
    result.push(sequel.entry[0]);
  }

  // Add one random entry from each remaining relation in order of priority
  relationPriorities.forEach(priority => {
    const item = data.find(item => item.relation === priority);
    if (item && item.entry.length > 0) {
      result.push(item.entry[Math.floor(Math.random() * item.entry.length)]); // Choose a random entry if multiple
    }
  });

  // Limit result to maximum of 6 entries
  return result.slice(0, 4);
}
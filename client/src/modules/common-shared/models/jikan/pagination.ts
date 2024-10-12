import { PaginationItems } from "./pagination-items";

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  items: PaginationItems;
}
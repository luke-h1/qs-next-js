export interface PaginatedList<T> {
  results: T[];
  paging: Paging;
}

export interface Paging {
  query: string;
  page: number;
  totalPages: number;
  totalResults: number;
}

export interface Commission {
  commission: number;
  type_commission: number;
}

export interface FilterSearch {
  from: Date;
  to: Date;
}
export interface PaginateResult<T> {
  docs: Array<T>;
  total?: number;
  limit?: number;
  page?: number;
  pages?: number;
  offset?: number;
}
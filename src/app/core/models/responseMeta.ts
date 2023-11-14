export interface BaseResponse<T> {
  content: T,
  totalElement: number;
  totalPages: number;
  totalElements: number;
  totalPage: number;
  numberOfElements: number;
  size: number;
  number: number;
}

export interface Meta<T> {
  filter: string;
  sort: Sort[];
  pagination: T;
}

export interface PaginationResponse {
  totalElements: number;
  totalPages: number;
  numberOfElements: number;
  size: number;
  number: number;
}

export interface Messages {
  code: string;
  field: string;
  message: string;
  type: string;
}

export interface PaginationRequest {
  page: number | string;
  size: number | string;
}

export interface Sort {
  field: string;
  direction: SortDirection | string;
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}


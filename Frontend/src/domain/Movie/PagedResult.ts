import { PagedResultDTO } from "../dto/PagedResultDTO";

export class PagedResult<T> {
  public items: T[];
  public totalRecords: number;
  public pageNumber: number;
  public pageSize: number;
  public totalPages: number;

  constructor(data: PagedResultDTO<T>) {
    this.items = data.items;
    this.totalRecords = data.totalRecords;
    this.pageNumber = data.pageNumber;
    this.pageSize = data.pageSize;
    this.totalPages = data.totalPages;
  }
}

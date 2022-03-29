export interface IListItem {
    Id: number;
    [index: string]: any;
}

export interface IListItemCollection {
    value: IListItem[];
    [index: string]: any;
}

export interface ICheckLogListItem {
    // ['@odata.etag']?: string;
    // ['@odata.type']?: string;
    // Id: number;
    // Title?: string;
    [property: string]: string;
  }
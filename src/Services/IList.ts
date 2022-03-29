export interface IList {
    Id: string;
    Title: string;
    [index: string]: any;
}

export interface IListCollection {
    value: IList[];
}

export interface IDropdownOption {

}
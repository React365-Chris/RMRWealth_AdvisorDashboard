import { WebPartContext } from "@microsoft/sp-webpart-base";

export default interface ICheckLogListProps {
    items: string[];
    context: WebPartContext;
}
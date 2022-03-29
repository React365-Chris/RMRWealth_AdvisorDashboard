import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { IListItem } from "../../../Services/IListItem";

export interface IAdvisorDashboardProps {
  description: string;
  themeVariant: IReadonlyTheme | undefined;
  context: WebPartContext;
}

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';

import * as strings from 'AdvisorDashboardWebPartStrings';
import AdvisorDashboard from './components/AdvisorDashboard';
import { IAdvisorDashboardProps } from './components/IAdvisorDashboardProps';
import SharePointService from '../../Services/SharePointService';
import { ThemeProvider, ThemeChangedEventArgs,IReadonlyTheme } from '@microsoft/sp-component-base';
import { getSP } from './pnpjsConfig';

export interface IAdvisorDashboardWebPartProps {
  description: string;
}

export default class AdvisorDashboardWebPart extends BaseClientSideWebPart<IAdvisorDashboardWebPartProps> {
  
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;

  protected async onInit(): Promise<void> {

    super.onInit();
    
    getSP(this.context);
    
    /* if (!Providers.globalProvider) {
      Providers.globalProvider = new SharePointProvider(this.context);
    } */

    SharePointService.setup(this.context);

  /*   this._themeProvider = this.context.serviceScope.consume(
      ThemeProvider.serviceKey
    );

    this._themeVariant = this._themeProvider.tryGetTheme();

    this._themeProvider.themeChangedEvent.add(
      this,
      this._handleThemeChangedEvent
    ); */
        
  }

  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this.render();
  }

  public render(): void {
    const element: React.ReactElement<IAdvisorDashboardProps> = React.createElement(
      AdvisorDashboard,
      {
        context: this.context,
        themeVariant: this._themeVariant,
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

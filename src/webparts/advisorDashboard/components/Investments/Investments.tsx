import * as React from 'react';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { IFile, IResponseItem } from "../interfaces";

import { Caching } from "@pnp/queryable";
import { getSP } from "../../pnpjsConfig";
import { SPFI, spfi } from "@pnp/sp";
import { Logger, LogLevel } from "@pnp/logging";
import { IItemUpdateResult } from "@pnp/sp/items";
import { Label, PrimaryButton } from '@microsoft/office-ui-fabric-react-bundle';
import { IAdvisorDashboardProps } from '../IAdvisorDashboardProps';


const logStyle = mergeStyles({
  display: 'block',
  marginLeft: "25px",
  width: '800px',
  minWidth: '400px'
});

const headerStyle = mergeStyles({
  textAlign: 'center',
});
function Investments() {
  async function _readAllFilesSize (): Promise<void> {
    try {
      // do PnP JS query, some notes:
      //   - .expand() method will retrive Item.File item but only Length property
      //   - .get() always returns a promise
      //   - await resolves proimises making your code act syncronous, ergo Promise<IResponseItem[]> becomes IResponse[]

      //Extending our sp object to include caching behavior, this modification will add caching to the sp object itself
      //this._sp.using(Caching("session"));

      //Creating a new sp object to include caching behavior. This way our original object is unchanged.
      const spCache = spfi(this._sp).using(Caching({ store: "session" }));

      const response: IResponseItem[] = await spCache.web.lists
        .getByTitle(this.LIBRARY_NAME)
        .items
        .select("Id", "Title", "FileLeafRef", "File/Length")
        .expand("File/Length")();

      // use map to convert IResponseItem[] into our internal object IFile[]
      const items: IFile[] = response.map((item: IResponseItem) => {
        return {
          Id: item.Id,
          Title: item.Title || "Unknown",
          Size: item.File?.Length || 0,
          Name: item.FileLeafRef
        };
      });

      // Add the items to the state
      this.setState({ items });
    } catch (err) {
      Logger.write(`${this.LOG_SOURCE} (_readAllFilesSize) - ${JSON.stringify(err)} - `, LogLevel.Error);
    }
  }
  return (
    <div className={logStyle}>
      <h1 className={headerStyle}>Investments</h1>
    </div>
  );
}

export default Investments;
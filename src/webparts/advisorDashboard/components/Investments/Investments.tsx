import * as React from 'react';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { IFile, IResponseItem } from "../interfaces";

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
  return (
    <div className={logStyle}>
      <h1 className={headerStyle}>Investments</h1>
    </div>
  );
}

export default Investments;
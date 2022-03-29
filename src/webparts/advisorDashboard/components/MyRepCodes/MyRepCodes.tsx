import * as React from "react";
import {
  ListView,
  IViewField,
  SelectionMode,
} from "@pnp/spfx-controls-react/lib/ListView";
import { mergeStyles } from "@fluentui/react/lib/Styling";
import { Loader } from "@fluentui/react-northstar";


const headerStyle = mergeStyles({
  textAlign: "center",
});

const mainStyle = mergeStyles({
  margin: '20px',
});

const formatColumn = mergeStyles({
  wordWrap: "break-word",
  maxWidth:"300px",
});

const viewFields: IViewField[] = [
  {
    name: "RepCode",
    displayName: "Rep Code",
    isResizable: true,
    sorting: true,
    minWidth: 75,
    maxWidth: 125,
  },
  {
    name: "RepDescription",
    displayName: "Rep Description",
    isResizable: true,
    sorting: true,
    minWidth: 200,
    maxWidth: 350,
  },   
  {
    name: "CO",
    displayName: "Type",
    isResizable: true,
    sorting: true,
    minWidth: 40,
    maxWidth: 100,
  },
  {
    name: "Payout",
    displayName: "Payout",
    isResizable: true,
    sorting: true,
    minWidth: 50,
    maxWidth: 100,
    render: (item) => {
      const percent = parseFloat(item.Payout).toFixed(2).toString().slice(2) + " %";      
      return <span>{percent}</span>;
    },
  },
  {
    name: "TDAmeritradeNonWrapCode",
    displayName: "TD Non Wrap Code",
    isResizable: true,
    sorting: true,
    minWidth: 140,
    maxWidth: 250,
  },
  {
    name: "TDAmeritradeWrapCode",
    displayName: "TD Wrap Code",
    isResizable: true,
    sorting: true,
    minWidth: 110,
    maxWidth: 250,
  },
  {
    name: "SpecialGNumber",
    displayName: "Special G Number",
    isResizable: true,
    sorting: true,
    minWidth: 150,
    maxWidth: 250,
  },
  {
    name: "TransferRights",
    displayName: "Transfer Rights",
    isResizable: true,
    sorting: true,
    minWidth: 150,
    maxWidth: 350,
  },
  {
    name: "Comments",
    displayName: "Comments",
    isResizable: true,
    sorting: true,
    minWidth: 300,
    maxWidth: 500,
    render: (item) => {       
      return <div className={formatColumn}>{item.Comments}</div>;
    },
  },  
];

function RepCodes(props: any) {
  return (
    <div className={mainStyle}>
      {props.items.loading === true ? (
        <div>
          <Loader label="Initializing system" size="largest" />
        </div>
      ) : (
        <div>
          <h1 className={headerStyle}>My Rep Codes</h1>
          <ListView
            items={props.items}
            viewFields={viewFields}
            compact={true}
            selectionMode={SelectionMode.none}
            showFilter={true}
            filterPlaceHolder="Search..."
            dragDropFiles={true}
            stickyHeader={true}
          />
        </div>
      )}
    </div>
  );
}

export default RepCodes;
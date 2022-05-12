import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";

import SharePointService from "../../../Services/SharePointService";
import {
  ListView,
  IViewField,
  SelectionMode,
  GroupOrder, IGrouping
} from "@pnp/spfx-controls-react/lib/ListView";
import { mergeStyles,mergeStyleSets } from "@fluentui/react/lib/Styling";
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

const classNames = mergeStyleSets({
  controlWrapper: {
    display: 'block',
    marginBottom: '10px',
    height: '650px'
  },
  listView: {
    height: '100%',
  }
});

const viewFields: IViewField[] = [
  {
    name: "RepCode.Title",
    displayName: "Rep Code",
    isResizable: true,
    sorting: true,
    minWidth: 75,
    maxWidth: 125,
  },
  {
    name: "Rep.Title",
    displayName: "Rep Name",
    isResizable: true,
    sorting: true,
    minWidth: 150,
    maxWidth: 250,
  },
  {
    name: "RepCode.Rep_x0020_Description",
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
    name: "RepCode.TDAmeritradeNonWrapCode",
    displayName: "TD Non Wrap Code",
    isResizable: true,
    sorting: true,
    minWidth: 140,
    maxWidth: 250,
  },
  {
    name: "RepCode.TDAmeritradeWrapCode",
    displayName: "TD Wrap Code",
    isResizable: true,
    sorting: true,
    minWidth: 110,
    maxWidth: 250,
  },
  {
    name: "RepCode.calculateSpecialG",
    displayName: "Special G Number",
    isResizable: true,
    sorting: true,
    minWidth: 150,
    maxWidth: 250,
  },
  {
    name: "RepCode.calcualteTransferRights",
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

const groupByFields: IGrouping[] = [
  {
    name: "Rep.Title", 
    order: GroupOrder.ascending 
  }
];

function RepCodes(props: any) {
  //make call here and set items
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(null);

  useEffect(() => {    
    SharePointService.getOperations(`/_api/web/lists/GetById('2dd73365-9267-40f9-8411-c931668c2003')/items?$Select=PostToAccount,Title,CO,Payout,RepCodeId,Rep/EMail,Rep/Title,RepCode/calculateStatus,RepCode/Title,RepCode/Rep_x0020_Description,RepCode/TDAmeritradeNonWrapCode,RepCode/TDAmeritradeWrapCode,RepCode/calculateType,RepCode/calculateSpecialG,RepCode/calcualteTransferRights&$filter=RepCode/calculateStatus eq 'Active' &$expand=Rep,RepCode&$top=10000`).then(
      (res) => {
        console.log('loaded items');
        setItems(res.value);
        setLoading(false);
      }
    );
  },[]) 

  return (
    <div className={mainStyle}>
      {loading === true ? (
        <div>
          <Loader label="Initializing system" size="largest" />
        </div>
      ) : (
        <div>
        <h1 className={headerStyle}>Rep Codes ({items.length})</h1>
        <div className={classNames.controlWrapper}>
           <ListView
            items={items}
            viewFields={viewFields}
            compact={true}
            selectionMode={SelectionMode.none}
            showFilter={true}
            filterPlaceHolder="Search rep codes..."
            dragDropFiles={false}
            stickyHeader={true}
            className={classNames.listView}
            groupByFields={groupByFields}
          />
        </div>
        </div>
      )}
    </div>
  );
}

export default RepCodes;
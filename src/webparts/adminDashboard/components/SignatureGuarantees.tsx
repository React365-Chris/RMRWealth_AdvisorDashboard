import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";

import SharePointService from "../../../Services/SharePointService";
import {
  ListView,
  IViewField,
  SelectionMode,
  IGrouping,
  GroupOrder,
} from "@pnp/spfx-controls-react/lib/ListView";
import { mergeStyles } from "@fluentui/react/lib/Styling";
import { Loader } from "@fluentui/react-northstar";

const headerStyle = mergeStyles({
  textAlign: "center",
});

const mainStyle = mergeStyles({
  margin: "20px",
});

const formatColumn = mergeStyles({
  wordWrap: "break-word",
  maxWidth: "300px",
});
const viewFields: IViewField[] = [
  {
    name: "FileLeafRef",
    displayName: "Name",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 250,
  },
  {
    name: "AccountNumber",
    displayName: "Account Number",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 150,
  },
  {
    name: "RelationshipName",
    displayName: "Relationship Name",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 150,
  },
  {
    name: "ContactName",
    displayName: "Contact Name",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 150,
  },
  {
    name: "ContactName2",
    displayName: "Contact Name2",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 150,
  },
  {
    name: "EntityName",
    displayName: "Entity Name",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 150,
  },
  {
    name: "DateReceived",
    displayName: "Date Received",
    isResizable: true,
    sorting: true,
    minWidth: 120,
    maxWidth: 150,
    render: (item) => {
      const d = new Date(item.DateReceived);
      const noTime =
        d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
      return <span>{noTime}</span>;
    },
  },
  {
    name: "RepID.Title",
    displayName: "Rep Code",
    isResizable: true,
    sorting: true,
    minWidth: 150,
    maxWidth: 350,
  },
  {
    name: "Product",
    displayName: "Product",
    isResizable: true,
    sorting: true,
    minWidth: 150,
    maxWidth: 350,
  },
  {
    name: "Reason",
    displayName: "Reason",
    isResizable: true,
    sorting: true,
    minWidth: 150,
    maxWidth: 350,
  },
  {
    name: "Amount",
    displayName: "Amount",
    isResizable: true,
    sorting: true,
    minWidth: 150,
    maxWidth: 350,
  },
  {
    name: "Shares",
    displayName: "Shares",
    isResizable: true,
    sorting: true,
    minWidth: 150,
    maxWidth: 350,
  },
  {
    name: "Processor.Title",
    displayName: "Processor Name",
    isResizable: true,
    sorting: true,
    minWidth: 150,
    maxWidth: 350,
  },
  {
    name: "ReadyforReview",
    displayName: "Ready for Review",
    isResizable: true,
    sorting: true,
    minWidth: 150,
    maxWidth: 350,
  },
  {
    name: "Recommendations",
    displayName: "Recommendations",
    isResizable: true,
    sorting: true,
    minWidth: 150,
    maxWidth: 350,
  },
  {
    name: "Modified",
    displayName: "Modified",
    isResizable: true,
    sorting: true,
    minWidth: 150,
    maxWidth: 350,
    render: (item) => {
        const d = new Date(item.Modified);
        const noTime =
          d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
        return <span>{noTime}</span>;
      },
  },
  {
    name: "Editor.Title",
    displayName: "Editor",
    isResizable: true,
    sorting: true,
    minWidth: 150,
    maxWidth: 350,
  }  
];

const groupByFields: IGrouping[] = [
  {
    name: "ReadyforReview",
    order: GroupOrder.descending,
  },
];

function _getSelection(item: any[]) {
    alert('selected');//, item[0].Title
}

function SignatureGuarantees(props: any) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(null);
  useEffect(() => {
    SharePointService.getOperations(
      `/_api/web/lists/GetById('f9c10533-42bb-46e8-b34d-c0aa7070b024')/items?$Select=FileLeafRef,Title,AccountNumber,RelationshipName,ContactName,ContactName2,EntityName,DateReceived,RepID/Title,Product,Reason,Amount,Shares,Processor/Title,ReadyforReview,Recommendations,Modified,Editor/Title&$expand=Processor,RepID,Editor&$top=10000`
    ).then((res) => {
      console.log("loaded items", res.value);
      setItems(res.value);
      setLoading(false);
    });
  }, []);

  return (
    <div className={mainStyle}>
      {loading === true ? (
        <div>
          <Loader label="Initializing system" size="largest" />
        </div>
      ) : (
        <div>
          <h1 className={headerStyle}>Signature Guarantees ({items.length})</h1>
          <ListView
            items={items}
            viewFields={viewFields}
            compact={true}
            selectionMode={SelectionMode.single}
            showFilter={true}
            filterPlaceHolder="Search signature guarantees..."
            dragDropFiles={false}
            stickyHeader={true}
            selection={_getSelection}
            groupByFields={groupByFields}
          />
        </div>
      )}
    </div>
  );
}

export default SignatureGuarantees;

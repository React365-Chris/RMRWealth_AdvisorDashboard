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
      name: "FileLeafRef",
      displayName: "Name",
      isResizable: true,
      sorting: true,
      minWidth: 100,
      maxWidth: 150,
    },
    {
      name: "AccountNumber",
      displayName: "Account Number",
      isResizable: true,
      sorting: true,
      minWidth: 150,
      maxWidth: 250,
    },
    {
      name: "RelationshipName",
      displayName: "Relationship Name",
      isResizable: true,
      sorting: true,
      minWidth: 250,
      maxWidth: 350,
    },
    {
      name: "ContactName",
      displayName: "Contact Name",
      isResizable: true,
      sorting: true,
      minWidth: 150,
      maxWidth: 250,
    },
    {
      name: "Contact2Name",
      displayName: "Contact2 Name",
      isResizable: true,
      sorting: true,
      minWidth: 150,
      maxWidth: 250,
    },
    {
      name: "EntityName",
      displayName: "Entity Name",
      isResizable: true,
      sorting: true,
      minWidth: 250,
      maxWidth: 350,
    },
    {
      name: "DateReceived",
      displayName: "Date Received",
      isResizable: true,
      sorting: true,
      minWidth: 100,
      maxWidth: 100,
      render: (item) => {
        const d = new Date(item.DateReceived);
        const noTime =
          d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
        return <span>{noTime}</span>;
      },
    },
    {
      name: "BranchReceived.Title",
      displayName: "Branch Received",
      isResizable: true,
      sorting: true,
      minWidth: 100,
      maxWidth: 150,
    },
    {
      name: "CheckAmount",
      displayName: "Check Amount",
      isResizable: true,
      sorting: true,
      minWidth: 100,
      maxWidth: 150,
      render: (item) => {
        let val = item.CheckAmount;
        let amt = val.toLocaleString("en-US");
        return <span>${amt}</span>;
      },
    },
    {
      name: "CheckNumber",
      displayName: "CheckNumber",
      isResizable: true,
      sorting: true,
      minWidth: 100,
      maxWidth: 150,
    },
    {
      name: "DateForwarded",
      displayName: "Date Forwarded",
      isResizable: true,
      sorting: true,
      minWidth: 100,
      maxWidth: 100,
      render: (item) => {
        const d = new Date(item.DateForwarded);
        const noTime =
          d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
        return <span>{noTime}</span>;
      },
    },
    {
      name: "ForwardedTo",
      displayName: "Forwarded To",
      isResizable: true,
      sorting: true,
      minWidth: 100,
      maxWidth: 150,
    },
    {
      name: "TrackingInformation",
      displayName: "TrackingInformation",
      isResizable: true,
      sorting: true,
      minWidth: 100,
      maxWidth: 150,
    },
    {
      name: "Processor.Title",
      displayName: "Processor",
      isResizable: true,
      sorting: true,
      minWidth: 100,
      maxWidth: 150,
    },
    {
      name: "ReadyforReview",
      displayName: "Ready for Review",
      isResizable: true,
      sorting: true,
      minWidth: 100,
      maxWidth: 150,
    },
    {
      name: "Modified",
      displayName: "Modified",
      isResizable: true,
      sorting: true,
      minWidth: 100,
      maxWidth: 100,
      render: (item) => {
        const d = new Date(item.DateForwarded);
        const noTime =
          d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
        return <span>{noTime}</span>;
      },
    },
    {
      name: "Editor.Title",
      displayName: "Modified By",
      isResizable: true,
      sorting: true,
      minWidth: 100,
      maxWidth: 150,
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

function CheckLog(props: any) {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState(null);
    useEffect(() => {    
        SharePointService.getOperations(`/_api/web/lists/GetById('ce2fd595-41d8-4ceb-a5dd-6c416a7befbe')/items?$select=Editor/Title,Modified,ReadyforReview,Processor/Title,TrackingInformation,ForwardedTo,DateForwarded,CheckNumber,CheckAmount,BranchReceived0/Title,DateReceived,EntityName,Contact2Name,ContactName,RelationshipName,AccountNumber,FileLeafRef&$expand=Editor,Processor,BranchReceived0&$top=10000&$orderby=DateReceived desc`).then(
          (res) => {
            console.log('loaded items',res.value);
            setItems(res.value);
            setLoading(false);
          }
        );
      },[]) 

    return ( <div className={mainStyle}>
        {loading === true ? (
          <div>
            <Loader label="Initializing system" size="largest" />
          </div>
        ) : (
          <div>
            <h1 className={headerStyle}>
              Check Log ({items.length})
            </h1>
            <div className={classNames.controlWrapper}>
            <ListView
              items={items}
              viewFields={viewFields}
              compact={true}
              selectionMode={SelectionMode.single}
              showFilter={true}
              filterPlaceHolder="Search checklogs..."
              dragDropFiles={false}
              stickyHeader={true}
              selection={_getSelection}
              groupByFields={groupByFields}
              className={classNames.listView}
            />
          </div>
          </div>
        )}
        </div>
     );
}

export default CheckLog;
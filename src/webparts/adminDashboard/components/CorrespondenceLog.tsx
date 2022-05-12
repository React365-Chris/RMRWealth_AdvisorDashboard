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
    margin: '20px',
  });
  
  const formatColumn = mergeStyles({
    wordWrap: "break-word",
    maxWidth:"300px",
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
      name: "CorrespondenceType",
      displayName: "Type",
      isResizable: true,
      sorting: true,
      minWidth: 100,
      maxWidth: 150,
    },
    {
      name: "DateReceivedSent",
      displayName: "Date Received/Sent",
      isResizable: true,
      sorting: true,
      minWidth: 120,
      maxWidth: 150,
      render: (item) => {
        const d = new Date(item.DateReceivedSent);
        const noTime =
          d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
        return <span>{noTime}</span>;
      },
    },
    {
      name: "Recommendations",
      displayName: "Recommendations",
      isResizable: true,
      sorting: true,
      minWidth: 150,
      maxWidth: 350,    
    },
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

function CorrespondenceLog(props: any) {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState(null);
    useEffect(() => {    
        SharePointService.getOperations(`/_api/web/lists/GetById('5011a439-fc91-4da5-9d98-8bcc317c43db')/items?`).then(
          (res) => {
            console.log('loaded items',res.value);
            setItems(res.value);
            setLoading(false);
          }
        );
      },[]) 
      
    return (  <div className={mainStyle}>
        {loading === true ? (
          <div>
            <Loader label="Initializing system" size="largest" />
          </div>
        ) : (
          <div>
            <h1 className={headerStyle}>
            Correspondence Log ({items.length})
            </h1>
            <ListView
              items={items}
              viewFields={viewFields}
              compact={true}
              selectionMode={SelectionMode.single}
              showFilter={true}
              filterPlaceHolder="Search corresopondence..."
              dragDropFiles={false}
              stickyHeader={true}
              selection={_getSelection}
              groupByFields={groupByFields}
            />
          </div>
        )}
        </div> );
}

export default CorrespondenceLog;
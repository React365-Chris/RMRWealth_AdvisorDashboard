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

function Complaints(props: any) {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState(null);
    useEffect(() => {    
        SharePointService.getOperations(`/_api/web/lists/GetById('8b533c1-e32a-4b2c-bad1-40c78100958b')/items?$top=10000`).then(
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
            Complaint Log ({items.length})
            </h1>
            <ListView
              items={items}
              viewFields={viewFields}
              compact={true}
              selectionMode={SelectionMode.single}
              showFilter={true}
              filterPlaceHolder="Search complaints..."
              dragDropFiles={false}
              stickyHeader={true}
              selection={_getSelection}
              groupByFields={groupByFields}
            />
          </div>
        )}
        </div> );
}

export default Complaints;
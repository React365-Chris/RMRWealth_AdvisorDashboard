import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import SharePointService from "../../../Services/SharePointService";
import { mergeStyles,mergeStyleSets } from "@fluentui/react/lib/Styling";
import { Loader } from "@fluentui/react-northstar";
import {
    ListView,
    IViewField,
    SelectionMode,
    GroupOrder, IGrouping
  } from "@pnp/spfx-controls-react/lib/ListView";
import {
    FilePicker,
    IFilePickerResult,
  } from "@pnp/spfx-controls-react/lib/FilePicker";
  const classNames = mergeStyleSets({
    controlWrapper: {
      display: 'block',
      marginBottom: '10px',
      height: '650px'
    },
    listView: {
      height: "275px",
    },
    mainStyle: {
      margin: '20px', 
    }
});

const viewFields: IViewField[] = [
    {
      name: "FileLeafRef",
      displayName: "Name",
      isResizable: true,
      sorting: true,
      minWidth: 200,
      maxWidth: 350,
    },
    {
      name: "AccountNumber0",
      displayName: "Account Number",
      isResizable: true,
      sorting: true,
      minWidth: 100,
      maxWidth: 150,
    },
    {
      name: "DocType.Title",
      displayName: "DocType",
      isResizable: true,
      sorting: true,
      minWidth: 100,
      maxWidth: 150,
    },
    {
      name: "ItemStatus0",
      displayName: "Item Status",
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
      name: "Modified",
      displayName: "Modified",
      isResizable: true,
      sorting: true,
      minWidth: 100,
      maxWidth: 100,
      render: (item) => {
        const d = new Date(item.Modified);
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
      minWidth: 130,
      maxWidth: 170,
    }
  ];
  
const groupByFields: IGrouping[] = [
    {
      name: "ReadyforReview",
      order: GroupOrder.descending,
    },
];

function _getSelection(item: any[]) {
    console.log('Selected items:', item["0"].ServerRedirectedEmbedUri);
    window.open(item["0"].ServerRedirectedEmbedUri, '_blank');
  }

function SelectedFidelity(props:any) {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState(null);
    const [filePickerResult, setfilePickerResult] = useState(null);

    useEffect(() => {    
        SharePointService.getOperations(`/_api/web/lists/GetById('9ebf4fd2-4c22-4e70-9fa6-9744c2304231')/items?$select=ServerRedirectedEmbedUri,FileLeafRef,AccountNumber0,DocType/Title,ItemStatus0,Processor0/Title,Modified,Editor/Title&$filter=RelationshipId eq '${props.relationshipId}'&$expand=Editor,Processor0,DocType`).then(
            (res) => {
                setItems(res.value);
                setLoading(false);
            }
          );
      },[])

    return ( <div className={classNames.mainStyle}>
        {loading === true ? (
          <div>
            <Loader label="Initializing system" size="largest" />
          </div>
        ) : (
          <div>
          <div className={classNames.controlWrapper}>
          <h3>Fidelity Account Processing</h3>
             <ListView
              items={items}
              viewFields={viewFields}
              compact={true}
              selectionMode={SelectionMode.single}
              selection={_getSelection}
              showFilter={false}
              dragDropFiles={false}
              stickyHeader={true}
              className={classNames.listView}
              groupByFields={groupByFields}
            />
          </div>
          </div>
        )}
      </div>  );
}

export default SelectedFidelity;
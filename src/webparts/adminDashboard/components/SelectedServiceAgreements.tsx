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
    name: "Executed_x0020_Date_x0020__x0028_client_x0029_",
    displayName: "Executed Date (client)",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 150,
  },
  {
    name: "Agency_x0020__x0026__x0020_Brokerage_x0020_Services",
    displayName: "Agency & Brokerage Services",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 150,
  },
  {
    name: "Paymaster_x0020_Services",
    displayName: "Paymaster Services",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 150,
  },
  {
    name: "Benefit_x0020_Administration_x0020_Services",
    displayName: "Benefit Administration Services",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 150,
  },
  {
    name: "Governance_x0020__x0026__x0020_Compliance_x0020_Services",
    displayName: "Governance & Compliance Services",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 150,
  },
  {
    name: "Status",
    displayName: "Status",
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

function SelectedServiceAgreements(props:any) {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState(null);
    const [filePickerResult, setfilePickerResult] = useState(null);

    useEffect(() => {    
        SharePointService.getOperations(`/_api/web/lists/GetById('21b3012d-cae2-480b-ba52-c62e5cf90834')/items?$select=ServerRedirectedEmbedUri,FileLeafRef,Modified,Editor/Title,Status,Governance_x0020__x0026__x0020_Compliance_x0020_Services,Benefit_x0020_Administration_x0020_Services,Paymaster_x0020_Services,Agency_x0020__x0026__x0020_Brokerage_x0020_Services,Executed_x0020_Date_x0020__x0028_client_x0029_&$filter=RelationshipId eq '${props.relationshipId}'&$expand=Editor`).then(
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
          <h3>Service Agreements</h3>
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

export default SelectedServiceAgreements;
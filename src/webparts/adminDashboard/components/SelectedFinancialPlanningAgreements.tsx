
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
      name: "Services",
      displayName: "Services",
      isResizable: true,
      sorting: true,
      minWidth: 200,
      maxWidth: 150,
    },
    {
      name: "Advisor_x0020__x0028_Executing_x0029_.Title",
      displayName: "Advisor (Executing)",
      isResizable: true,
      sorting: true,
      minWidth: 130,
      maxWidth: 150,
    },
    {
        name: "Executed_x0020_Date_x0020__x0028_client_x0029_",
        displayName: "Executed Date (client)",
        isResizable: true,
        sorting: true,
        minWidth: 150,
        maxWidth: 100,
        render: (item) => {
          const d = new Date(item.Executed_x0020_Date_x0020__x0028_client_x0029_);
          const noTime =
            d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
          return <span>{noTime}</span>;
        },
    },
    {
        name: "Disclosures_x0020_Delivery_x0020_Date",
        displayName: "Disclosures Delivery Date",
        isResizable: true,
        sorting: true,
        minWidth: 150,
        maxWidth: 100,
        render: (item) => {
          const d = new Date(item.Disclosures_x0020_Delivery_x0020_Date);
          if(d){
          const noTime =
            d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
          return <span>{noTime}</span>;
          }else{
            return <span></span>;
          }
        },
    },
    {
      name: "Disclosure_x0020_Delivery_x0020_Type",
      displayName: "Disclosure Delivery Type",
      isResizable: true,
      sorting: true,
      minWidth: 120,
      maxWidth: 150,
    },
    {
      name: "Estimated_x0020_Fees",
      displayName: "Estimated Fees",
      isResizable: true,
      sorting: true,
      minWidth: 100,
      maxWidth: 150,
      render: (item) => {
        let val = item.Estimated_x0020_Fees;
        let amt = 0.00;
        if(val){
          let amt = val.toLocaleString("en-US");
          return <span>${amt}</span>;
        }else{
          return <span>$0.00</span>;
        }
        
      },
    },
    {
      name: "Additional_x0020_Hourly_x0020_Rate",
      displayName: "Additional Hourly Rate",
      isResizable: true,
      sorting: true,
      minWidth: 150,
      maxWidth: 150,
      render: (item) => {
        let val = item.Additional_x0020_Hourly_x0020_Rate;
        let amt = 0.00;
        if(val){
          let amt = val.toLocaleString("en-US");
          return <span>${amt}</span>;
        }else{
          return <span>$0.00</span>;
        }
        
      },
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
      name: "Processor.Title",
      displayName: "Processor",
      isResizable: true,
      sorting: true,
      minWidth: 100,
      maxWidth: 150,
    },
    {
      name: "ReadyforReview",
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
  
function _getSelection(item: any[]) {
    console.log('Selected items:', item["0"].ServerRedirectedEmbedUri);
    window.open(item["0"].ServerRedirectedEmbedUri, '_blank');
  }

function SelectedFinancialPlanningAgreements(props:any) {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState(null);
    const [filePickerResult, setfilePickerResult] = useState(null);

    //&$filter=RelationshipId eq '${props.relationshipId}'
    useEffect(() => {    
        SharePointService.getOperations(`/_api/web/lists/GetById('550be7f9-2743-44fd-bde2-d95c747a5695')/items?$select=ServerRedirectedEmbedUri,FileLeafRef,Services,Advisor_x0020__x0028_Executing_x0029_/Title,Executed_x0020_Date_x0020__x0028_client_x0029_,Processor/Title,Modified,Editor/Title,Disclosures_x0020_Delivery_x0020_Date,Disclosure_x0020_Delivery_x0020_Type,Estimated_x0020_Fees,Additional_x0020_Hourly_x0020_Rate,Status,ReadyforReview&$expand=Editor,Processor,Advisor_x0020__x0028_Executing_x0029_&$filter=RelationshipId eq '${props.relationshipId}'`).then(
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
          <h3>PF - Financial Agreements</h3>
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
            />
          </div>
          </div>
        )}
      </div>  );
}

export default SelectedFinancialPlanningAgreements;
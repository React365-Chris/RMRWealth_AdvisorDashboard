
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
      height: '650px',
    },
    listView: {
      height: "310px",
    },
    mainStyle: {
      margin: '20px', 
    },
    controlHeader: {
      margin:'0px'
    }
});


const viewFields: IViewField[] = [
    {
      name: "FileLeafRef",
      displayName: "Name",
      isResizable: true,
      sorting: true,
      minWidth: 150,
      maxWidth: 350,
    },
    {
        name: "AnnuityType",
        displayName: "Type?",
        isResizable: true,
        sorting: true,
        minWidth: 150,
        maxWidth: 350,
    },
    {
        name: "Annuity_x0020_Type",
        displayName: "Annuity Type",
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
        minWidth: 125,
        maxWidth: 250,
    },
    {
        name: "Client_x0020_Age_x0020__x0028_Oldest_x0029_",
        displayName: "Client Age (Oldest)",
        isResizable: true,
        sorting: true,
        minWidth: 125,
        maxWidth: 250,
    },   
    {
        name: "RegistrationType.Title",
        displayName: "Registration Type",
        isResizable: true,
        sorting: true,
        minWidth: 200,
        maxWidth: 250,
    },
    {
        name: "InitialPurchase",
        displayName: "Initial Purchase",
        isResizable: true,
        sorting: true,
        minWidth: 100,
        maxWidth: 250,
    },
    {
        name: "Replacement",
        displayName: "Replacement",
        isResizable: true,
        sorting: true,
        minWidth: 100,
        maxWidth: 250,
    },
    {
        name: "ExpectedInvestmentAmount",
        displayName: "Exp Inv Amount",
        isResizable: true,
        sorting: true,
        minWidth: 120,
        maxWidth: 250,
        render: (item) => {
          let val = item.ExpectedInvestmentAmount;
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
        name: "ExpectedCommission",
        displayName: "Exp Commission",
        isResizable: true,
        sorting: true,
        minWidth: 120,
        maxWidth: 250,
        render: (item) => {
          let val = item.ExpectedCommission;
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
        name: "Commission_x0020_Paid",
        displayName: "Commission Paid",
        isResizable: true,
        sorting: true,
        minWidth: 120,
        maxWidth: 320,
    },
    {
        name: "ItemStatus",
        displayName: "Item Status",
        isResizable: true,
        sorting: true,
        minWidth: 120,
        maxWidth: 250,
    },
    {
        name: "Repertoire",
        displayName: "Repertoire",
        isResizable: true,
        sorting: true,
        minWidth: 100,
        maxWidth: 250,
    },
    {
        name: "DSTVisionReporting",
        displayName: "DST Vision Reporting",
        isResizable: true,
        sorting: true,
        minWidth: 150,
        maxWidth: 250,
    },
    {
        name: "EnvestnetReporting",
        displayName: "BD Reporting",
        isResizable: true,
        sorting: true,
        minWidth: 150,
        maxWidth: 250,
    },
    {
        name: "Processor.Title",
        displayName: "Processor",
        isResizable: true,
        sorting: true,
        minWidth: 100,
        maxWidth: 250,
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

function SelectedAnnuities(props:any) {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState(null);
    const [filePickerResult, setfilePickerResult] = useState(null);
//&
    useEffect(() => {    
        SharePointService.getOperations(`/_api/web/lists/GetById('1963e371-57fe-45a3-81f8-f4d84da5d22a')/items?$select=ServerRedirectedEmbedUri,FileLeafRef,Editor/Title,Modified,AnnuityType,Annuity_x0020_Type,Client_x0020_Age_x0020__x0028_Oldest_x0029_,RegistrationType/Title,InitialPurchase,Replacement,ExpectedInvestmentAmount,ExpectedCommission,Commission_x0020_Paid,ItemStatus,Repertoire,EnvestnetReporting,DSTVisionReporting,Processor/Title,AccountNumber&$expand=Editor,RegistrationType,Processor&$filter=RelationshipId eq '${props.relationshipId}'`).then(
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
          <h3 className={classNames.controlHeader}>Annuities</h3>
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

export default SelectedAnnuities;
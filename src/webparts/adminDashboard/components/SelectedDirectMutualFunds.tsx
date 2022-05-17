
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
      minWidth: 250,
      maxWidth: 350,
    },
    {
        name: "AccountNumber",
        displayName: "Account Number",
        isResizable: true,
        sorting: true,
        minWidth: 200,
        maxWidth: 350,
    },
    {
        name: "DateSigned",
        displayName: "Date Signed",
        isResizable: true,
        sorting: true,
        minWidth: 100,
        maxWidth: 100,
        render: (item) => {
          const d = new Date(item.DateSigned);
          const noTime =
            d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
          return <span>{noTime}</span>;
        },
    },   
    {
        name: "RegistrationType.Title",
        displayName: "Registration Type",
        isResizable: true,
        sorting: true,
        minWidth: 120,
        maxWidth: 350,
    },
    {
        name: "RMRRIA",
        displayName: "RMR RIA",
        isResizable: true,
        sorting: true,
        minWidth: 100,
        maxWidth: 350,
    },
    {
        name: "FeeSetup",
        displayName: "Fee Setup",
        isResizable: true,
        sorting: true,
        minWidth: 100,
        maxWidth: 350,
    },
    {
        name: "Custodian.Title",
        displayName: "Custodian",
        isResizable: true,
        sorting: true,
        minWidth: 100,
        maxWidth: 350,
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
            if(val){
                let amt = val.toLocaleString("en-US");
                return <span>${amt}</span>;
              }else{
                return <span>$0.00</span>;
              }
          },
    },
    {
        name: "RepID.Title",
        displayName: "Rep Code",
        isResizable: true,
        sorting: true,
        minWidth: 200,
        maxWidth: 350,
    },
    {
        name: "ItemStatus",
        displayName: "Item Status",
        isResizable: true,
        sorting: true,
        minWidth: 100,
        maxWidth: 350,
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
        displayName: "Black Diamond",
        isResizable: true,
        sorting: true,
        minWidth: 100,
        maxWidth: 350,
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
        maxWidth: 350,
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

function SelectedDirectMutualFunds(props:any) {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState(null);
    const [filePickerResult, setfilePickerResult] = useState(null);

    useEffect(() => {    
        SharePointService.getOperations(`/_api/web/lists/GetById('09447524-9a0f-4429-8c29-72a4302c3f23')/items?$select=ServerRedirectedEmbedUri,FileLeafRef,Editor/Title,Modified,AccountNumber,RegistrationType/Title,ExpectedInvestmentAmount,RepID/Title,Custodian/Title,ItemStatus,RMRRIA,DateSigned,Repertoire,FeeSetup,EnvestnetReporting,DSTVisionReporting,Processor/Title&$expand=Editor,RegistrationType,Processor,RepID,Custodian`).then(
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
          <h3 className={classNames.controlHeader}>Direct Mutual Funds</h3>
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

export default SelectedDirectMutualFunds;
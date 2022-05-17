
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
        displayName: "AccountNumber",
        isResizable: true,
        sorting: true,
        minWidth: 200,
        maxWidth: 350,
    },
    {
        name: "MemoReferenceCode",
        displayName: "Memo Reference Code",
        isResizable: true,
        sorting: true,
        minWidth: 150,
        maxWidth: 350,
    },
    {
        name: "DateOpened",
        displayName: "Date Opened",
        isResizable: true,
        sorting: true,
        minWidth: 100,
        maxWidth: 100,
        render: (item) => {
          const d = new Date(item.DateOpened);
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
        name: "InvestmentAmount",
        displayName: "Inv Amount",
        isResizable: true,
        sorting: true,
        minWidth: 100,
        maxWidth: 350,
        render: (item) => {
          let val = item.InvestmentAmount;
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
        minWidth: 100,
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
        name: "DSTVisionReporting",
        displayName: "Black Diamond",
        isResizable: true,
        sorting: true,
        minWidth: 100,
        maxWidth: 350,
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
        name: "RMRRIA",
        displayName: "RMR RIA",
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

function SelectedBITRIAAccounts(props:any) {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState(null);
    const [filePickerResult, setfilePickerResult] = useState(null);

    useEffect(() => {    
        SharePointService.getOperations(`/_api/web/lists/GetById('aaaf6904-f0d1-41dd-bcce-b32dcefc80f9')/items?$select=ServerRedirectedEmbedUri,FileLeafRef,Editor/Title,Modified,AccountNumber,MemoReferenceCode,DateOpened,RegistrationType/Title,InvestmentAmount,RepID/Title,ItemStatus,RMRRIA,DSTVisionReporting,Processor/Title&$expand=Editor,RegistrationType,Processor,RepID`).then(
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
          <h3 className={classNames.controlHeader}>BITRIA Accounts</h3>
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

export default SelectedBITRIAAccounts;

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
        name: "AccountNumber",
        displayName: "AccountNumber",
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
        name: "RregistrationType.Title",
        displayName: "Registration Type",
        isResizable: true,
        sorting: true,
        minWidth: 200,
        maxWidth: 350,
    },
    {
        name: "InitialPurchase",
        displayName: "InitialPurchase",
        isResizable: true,
        sorting: true,
        minWidth: 200,
        maxWidth: 350,
    },
    {
        name: "Product.Title",
        displayName: "Product",
        isResizable: true,
        sorting: true,
        minWidth: 200,
        maxWidth: 350,
    },
    {
        name: "ExpectedInvestmentAmount",
        displayName: "Expected Investment Amount",
        isResizable: true,
        sorting: true,
        minWidth: 200,
        maxWidth: 350,
    },
    {
        name: "TradeRepID.Title",
        displayName: "",
        isResizable: true,
        sorting: true,
        minWidth: 200,
        maxWidth: 350,
    },
    {
        name: "Advisor.Title",
        displayName: "Advisor",
        isResizable: true,
        sorting: true,
        minWidth: 200,
        maxWidth: 350,
    },
    {
        name: "ItemStatus",
        displayName: "ItemStatus",
        isResizable: true,
        sorting: true,
        minWidth: 200,
        maxWidth: 350,
    },
    {
        name: "Repertoire",
        displayName: "Repertoire",
        isResizable: true,
        sorting: true,
        minWidth: 200,
        maxWidth: 350,
    },
    {
        name: "DSTVisionReporting",
        displayName: "DSTVisionReporting",
        isResizable: true,
        sorting: true,
        minWidth: 200,
        maxWidth: 350,
    },
    {
        name: "EnvestnetReporting",
        displayName: "BD Reporting",
        isResizable: true,
        sorting: true,
        minWidth: 200,
        maxWidth: 350,
    },
    {
        name: "Commission_x0020_Paid",
        displayName: "Commission Paid",
        isResizable: true,
        sorting: true,
        minWidth: 200,
        maxWidth: 350,
    },
    {
        name: "Processor.Title",
        displayName: "Processor",
        isResizable: true,
        sorting: true,
        minWidth: 200,
        maxWidth: 350,
    },
    {
        name: "",
        displayName: "",
        isResizable: true,
        sorting: true,
        minWidth: 200,
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

function SelectedAlternativeInvestments(props:any) {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState(null);
    const [filePickerResult, setfilePickerResult] = useState(null);

    useEffect(() => {    
        SharePointService.getOperations(`/_api/web/lists/GetById('b7b1d0f2-d329-4868-a6e0-02d08e6e7f8a')/items?$select=ServerRedirectedEmbedUri,FileLeafRef,Editor/Title,AccountNumber,Modified,DateSigned,RregistrationType/Title,InitialPurchase,Product/Title,ExpectedInvestmentAmount,TradeRepID/Title,Advisor/Title,ItemStatus,Repertoire,DSTVisionReporting,EnvestnetReporting,Commission_x0020_Paid,Processor/Title&$expand=Editor,RregistrationType,TradeRepID,Advisor,Processor,Product`).then(
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
          <h3>Alternative Investments</h3>
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

export default SelectedAlternativeInvestments;
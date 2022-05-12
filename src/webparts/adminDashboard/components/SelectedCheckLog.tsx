import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import SharePointService from "../../../Services/SharePointService";
import { mergeStyles, mergeStyleSets } from "@fluentui/react/lib/Styling";
import { Loader } from "@fluentui/react-northstar";
import {
  ListView,
  IViewField,
  SelectionMode,
  GroupOrder,
  IGrouping,
} from "@pnp/spfx-controls-react/lib/ListView";
import {
  FilePicker,
  IFilePickerResult,
} from "@pnp/spfx-controls-react/lib/FilePicker";
import { getSP } from "../pnpjsConfig";
import { SPFI, spfi } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import { IFileAddResult } from "@pnp/sp/files";

const classNames = mergeStyleSets({
  controlWrapper: {
    display: "block",
    marginBottom: "10px",
    height: "650px",
  },
  listView: {
    height: "275px",
  },
  mainStyle: {
    margin: "20px",
  },
});

const viewFields: IViewField[] = [
  {
    name: "FileLeafRef",
    displayName: "Name",
    isResizable: true,
    sorting: true,
    minWidth: 120,
    maxWidth: 170,
  },
  {
    name: "AccountNumber",
    displayName: "Account #",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 200,
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
    name: "BranchReceived0.Title",
    displayName: "Branch Received",
    isResizable: true,
    sorting: true,
    minWidth: 120,
    maxWidth: 160,
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
    minWidth: 130,
    maxWidth: 170,
  },
];

const groupByFields: IGrouping[] = [
  {
    name: "ReadyforReview",
    order: GroupOrder.descending,
  },
];

function _getSelection(item: any[]) {
  console.log("Selected items:", item["0"].ServerRedirectedEmbedUri);
  window.open(item["0"].ServerRedirectedEmbedUri, "_blank");
}

function SelectedCheckLog(props: any) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(null);
  const [filePickerResult, setfilePickerResult] = useState(null);
  const sp = getSP();

  useEffect(() => {
    SharePointService.getRelationshipCheckLogs(props.relationshipId).then(
      (res) => {
        setItems(res.value);
        setLoading(false);
      }
    );
  }, []);

  async function uploadFile() {
    debugger;
    const fileNamePath = encodeURI(filePickerResult.fileAbsoluteUrl);
    let result: IFileAddResult;
    console.log("Uploading File", filePickerResult);
    result = await sp.web
      .getFolderByServerRelativePath("Shared Documents")
      .files.addUsingPath(fileNamePath, filePickerResult.file, {
        Overwrite: true,
      });
    console.log(`Result of file upload: ${JSON.stringify(result)}`);
  }

  return (
    <div className={classNames.mainStyle}>
      {loading === true ? (
        <div>
          <Loader label="Initializing system" size="largest" />
        </div>
      ) : (
        <div>
          <div className={classNames.controlWrapper}>
            <h3>Check Deposits</h3>
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
    </div>
  );
}

export default SelectedCheckLog;

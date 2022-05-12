import * as React from "react";
import {
  ListView,
  IViewField,
  SelectionMode,
} from "@pnp/spfx-controls-react/lib/ListView";
import { useState, useEffect } from "react";
import SharePointService from "../../../Services/SharePointService";
import {
  ISPHttpClientOptions,
  SPHttpClient,
  SPHttpClientResponse,
} from "@microsoft/sp-http";
const viewFields: IViewField[] = [
  {
    name: "Name",
    displayName: "Name",
    isResizable: true,
    sorting: true,
    minWidth: 240,
    maxWidth: 350,
  },
  {
    name: "TimeCreated",
    displayName: "Created",
    isResizable: true,
    sorting: true,
    minWidth: 60,
    maxWidth: 120,
  },
];

function WorkingFiles(props: any) {
  const [files, setFiles] = useState([]);
  //const [files, setFiles] = useState([]);

  useEffect(() => {
    SharePointService._getWorkignFilesTemp(props.ServerRelativeUrl).then(
      (resp) => {
        setFiles(resp.value);
        console.log("refreshed");
      }
    );
  }, [props.ServerRelativeUrl]);

  function _getDropFiles(files) {
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      console.log(files[i].name);
      let spOpts: ISPHttpClientOptions = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: file,
      };

      var url = `https://rmrwealth1.sharepoint.com/sites/operationsteam/_api/Web/GetFolderByServerRelativeUrl('${props.ServerRelativeUrl}')/Files/Add(url='${file.name}', overwrite=true)`;

      //${props.ServerRelativeUrl}
      SharePointService._postWorkignFiles(url,spOpts).then((resp) => {
        console.log('resp',resp);
        
        SharePointService._getWorkignFilesTemp(
          props.ServerRelativeUrl
        ).then((resp) => {
          setFiles(resp.value);
          console.log("refreshed");
        });
        
      });

      /* return props.context.spHttpClient
        .post(url, SPHttpClient.configurations.v1, spOpts)
        .then((response: SPHttpClientResponse) => {
          if (!response.ok) {
            console.log("ok", response);
            SharePointService._getWorkignFilesTemp(
              props.ServerRelativeUrl
            ).then((resp) => {
              setFiles(resp.value);
              console.log("refreshed");
            });
          }
        })
        .catch((error) => {
          console.log("error", error);
        }); */
    }
  }

  function _getSelection(items: any[]) {
    console.log("_getSelection", items);
    if (items.length) {
      var url =
        "https://rmrwealth1.sharepoint.com/" + items[0].ServerRelativeUrl;
      window.open(url, "_blank");
    }
  }

  return (
    <div>
      <ListView
        items={files}
        viewFields={viewFields}
        iconFieldName="ServerRelativeUrl"
        compact={true}
        selectionMode={SelectionMode.single}
        selection={_getSelection}
        showFilter={false}
        dragDropFiles={true}
        onDrop={_getDropFiles}
        stickyHeader={true}
      />
    </div>
  );
}

export default WorkingFiles;

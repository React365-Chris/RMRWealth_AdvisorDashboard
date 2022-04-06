import * as React from "react";
import {
  FolderExplorer,
  IFolder,
} from "@pnp/spfx-controls-react/lib/FolderExplorer";
import WorkingFiles from "./WorkingFiles";
import { useEffect, useState } from "react";

function WorkingFolders(props: any) {
  const[ServerRelativeUrl, setServerRelativeUrl] = useState('');

  function _onFolderSelect(folder: IFolder) {
    setServerRelativeUrl(folder.ServerRelativeUrl.replace('/sites/operationsteam/',''));
  }

  let dir = props.relationshipType.replace(/\s+/g, '');

  return (
    <div>
      <FolderExplorer
        context={props.context}
        siteAbsoluteUrl="https://rmrwealth1.sharepoint.com/sites/operationsteam"
        rootFolder={{
          Name: `${props.relationshipType} Working Files`,
          ServerRelativeUrl: `/sites/operationsteam/${dir}WorkingFiles/${props.relationship}`,
        }}
        defaultFolder={{
          Name: `${props.relationshipType} Working Files`,
          ServerRelativeUrl: `/sites/operationsteam/${dir}WorkingFiles/${props.relationship}`,
        }}
        onSelect={_onFolderSelect}
        canCreateFolders={true}
        hiddenFilterBox={true}
      />
      <WorkingFiles ServerRelativeUrl={ServerRelativeUrl} context={props.context}  />
    </div>
  );
}

export default WorkingFolders;

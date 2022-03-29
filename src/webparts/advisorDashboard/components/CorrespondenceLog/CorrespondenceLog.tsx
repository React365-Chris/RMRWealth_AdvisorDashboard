import * as React from "react";
import { useState } from "react";
import { mergeStyles } from "@fluentui/react/lib/Styling";
import {
  ListView,
  IViewField,
  SelectionMode,
  GroupOrder,
  IGrouping,
} from "@pnp/spfx-controls-react/lib/ListView";
import { Loader } from "@fluentui/react-northstar";

const headerStyle = mergeStyles({
  textAlign: "center",
});

const viewFields: IViewField[] = [
  {
    name: "FileLeafRef",
    displayName: "Name",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 250,
  },
  {
    name: "CorrespondenceType",
    displayName: "Type",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 150,
  },
  {
    name: "DateReceivedSent",
    displayName: "Date Received/Sent",
    isResizable: true,
    sorting: true,
    minWidth: 120,
    maxWidth: 150,
    render: (item) => {
      const d = new Date(item.DateReceivedSent);
      const noTime =
        d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
      return <span>{noTime}</span>;
    },
  },
  {
    name: "Recommendations",
    displayName: "Recommendations",
    isResizable: true,
    sorting: true,
    minWidth: 150,
    maxWidth: 350,    
  },
];

const groupByFields: IGrouping[] = [
  {
    name: "ReadyforReview",
    order: GroupOrder.descending,
  },
];



function CorrespondenceLog(props: any) {
  
  const [corrStatus, setStatus] = useState(false);
  const [doc, setDoc] = useState({
    Id: "",
    Title: "",
    BranchReceived:"",
    BranchReceived0Id:"",
    CorrespondenceType: "",    
    Contact2Name: "",
    Contact2Id: "",
    ContactName: "",
    Created: "",
    _Comments:"",
    DateReceivedSent: "",
    EntityName:"",
    _ExtendedDescription:"",
    Modified: "",    
    Recommendations: "",    
    ReadyforReview: "",
    RelationshipId: "",
    RelationshipName: "",
    ServerRedirectedEmbedUri: "",   
    Notes: "",
    // Processor:"",
    //ProcessorEMail:"",
  });

  function _getSelection(items: any[]) {
    if (items[0].ReadyforReview == "Reviewed") {
      setStatus(true);
    } else {
      setStatus(false);
    }
  
    setDoc({
      Id: items[0].Id,
      Title: items[0].FileLeafRef,
      BranchReceived0Id: items[0].BranchReceived0Id,
      Contact2Id: items[0].Contact2Id,
      ContactName: items[0].ContactName,
      Created: items[0].Created,
      Modified: items[0].Modified,
      ReadyforReview: items[0].ReadyforReview,
      RelationshipId: items[0].RelationshipId,
      RelationshipName: items[0].RelationshipName,
      ServerRedirectedEmbedUri: items[0].ServerRedirectedEmbedUri,
      EntityName: items[0].EntityName,
      Contact2Name: items[0].Contact2Name,
      Notes: items[0].Notes,
      Recommendations:items[0].Recommendations,
      _ExtendedDescription:items[0]._ExtendedDescription,
      DateReceivedSent: items[0].DateReceivedSent,
      _Comments:items[0]._Comments,
      CorrespondenceType:items[0].CorrespondenceType,
      BranchReceived:items[0].BranchReceived,
      // Processor: items[0].Processor,
      //ProcessorEMail: items[0].Processor
    });
    //openPanel();
  }
  return (
    <div>
      {props.items.loading === true ? (
        <div>
          <Loader label="Initializing system" size="largest" />
        </div>
      ) : (
        <div>
          <h1 className={headerStyle}>Correspondence Log</h1>
          <ListView
            items={props.items}
            viewFields={viewFields}
            iconFieldName="FileRef"
            compact={true}
            selectionMode={SelectionMode.single}
            showFilter={true}
            filterPlaceHolder="Search..."
            dragDropFiles={false}
            stickyHeader={true}
            selection={_getSelection}
            groupByFields={groupByFields}
          />
        </div>
      )}
    </div>
  );
}

export default CorrespondenceLog;

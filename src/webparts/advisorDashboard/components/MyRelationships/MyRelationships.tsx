import * as React from "react";
import { useState } from "react";
import "./MyRelationships.css";
import { useBoolean } from "@fluentui/react-hooks";
import {
  ListView,
  IViewField,
  SelectionMode,
  IGrouping,
  GroupOrder,
} from "@pnp/spfx-controls-react/lib/ListView";
import { mergeStyles } from "@fluentui/react/lib/Styling";
import { Loader } from "@fluentui/react-northstar";
import {
  ILabelStyles,
  IStyleSet,
  Label,
  Panel,
  PanelType,
  Pivot,
  PivotItem,
} from "office-ui-fabric-react";
import CheckLog from "../CheckLog/CheckLog";
import SharePointService from "../../../../Services/SharePointService";
import CorrespondenceLog from "../CorrespondenceLog/CorrespondenceLog";
import WorkingFolders from "../WorkingFiles/WorkingFolders";

const headerStyle = mergeStyles({
  textAlign: "center",
});
const mainStyle = mergeStyles({
  margin: "20px",
});
const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

const viewFields: IViewField[] = [
  {
    name: "Title",
    displayName: "Relationship",
    isResizable: true,
    sorting: true,
    minWidth: 240,
    maxWidth: 350,
  },
  {
    name: "RelationshipType",
    displayName: "Type",
    isResizable: true,
    sorting: true,
    minWidth: 60,
    maxWidth: 120,
  },
  {
    name: "RecordTypeName",
    displayName: "Record Type",
    isResizable: true,
    sorting: true,
    minWidth: 60,
    maxWidth: 120,
  },
  {
    name: "ServicingAdvisorRepCode",
    displayName: "Servicing Advisor",
    isResizable: true,
    sorting: true,
    minWidth: 160,
    maxWidth: 250,
  },
  {
    name: "WritingAdvisorRep__c",
    displayName: "Writing Advisor",
    isResizable: true,
    sorting: true,
    minWidth: 160,
    maxWidth: 250,
  },
  {
    name: "OwnerName",
    displayName: "Owner Name",
    isResizable: true,
    sorting: true,
    minWidth: 150,
    maxWidth: 250,
  },
];

const groupByFields: IGrouping[] = [
  {
    name: "RecordTypeName",
    order: GroupOrder.ascending,
  },
];

function MyRelationships(props: any) {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);
  const { description, panelType } = props;
  const [selectedRelationship, setSelectedRelationship] = useState();
  const [selectedRelationshipType, setSelectedRelationshipType] = useState();
  const [selectedRelationshipId, setSelectedRelationshipId] = useState();
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedItemCheckLog, setSelectedItemCheckLog] = useState([]);
  const [selectedItemCorrespondenceLog, setSelectedItemCorrespondenceLog] = useState([]);
  const stringSelectedRelationship = '';

  function _getSelection(item: any[]) {
    setSelectedItem(item[0]);
    setSelectedRelationship(item[0].Title);
    setSelectedRelationshipId(item[0].RelationshipId);
    setSelectedRelationshipType(item[0].RelationshipType);
    
    // get CheckLogs
    SharePointService.getRelationshipCheckLogs(item["0"].RelationshipId).then(
      (res) => {
        setSelectedItemCheckLog(res.value);
      }
    );
    //get correspondence
    SharePointService.getRelationshipCorrespondenceLogs(item["0"].RelationshipId).then(
      (res) => {
        setSelectedItemCorrespondenceLog(res.value);
      }
    );
    openPanel();
    //console.log("Selected items:", item[0]);
    //alert(item['0'].ID);
    //setSelectedItem(item[0]);
    //console.log(item[0]);
    //console.log('props: ',props.selectedItem)
  }

 

  return (
    <div className={mainStyle}>
      {props.items.loading === true ? (
        <div>
          <Loader label="Initializing system" size="largest" />
        </div>
      ) : (
        <div>
          <h1 className={headerStyle}>
            My Relationships ({props.items.length})
          </h1>
          <ListView
            items={props.items}
            viewFields={viewFields}
            compact={true}
            selectionMode={SelectionMode.single}
            showFilter={true}
            filterPlaceHolder="Search relationships..."
            dragDropFiles={false}
            stickyHeader={true}
            selection={_getSelection}
            groupByFields={groupByFields}
          />
        </div>
      )}
      <div>
        <Panel
          headerText="Relationship "{...selectedRelationship}
          isOpen={isOpen}
          onDismiss={dismissPanel}
          // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
          closeButtonAriaLabel="Close"
          type={PanelType.medium}
        >
          <Pivot aria-label="Basic Pivot Example">
            <PivotItem
              headerText="Check Logs"
              headerButtonProps={{
                "data-order": 1,
                "data-title": "My Files Title",
              }}
            >
              <div className="checkLogComponent">
                <CheckLog
                  items={selectedItemCheckLog}
                  name={selectedRelationship}
                  relid={selectedRelationshipId}
                  context={props.context}
                />
              </div>
            </PivotItem>
            <PivotItem headerText="Correspondence Logs">
              <CorrespondenceLog items={selectedItemCorrespondenceLog}
                  context={props.context} />
            </PivotItem>
            <PivotItem headerText="Working Files">
              <WorkingFolders context={props.context} relationship={selectedRelationship} selectedItem={selectedItem} relationshipType={selectedRelationshipType} />
            </PivotItem>
            <PivotItem headerText="Shared with me">
              <Label styles={labelStyles}>Marketing</Label>
            </PivotItem>
          </Pivot>
        </Panel>
      </div>
    </div>
  );
}


export default MyRelationships;

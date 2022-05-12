import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";

import SharePointService from "../../../Services/SharePointService";
import {
  ListView,
  IViewField,
  SelectionMode,
  IGrouping,
  GroupOrder,
} from "@pnp/spfx-controls-react/lib/ListView";
import { mergeStyles, mergeStyleSets } from "@fluentui/react/lib/Styling";
import { Loader } from "@fluentui/react-northstar";
import { useBoolean } from "@fluentui/react-hooks";
import {
  ILabelStyles,
  IStyleSet,
  Label,
  Panel,
  PanelType,
  Pivot,
  PivotItem,
} from "office-ui-fabric-react";
import SelectedCheckLog from "./SelectedCheckLog";
import SelectedCorrespondenceLog from "./SelectedCorrespondenceLog";
import WorkingFolders from "./WorkingFolders";
import SignatureGuarantees from "./SignatureGuarantees";
import SelectedSignatureGuarantee from "./SelectedSignatureGuarentee";
import SelectedSecurities from "./SelectedSecurities";
import SelectedBITRIA from "./SelectedBITRIA";
import SelectedFidelity from "./SelectedFidelity";
import SelectedTD from "./SelectedTD";
import SelectedInsurance from "./SelectedInsurance";
import SelectedDirect from "./SelectedDirect";
import SelectedFinancialPlanningAgreements from "./SelectedFinancialPlanningAgreements";
import SelectedConsultingAgreements from "./SelectedConsultingAgreements";
import SelectedServiceAgreements from "./SelectedServiceAgreements";
import SelectedNonDisclosure from "./SelectedNonDisclosure";
import SelectedAlternativeInvestments from "./SelectedAlternativeInvestments";
import SelectedAnnuities from "./SelectedAnnuities";
import SelectedBITRIAAccounts from "./SelectedBITRIAAccounts";

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

const headerStyle = mergeStyles({
  textAlign: "center",
});

const mainStyle = mergeStyles({
  margin: "20px",
});

const formatColumn = mergeStyles({
  wordWrap: "break-word",
  maxWidth: "300px",
});

const classNames = mergeStyleSets({
  controlWrapper: {
    display: "block",
    marginBottom: "10px",
    height: "650px",
  },
  listView: {
    height: "100%",
  },
  controlList: {
    height: "350px",
    borderBottom: "2px solid #a1a8ad",
  },
});

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

function Relationships(props: any) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(null);
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);
  const [selectedRelationship, setSelectedRelationship] = useState();
  const [selectedRelationshipId, setSelectedRelationshipId] = useState();
  const [selectedRelationshipType, setSelectedRelationshipType] = useState();

  useEffect(() => {
    SharePointService._getRelationships().then((res) => {
      //console.log('loaded items',res.value);
      setItems(res.value);
      setLoading(false);
    });
  }, []);

  function _getSelection(item: any[]) {
    setSelectedRelationshipId(item[0].RelationshipId);
    setSelectedRelationshipType(item[0].RelationshipType);
    setSelectedRelationship(item[0].Title);
    openPanel();
  }

  return (
    <div className={mainStyle}>
      {loading === true ? (
        <div>
          <Loader label="Initializing system" size="largest" />
        </div>
      ) : (
        <div>
          <h1 className={headerStyle}>Relationships ({items.length})</h1>
          <div className={classNames.controlWrapper}>
            <ListView
              items={items}
              viewFields={viewFields}
              compact={true}
              selectionMode={SelectionMode.single}
              showFilter={true}
              filterPlaceHolder="Search relationships..."
              dragDropFiles={false}
              stickyHeader={true}
              selection={_getSelection}
              groupByFields={groupByFields}
              className={classNames.listView}
            />
            <div>
              <Panel
                headerText="Relationship "
                {...selectedRelationship}
                isOpen={isOpen}
                onDismiss={dismissPanel}
                // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
                closeButtonAriaLabel="Close"
                type={PanelType.extraLarge}
              >
                <Pivot>
                  <PivotItem
                    headerText="Accounts"
                    headerButtonProps={{
                      "data-order": 1,
                      "data-title": "My Files Title",
                    }}
                  >
                    <div className={classNames.controlList}>
                      <SelectedAlternativeInvestments
                       relationshipId={selectedRelationshipId}
                       context={props.context} 
                      />
                    </div>
                    <div className={classNames.controlList}>
                      <SelectedAnnuities 
                       relationshipId={selectedRelationshipId}
                       context={props.context}
                      />
                    </div>
                    <div className={classNames.controlList}>
                      <SelectedBITRIAAccounts 
                       relationshipId={selectedRelationshipId}
                       context={props.context}
                      />
                    </div>
                    <div className={classNames.controlList}>
                      
                    </div>
                    <div className={classNames.controlList}>
                      
                    </div>
                    <div className={classNames.controlList}>
                      
                    </div>
                    <div className={classNames.controlList}>
                      
                    </div>
                    <div className={classNames.controlList}>
                      
                    </div>
                    <div className={classNames.controlList}>
                      
                    </div>
                  </PivotItem>
                  <PivotItem headerText="Account Processing">
                    <div className={classNames.controlList}>
                      <SelectedBITRIA
                        relationshipId={selectedRelationshipId}
                        context={props.context}
                      />
                    </div>
                    <div className={classNames.controlList}>
                      <SelectedFidelity 
                      relationshipId={selectedRelationshipId}
                      context={props.context}
                      />
                    </div>
                    <div className={classNames.controlList}>
                      <SelectedTD 
                      relationshipId={selectedRelationshipId}
                      context={props.context}/>
                    </div>
                    <div className={classNames.controlList}>
                      <SelectedInsurance 
                      relationshipId={selectedRelationshipId}
                      context={props.context}/>
                    </div>
                    <div className={classNames.controlList}>
                      <SelectedDirect 
                      relationshipId={selectedRelationshipId}
                      context={props.context}/>
                    </div>
                  </PivotItem>
                  <PivotItem headerText="Activities">
                    <div className={classNames.controlList}>
                      <SelectedCheckLog
                        relationshipId={selectedRelationshipId}
                        context={props.context}
                      />
                    </div>
                    <div className={classNames.controlList}>
                      <SelectedCorrespondenceLog
                        relationshipId={selectedRelationshipId}
                        context={props.context}
                      />
                    </div>
                    <div className={classNames.controlList}>
                      <SelectedSignatureGuarantee
                        relationshipId={selectedRelationshipId}
                        context={props.context}
                      />
                    </div>
                    <div className={classNames.controlList}>
                      <SelectedSecurities
                        relationshipId={selectedRelationshipId}
                        context={props.context}
                      />
                    </div>
                  </PivotItem>
                  <PivotItem headerText="Service Agreements">
                  <div className={classNames.controlList}>
                    <SelectedConsultingAgreements 
                      relationshipId={selectedRelationshipId}
                      context={props.context} 
                    />
                    </div>
                    <div className={classNames.controlList}>
                    <SelectedServiceAgreements
                    relationshipId={selectedRelationshipId}
                    context={props.context} 
                    />
                    </div>
                    <div className={classNames.controlList}>
                    <SelectedNonDisclosure 
                    relationshipId={selectedRelationshipId}
                    context={props.context} 
                    />
                    </div>
                    <div className={classNames.controlList}>
                    <SelectedFinancialPlanningAgreements
                      relationshipId={selectedRelationshipId}
                      context={props.context}
                    />
                    </div>
                  </PivotItem>
                  <PivotItem headerText="Working Files">
                    <WorkingFolders
                      context={props.context}
                      relationship={selectedRelationship}
                      relationshipType={selectedRelationshipType}
                    />
                  </PivotItem>
                </Pivot>
              </Panel>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Relationships;

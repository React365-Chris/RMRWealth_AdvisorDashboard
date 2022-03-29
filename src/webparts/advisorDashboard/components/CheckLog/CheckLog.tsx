import * as React from "react";
import ICheckLogProps from "./ICheckLogProps";
import { mergeStyles } from "@fluentui/react/lib/Styling";
import {
  ListView,
  IViewField,
  SelectionMode,
  GroupOrder,
  IGrouping,
} from "@pnp/spfx-controls-react/lib/ListView";
import { Panel } from "@fluentui/react/lib/Panel";
import { useBoolean } from "@fluentui/react-hooks";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { PrimaryButton, TextField } from "office-ui-fabric-react";
import { useState } from "react";
import {
  DateTimePicker,
  DateConvention,
} from "@pnp/spfx-controls-react/lib/DateTimePicker";
import {
  ListItemPicker,
  ComboBoxListItemPicker,
} from "@pnp/spfx-controls-react/lib/ListItemPicker";
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { map } from "lodash";
import { Loader } from "@fluentui/react-northstar";
import {
  DefaultPalette,
  Stack,
  IStackStyles,
  IStackTokens,
  IStackItemStyles,
} from "@fluentui/react";
import { FilePicker, IFilePickerResult } from '@pnp/spfx-controls-react/lib/FilePicker';

const headerStyle = mergeStyles({
  textAlign: "center",
});

const viewFields: IViewField[] = [
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
];

const groupByFields: IGrouping[] = [
  {
    name: "ReadyforReview",
    order: GroupOrder.descending,
  },
];

function CheckLog(props: any) {

  const buttonStyles = { root: { marginRight: 8 } };
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);
  const [isOpenUpload, { setTrue: openUploadPanel, setFalse: dismissUploadPanel }] =
    useBoolean(false);
  const [doc, setDoc] = useState({
    Id: "",
    Title: "",
    CheckAmount: "",
    AccountNumber: "",
    BranchReceived0Id: "",
    CheckNumber: "",
    Contact2Name: "",
    Contact2Id: "",
    ContactName: "",
    Created: "",
    Modified: "",
    DateForwarded: "",
    DateReceived: "",
    ForwardedTo: "",
    ReadyforReview: "",
    RelationshipId: "",
    RelationshipName: "",
    ServerRedirectedEmbedUri: "",
    TrackingInformation: "",
    EntityName: "",
    Query: "",
    Notes: "",
    //Processor:"",
    //ProcessorEMail:"",
  });
  const [docU, setUploadDoc] = useState({
    Id: "",
    Title: "",
    CheckAmount: "",
    AccountNumber: "",
    BranchReceived0Id: "",
    CheckNumber: "",
    Contact2Name: "",
    Contact2Id: "",
    ContactName: "",
    Created: "",
    Modified: "",
    DateForwarded: "",
    DateReceived: "",
    ForwardedTo: "",
    ReadyforReview: "",
    RelationshipId: "",
    RelationshipName: "",
    ServerRedirectedEmbedUri: "",
    TrackingInformation: "",
    EntityName: "",
    Query: "",
    Notes: "",
    Processor:""
  });
  const [checkStatus, setStatus] = useState(false);
  const [processorEmail, setProcessor] = useState();

  function _getSelection(items: any[]) {
    if (items[0].ReadyforReview == "Reviewed") {
      setStatus(true);
    } else {
      setStatus(false);
    }

    setDoc({
      Id: items[0].Id,
      Title: items[0].FileLeafRef,
      CheckAmount: items[0].CheckAmount,
      AccountNumber: items[0].AccountNumber,
      BranchReceived0Id: items[0].BranchReceived0Id,
      CheckNumber: items[0].CheckNumber,
      Contact2Id: items[0].Contact2Id,
      ContactName: items[0].ContactName,
      Created: items[0].Created,
      Modified: items[0].Modified,
      DateForwarded: items[0].DateForwarded,
      DateReceived: items[0].DateReceived,
      ForwardedTo: items[0].ForwardedTo,
      ReadyforReview: items[0].ReadyforReview,
      RelationshipId: items[0].RelationshipId,
      RelationshipName: items[0].RelationshipName,
      ServerRedirectedEmbedUri: items[0].ServerRedirectedEmbedUri,
      TrackingInformation: items[0].TrackingInformation,
      EntityName: items[0].EntityName,
      Contact2Name: items[0].Contact2Name,
      Query: "RelationshipId eq '" + items[0].RelationshipId + "'",
      Notes: items[0].Notes,
      //Processor: items[0].Processor.EMail,
      //ProcessorEMail: items[0].Processor
    });
    openPanel();
  }
  function onSelectedRelationshipUpload(data: { key: string; name: string }[]) {
    for (const item of data) {
      setUploadDoc({
        ...docU,
        RelationshipId: item.key,
        RelationshipName: item.name,
        Query: "RelationshipId eq '" + item.key + "'",
      });
    }
  }
  function onSelectedContactUpload(data: { key: string; name: string }[]) {
    for (const item of data) {
      setDoc({ ...doc, ContactName: item.name });
    }
  }
  function onSelectedContact2Upload(data: { key: string; name: string }[]) {
    for (const item of data) {
      setDoc({ ...doc, Contact2Name: item.name });
    }
  }
  function onSelectedBranchUpload(data: { key: string; name: string }[]) {
    for (const item of data) {
      setDoc({ ...doc, BranchReceived0Id: item.key });
    }
  }
  function onSelectedRelationship(data: { key: string; name: string }[]) {
    for (const item of data) {
      setDoc({
        ...doc,
        RelationshipId: item.key,
        RelationshipName: item.name,
        Query: "RelationshipId eq '" + item.key + "'",
      });
    }
  }

  function onSelectedContact(data: { key: string; name: string }[]) {
    for (const item of data) {
      setDoc({ ...doc, ContactName: item.name });
    }
  }
  function onSelectedContact2(data: { key: string; name: string }[]) {
    for (const item of data) {
      setDoc({ ...doc, Contact2Name: item.name });
    }
  }

  function onSelectedEntity(data: { key: string; name: string }[]) {
    for (const item of data) {
      setDoc({ ...doc, EntityName: item.name });
    }
  }

  function onSelectedBranch(data: { key: string; name: string }[]) {
    for (const item of data) {
      setDoc({ ...doc, BranchReceived0Id: item.key });
    }
  }
  function _getPeoplePickerItems(items: any[]) {
    //console.log("Items:", items);
  }

  const onRenderFooterContent = React.useCallback(
    () => (
      <div>
        <PrimaryButton onClick={dismissPanel} styles={buttonStyles} disabled={checkStatus ? true : false}>
          Save
        </PrimaryButton>
        <DefaultButton onClick={dismissPanel}>Cancel</DefaultButton>
      </div>
    ),
    [dismissPanel]
  );

  const onRenderUploadFooterContent = React.useCallback(
    () => (
      <div>
        <PrimaryButton onClick={dismissUploadPanel} styles={buttonStyles}>
          Save
        </PrimaryButton>
        <DefaultButton onClick={dismissUploadPanel}>Cancel</DefaultButton>
      </div>
    ),
    [dismissPanel]
  );


  function _getDropFiles(items: any[]) {
    console.log('Selected items:', items);
    debugger;
    openUploadPanel();
  }

  return (
    <div>
      {props.items.loading === true ? (
        <div>
          <Loader label="Initializing system" size="largest" />
        </div>
      ) : (
        <div>
          <h1 className={headerStyle}>Check Log</h1>
          
          <ListView
            items={props.items}
            viewFields={viewFields}
            iconFieldName="FileRef"
            compact={true}
            selectionMode={SelectionMode.single}
            showFilter={true}
            filterPlaceHolder="Search..."
            dragDropFiles={true}
            stickyHeader={true}
            selection={_getSelection}
            groupByFields={groupByFields}
            onDrop={_getDropFiles}
          />
          <Panel
            headerText=""
            isOpen={isOpen}
            onDismiss={dismissPanel}
            isLightDismiss
            closeButtonAriaLabel="Close"
            onRenderFooterContent={onRenderFooterContent}
            isFooterAtBottom={true}
          >
            <Stack tokens={{ childrenGap: 20 }}>
              <form className="document-form">
                <DefaultButton
                  href={doc.ServerRedirectedEmbedUri}
                  target="_blank"
                  title="view check"
                >
                  View Check
                </DefaultButton>
                <ListItemPicker
                  listId="3778936d-84b1-42b0-9170-f7420b0b6c6a"
                  columnInternalName="Title"
                  keyColumnInternalName="RelationshipId"
                  orderBy={"Title asc"}
                  itemLimit={1}
                  onSelectedItem={onSelectedRelationship}
                  context={props.context}
                  label="Relationship Name"
                  noResultsFoundText="Please enter text search relationships"
                  enableDefaultSuggestions={true}
                  webUrl="https://rmrwealth1.sharepoint.com/sites/operationsteam"
                  //defaultSelectedItems={[doc.RelationshipId]}
                  placeholder={doc.RelationshipName}
                  disabled={checkStatus ? true : false}
                />
                <ListItemPicker
                  listId="4aa13b13-11ea-426e-a08c-ea27f5c709c8"
                  columnInternalName="Title"
                  keyColumnInternalName="ContactId"
                  orderBy={"Title asc"}
                  itemLimit={1}
                  filter={doc.Query}
                  onSelectedItem={onSelectedContact}
                  context={props.context}
                  label="Contact Name"
                  noResultsFoundText="Please enter text search contacts"
                  webUrl="https://rmrwealth1.sharepoint.com/sites/operationsteam"
                  placeholder={doc.ContactName}
                  disabled={checkStatus ? true : false}
                  enableDefaultSuggestions={true}
                />
                <ListItemPicker
                  listId="4aa13b13-11ea-426e-a08c-ea27f5c709c8"
                  columnInternalName="Title"
                  keyColumnInternalName="ContactId"
                  orderBy={"Id desc"}
                  itemLimit={1}
                  onSelectedItem={onSelectedContact2}
                  context={props.context}
                  label="Contact 2 Name"
                  noResultsFoundText="Please enter text search contacts"
                  webUrl="https://rmrwealth1.sharepoint.com/sites/operationsteam"
                  placeholder={doc.Contact2Name}
                  disabled={checkStatus ? true : false}
                  enableDefaultSuggestions={true}
                  filter={doc.Query}
                />
                <ListItemPicker
                  listId="3cc6cf64-7198-4d55-921a-84b084bf9e0d"
                  columnInternalName="Title"
                  keyColumnInternalName="EntityId"
                  orderBy={"Id desc"}
                  itemLimit={1}
                  onSelectedItem={onSelectedEntity}
                  context={props.context}
                  label="Entity Name"
                  noResultsFoundText="Please enter text search entities"
                  webUrl="https://rmrwealth1.sharepoint.com/sites/operationsteam"
                  placeholder={doc.EntityName}
                  disabled={checkStatus ? true : false}
                  enableDefaultSuggestions={true}
                  filter={doc.Query}
                />
                <DateTimePicker
                  label="Date Received"
                  dateConvention={DateConvention.Date}
                  showLabels={false}
                  value={new Date(doc.DateReceived)}
                  disabled={checkStatus ? true : false}
                />
                <ComboBoxListItemPicker
                  listId="8dc913e1-df23-43d9-a386-1d16f8be52df"
                  columnInternalName="Title"
                  keyColumnInternalName="Id"
                  label="Branch Received"
                  onSelectedItem={onSelectedBranch}
                  webUrl="https://rmrwealth1.sharepoint.com/sites/operationsteam"
                  spHttpClient={props.context.spHttpClient}
                  defaultSelectedItems={[doc.BranchReceived0Id]}
                  disabled={checkStatus ? true : false}
                />
                <TextField
                  label="Check Amount"
                  value={doc.CheckAmount}
                  required
                  onChange={(e) => {
                    setDoc({
                      ...doc,
                      CheckAmount: (e.target as HTMLInputElement).value,
                    });
                  }}
                  disabled={checkStatus ? true : false}
                />
                <TextField
                  label="Check Number"
                  value={doc.CheckNumber}
                  required
                  onChange={(e) => {
                    setDoc({
                      ...doc,
                      CheckNumber: (e.target as HTMLInputElement).value,
                    });
                  }}
                  disabled={checkStatus ? true : false}
                />
                <TextField
                  label="Account Number"
                  value={doc.AccountNumber}
                  required
                  onChange={(e) => {
                    setDoc({
                      ...doc,
                      AccountNumber: (e.target as HTMLInputElement).value,
                    });
                  }}
                  disabled={checkStatus ? true : false}
                />
                <DateTimePicker
                  label="Date Forwarded"
                  dateConvention={DateConvention.Date}
                  showLabels={false}
                  value={new Date(doc.DateForwarded)}
                  disabled={checkStatus ? true : false}
                />
                <TextField
                  label="Forwarded To"
                  value={doc.ForwardedTo}
                  onChange={(e) => {
                    setDoc({
                      ...doc,
                      ForwardedTo: (e.target as HTMLInputElement).value,
                    });
                  }}
                  disabled={checkStatus ? true : false}
                />
                <PeoplePicker
                  context={props.context}
                  titleText="Processor"
                  personSelectionLimit={1}
                  showtooltip={true}
                  required={false}
                  groupName={""}
                  onChange={_getPeoplePickerItems}
                  showHiddenInUI={false}
                  principalTypes={[PrincipalType.User]}
                  resolveDelay={1000}
                  disabled={checkStatus ? true : false}
                  //defaultSelectedUsers={processorEmail}
                />
                <TextField
                  label="Tracking Info"
                  value={doc.TrackingInformation}
                  onChange={(e) => {
                    setDoc({
                      ...doc,
                      TrackingInformation: (e.target as HTMLInputElement).value,
                    });
                  }}
                  disabled={checkStatus ? true : false}
                />
                <TextField
                  label="Notes"
                  value={doc.Notes}
                  multiline
                  autoAdjustHeight
                  disabled={checkStatus ? true : false}
                  onChange={(e) => {
                    setDoc({
                      ...doc,
                      Notes: (e.target as HTMLInputElement).value,
                    });
                  }}
                />
              </form>
            </Stack>
          </Panel>
          <Panel
            headerText="Upload and set metadata"
            isOpen={isOpenUpload}
            onDismiss={dismissUploadPanel}
            isLightDismiss
            closeButtonAriaLabel="Close"
            onRenderFooterContent={onRenderUploadFooterContent}
            isFooterAtBottom={true}
          >
            <Stack tokens={{ childrenGap: 20 }}>
              <form className="document-form">                
                <ListItemPicker
                  listId="3778936d-84b1-42b0-9170-f7420b0b6c6a"
                  columnInternalName="Title"
                  keyColumnInternalName="RelationshipId"
                  orderBy={"Title asc"}
                  itemLimit={1}
                  onSelectedItem={onSelectedRelationshipUpload}
                  context={props.context}
                  label="Relationship Name"
                  noResultsFoundText="Please enter text search relationships"
                  enableDefaultSuggestions={true}
                  webUrl="https://rmrwealth1.sharepoint.com/sites/operationsteam"
                  //defaultSelectedItems={props.name}
                  //placeholder={doc.RelationshipName}
                />
                <ListItemPicker
                  listId="4aa13b13-11ea-426e-a08c-ea27f5c709c8"
                  columnInternalName="Title"
                  keyColumnInternalName="ContactId"
                  orderBy={"Title asc"}
                  itemLimit={1}
                  filter={docU.Query}
                  onSelectedItem={onSelectedContactUpload}
                  context={props.context}
                  label="Contact Name"
                  noResultsFoundText="Please enter text search contacts"
                  webUrl="https://rmrwealth1.sharepoint.com/sites/operationsteam"
                  placeholder={docU.ContactName}
                  enableDefaultSuggestions={true}
                />
                <ListItemPicker
                  listId="4aa13b13-11ea-426e-a08c-ea27f5c709c8"
                  columnInternalName="Title"
                  keyColumnInternalName="ContactId"
                  orderBy={"Id desc"}
                  itemLimit={1}
                  onSelectedItem={onSelectedContact2Upload}
                  context={props.context}
                  label="Contact 2 Name"
                  noResultsFoundText="Please enter text search contacts"
                  webUrl="https://rmrwealth1.sharepoint.com/sites/operationsteam"
                  placeholder={docU.Contact2Name}
                  enableDefaultSuggestions={true}
                  filter={docU.Query}
                />
                <ListItemPicker
                  listId="3cc6cf64-7198-4d55-921a-84b084bf9e0d"
                  columnInternalName="Title"
                  keyColumnInternalName="EntityId"
                  orderBy={"Id desc"}
                  itemLimit={1}
                  onSelectedItem={onSelectedEntity}
                  context={props.context}
                  label="Entity Name"
                  noResultsFoundText="Please enter text search entities"
                  webUrl="https://rmrwealth1.sharepoint.com/sites/operationsteam"
                  placeholder={docU.EntityName}
                  enableDefaultSuggestions={true}
                  filter={docU.Query}
                />
                <DateTimePicker
                  label="Date Received"
                  dateConvention={DateConvention.Date}
                  showLabels={false}
                />
                <ComboBoxListItemPicker
                  listId="8dc913e1-df23-43d9-a386-1d16f8be52df"
                  columnInternalName="Title"
                  keyColumnInternalName="Id"
                  label="Branch Received"
                  onSelectedItem={onSelectedBranchUpload}
                  webUrl="https://rmrwealth1.sharepoint.com/sites/operationsteam"
                  spHttpClient={props.context.spHttpClient}
                />
                <TextField
                  label="Check Amount"
                  required
                  onChange={(e) => {
                    setDoc({
                      ...docU,
                      CheckAmount: (e.target as HTMLInputElement).value,
                    });
                  }}
                />
                <TextField
                  label="Check Number"
                  required
                  onChange={(e) => {
                    setDoc({
                      ...docU,
                      CheckNumber: (e.target as HTMLInputElement).value,
                    });
                  }}
                />
                <TextField
                  label="Account Number"
                  required
                  onChange={(e) => {
                    setDoc({
                      ...docU,
                      AccountNumber: (e.target as HTMLInputElement).value,
                    });
                  }}
                />
                <DateTimePicker
                  label="Date Forwarded"
                  dateConvention={DateConvention.Date}
                  showLabels={false}
                />
                <TextField
                  label="Forwarded To"
                  onChange={(e) => {
                    setDoc({
                      ...docU,
                      ForwardedTo: (e.target as HTMLInputElement).value,
                    });
                  }}
                />
                <PeoplePicker
                  context={props.context}
                  titleText="Processor"
                  personSelectionLimit={1}
                  showtooltip={true}
                  required={false}
                  groupName={"Operations Members"}
                  onChange={_getPeoplePickerItems}
                  showHiddenInUI={false}
                  principalTypes={[PrincipalType.User]}
                  resolveDelay={1000}
                />
                <TextField
                  label="Tracking Info"
                  onChange={(e) => {
                    setDoc({
                      ...docU,
                      TrackingInformation: (e.target as HTMLInputElement).value,
                    });
                  }}
                />
                <TextField
                  label="Notes"
                  multiline
                  autoAdjustHeight
                  onChange={(e) => {
                    setDoc({
                      ...docU,
                      Notes: (e.target as HTMLInputElement).value,
                    });
                  }}
                />
              </form>
            </Stack>
          </Panel>
        </div>
      )}
    </div>
  );
}

export default CheckLog;

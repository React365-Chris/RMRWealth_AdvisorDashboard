import * as React from "react";
import { useState } from "react";
import { useBoolean } from "@fluentui/react-hooks";
import {    
    Stack 
  } from "@fluentui/react";
  import {
    ISPHttpClientOptions,    
  } from "@microsoft/sp-http";
import SharePointService from "../../../../Services/SharePointService";
import { PrimaryButton, TextField } from "office-ui-fabric-react";
import { mergeStyles } from "@fluentui/react/lib/Styling";
import {
    ListItemPicker,
    ComboBoxListItemPicker,
  } from "@pnp/spfx-controls-react/lib/ListItemPicker";
import {
    PeoplePicker,
    PrincipalType,
  } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { Panel } from "@fluentui/react/lib/Panel";
import {
    DateTimePicker,
    DateConvention,
  } from "@pnp/spfx-controls-react/lib/DateTimePicker";

function UploadPanel(props: any) {
    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(true);
    const buttonStyles = { root: { marginRight: 8 } };
    const [docU, setDocU] = useState({
        CheckAmount: "",
        AccountNumber: "",
        BranchReceived0Id: "",
        CheckNumber: "",
        Contact2Name: "",
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
        Notes: "",
      });
    
       function onSelectedContactUpload(data: { key: string; name: string }[]) {
        for (const item of data) {
          setDocU({ ...docU, ContactName: item.name });
        }
      }
    
      function onSelectedContact2Upload(data: { key: string; name: string }[]) {
        for (const item of data) {
          setDocU({ ...docU, Contact2Name: item.name });
        }
      }
    
      function onSelectedBranchUpload(data: { key: string; name: string }[]) {
        for (const item of data) {
          setDocU({ ...docU, BranchReceived0Id: item.key });
        }
      }
    
      function onSelectedEntityUpload(data: { key: string; name: string }[]) {
        for (const item of data) {
          setDocU({ ...docU, EntityName: item.name });
        }
      }
    
      function _getPeoplePickerItemsUpload(items: any[]) {
        //console.log("Items:", items);
      }
    
      function saveUploadPanel() {
        console.log(`Saving checklog amount ${docU.CheckAmount}`);
        const body: string = JSON.stringify({            
          "CheckAmount": docU.CheckAmount
          /* CheckNumber: docU.CheckNumber,
          DateReceived: docU.DateReceived,
          ContactName: docU.ContactName,
          //'ContactId': doc.ContactId,
          Contact2Name: docU.Contact2Name,
          //'Contact2Id': doc.Contact2Id,
          EntityName: docU.EntityName,
          //'EntityId': doc.EntityId,
          BranchReceived0: docU.BranchReceived0Id,
          AccountNumber: docU.AccountNumber,
          DateForwarded: docU.DateForwarded,
          ForwardedTo: docU.ForwardedTo,
          TrackingInformation: docU.TrackingInformation,
          Notes: docU.Notes, */
        });
    
        let spOpts: ISPHttpClientOptions = {
          headers: {
            "Accept": "application/json;odata=nometadata",
            'Content-type': 'application/json;odata=nometadata',
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE",
          },
          body: body,
        };
    
        //CheckDeposits
        var url = `https://rmrwealth1.sharepoint.com/sites/operationsteam/_api/web/lists/getbytitle('Check Deposits')/Items(${props.Id})`;
     
        //***********THE CHECKLOG ID IS LOST HERE, WHY? *////////////////////////////////
        console.log("saveUrl Uploaded File***************", url);
        //save to State, change filename, relationship, RelID, and set status
        SharePointService._postCheckLogFile(url, spOpts).then((resp) => {
          console.log("file updated", resp);
          //clear state!!!!!!!!!!!!
        });
        dismissPanel();
      }
    
      const onRenderUploadFooterContent = React.useCallback(
        () => (
          <div>
            <PrimaryButton
              onClick={saveUploadPanel}
              styles={buttonStyles}
            >
              Save
            </PrimaryButton>
          </div>
        ),
        [dismissPanel]
      );
    return ( 
        <Panel
        headerText="Upload and set metadata"
        isOpen={isOpen}
        onDismiss={dismissPanel}
        isLightDismiss
        closeButtonAriaLabel="Close"
        onRenderFooterContent={onRenderUploadFooterContent}
        isFooterAtBottom={true}
      >
        <Stack tokens={{ childrenGap: 20 }}>
          <form className="document-form">
            <ListItemPicker
              listId="4aa13b13-11ea-426e-a08c-ea27f5c709c8"
              columnInternalName="Title"
              keyColumnInternalName="ContactId"
              orderBy={"Title asc"}
              itemLimit={1}
              filter={props.query}
              onSelectedItem={onSelectedContactUpload}
              context={props.context}
              label="Contact Name"
              noResultsFoundText="Please enter text search contacts"
              webUrl="https://rmrwealth1.sharepoint.com/sites/operationsteam"
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
              enableDefaultSuggestions={true}
              filter={props.query}
            />
            <ListItemPicker
              listId="3cc6cf64-7198-4d55-921a-84b084bf9e0d"
              columnInternalName="Title"
              keyColumnInternalName="EntityId"
              orderBy={"Id desc"}
              itemLimit={1}
              onSelectedItem={onSelectedEntityUpload}
              context={props.context}
              label="Entity Name"
              noResultsFoundText="Please enter text search entities"
              webUrl="https://rmrwealth1.sharepoint.com/sites/operationsteam"
              placeholder={docU.EntityName}
              enableDefaultSuggestions={true}
              filter={props.query}
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
                setDocU({
                  ...docU,
                  CheckAmount: (e.target as HTMLInputElement).value,
                });
              }}
            />
            <TextField
              label="Check Number"
              required
              onChange={(e) => {
                setDocU({
                  ...docU,
                  CheckNumber: (e.target as HTMLInputElement).value,
                });
              }}
            />
            <TextField
              label="Account Number"
              required
              onChange={(e) => {
                setDocU({
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
                setDocU({
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
              onChange={_getPeoplePickerItemsUpload}
              showHiddenInUI={false}
              principalTypes={[PrincipalType.User]}
              resolveDelay={1000}
            />
            <TextField
              label="Tracking Info"
              onChange={(e) => {
                setDocU({
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
                setDocU({
                  ...docU,
                  Notes: (e.target as HTMLInputElement).value,
                });
              }}
            />
          </form>
        </Stack>
      </Panel>
     );
}

export default UploadPanel;



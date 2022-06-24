import * as React from "react";
import { Stack, IStackTokens } from "@fluentui/react";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { TextField } from "@fluentui/react/lib/TextField";
import {
  DatePicker,
  DayOfWeek,
  defaultDatePickerStrings,
} from "@fluentui/react";
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownStyles,
  IDropdownOption,
} from "@fluentui/react/lib/Dropdown";
import { useEffect, useState } from "react";
import { sp } from "@pnp/sp/presets/all";
import { Web } from "@pnp/sp/webs";
import { ComboBoxListItemPicker } from "@pnp/spfx-controls-react/lib/ListItemPicker";
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import {
  DateTimePicker,
  DateConvention,
  TimeConvention,
} from "@pnp/spfx-controls-react/lib/DateTimePicker";
import { Checkbox, ICheckboxProps } from "@fluentui/react/lib/Checkbox";

const status: IDropdownOption[] = [
  { key: "1. Pending", text: "1. Pending" },
  { key: "2. Submitted", text: "2. Submitted" },
  { key: "3. NIGO", text: "3. NIGO" },
  { key: "4. Completed", text: "4. Completed" },
  { key: "5. Cancelled", text: "5. Cancelled" },
];
const repertoire: IDropdownOption[] = [
  { key: "1. Pending", text: "1. Pending" },
  { key: "2. Submitted", text: "2. Submitted" },
  { key: "3. N/A", text: "3. N/A" },
];
const direct: IDropdownOption[] = [
  { key: "1. Pending", text: "1. Pending" },
  { key: "2. N/A", text: "2. N/A" },
  { key: "3. Yes", text: "3. Yes" },
];
const bd: IDropdownOption[] = [
  { key: "1. Pending", text: "1. Pending" },
  { key: "2. Completed", text: "2. Completed" },
  { key: "3. In Brokerage", text: "3. In Brokerage" },
];
const comm: IDropdownOption[] = [
  { key: "1. Pending", text: "1. Pending" },
  { key: "2. No - N/A", text: "2. No - N/A" },
  {
    key: "3. Yes - (Enter Pay Date in Comments)",
    text: "3. Yes - (Enter Pay Date in Comments)",
  },
];

const stackTokens: IStackTokens = { childrenGap: 20 };
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 600 },
};

function AlternativeInvestmentsModal(props: any) {
  const [altitem, setaltItem] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    async function init() {
      const item = await _getListItem();
      setaltItem(item);
      //debugger;
      if (props.item.InitialPurchase === true) {
        setIsChecked(true);
      }
    }
    init();
    //console.log("PRoductID: ", props.item.Product.Id);
  }, []);

  function _getListItem() {
    let web = Web("https://rmrwealth1.sharepoint.com/sites/operationsteam");

    return web.lists
      .getByTitle("Alternative Investments")
      .items.getById(props.item.ID)
      .get();
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.dir(event.target);
    console.log("submitted");
  }

  function onChange(items: any) {
    console.log("onChange item:", items);
  }

  function onSelectedItem(item: []) {
    console.log("selected items:", item);
  }

  function _getPeoplePickerItems(items: any[]) {
    console.log("Items:", items);
  }

  function _OnSelectedDate(items: any) {
    console.log("Items:", items);
  }
  const onChangeAccountValue = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      //setFirstTextFieldValue(newValue || '');
      console.log(newValue);
    },
    []
  );
  const onChangeExpectedValue = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      //setFirstTextFieldValue(newValue || '');
      console.log(newValue);
    },
    []
  );

  const onCheck = React.useCallback(
    (
      ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
      checked?: boolean
    ): void => {
      setIsChecked(!!checked);
    },
    []
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3>
          Name:{" "}
          <a href={props.item.ServerRedirectedEmbedUri} target="_blank">
            {props.item.FileLeafRef}
          </a>
        </h3>
      </div>
      <Stack tokens={stackTokens}>
        {props.item.AccountNumber ? (
          <TextField
            label="Account Number Filled"
            defaultValue={props.item.AccountNumber}
            onChange={onChangeAccountValue}
          />
        ) : (
          <TextField label="Account Number" onChange={onChangeAccountValue} />
        )}
        {props.item.DateSigned ? (
          <DateTimePicker
            label="Date Signed"
            dateConvention={DateConvention.DateTime}
            timeConvention={TimeConvention.Hours12}
            value={new Date(props.item.DateSigned)}
            onChange={_OnSelectedDate}
          />
        ) : (
          <DateTimePicker
            label="Date Signed"
            dateConvention={DateConvention.DateTime}
            timeConvention={TimeConvention.Hours12}
            onChange={_OnSelectedDate}
          />
        )}

        {props.item.RregistrationTypeId ? (
          <ComboBoxListItemPicker
            listId="da2e068a-1b66-4a4a-b492-abfc0eee1327"
            label="Registration Type Filled"
            columnInternalName="Title"
            keyColumnInternalName="Id"
            defaultSelectedItems={[props.item.RregistrationType.Id]}
            orderBy="Title asc"
            onSelectedItem={onSelectedItem}
            webUrl={"https://rmrwealth1.sharepoint.com/sites/operationsteam"}
            spHttpClient={props.context.spHttpClient}
          />
        ) : (
          <ComboBoxListItemPicker
            listId="da2e068a-1b66-4a4a-b492-abfc0eee1327"
            label="Registration Type"
            columnInternalName="Title"
            keyColumnInternalName="Id"
            orderBy="Title asc"
            onSelectedItem={onSelectedItem}
            webUrl={"https://rmrwealth1.sharepoint.com/sites/operationsteam"}
            spHttpClient={props.context.spHttpClient}
          />
        )}

        <Checkbox
          label="Inital Purchase"
          checked={isChecked}
          onChange={onCheck}
        />

        {props.item.Product ? (
          <ComboBoxListItemPicker
            listId="097cc1cf-11a1-4b7f-b967-215e6cdec625"
            label="Product"
            columnInternalName="Title"
            keyColumnInternalName="Id"
            defaultSelectedItems={[props.item.Product.ID]}
            orderBy="Title asc"
            onSelectedItem={onSelectedItem}
            webUrl={"https://rmrwealth1.sharepoint.com/sites/operationsteam"}
            spHttpClient={props.context.spHttpClient}
          />
        ) : (
          <ComboBoxListItemPicker
            listId="097cc1cf-11a1-4b7f-b967-215e6cdec625"
            label="Product"
            columnInternalName="Title"
            keyColumnInternalName="Id"
            orderBy="Title asc"
            onSelectedItem={onSelectedItem}
            webUrl={"https://rmrwealth1.sharepoint.com/sites/operationsteam"}
            spHttpClient={props.context.spHttpClient}
          />
        )}

        {props.item.ExpectedInvestmentAmount ? (
          <TextField
            label="Expected Investment Filled"
            defaultValue={props.item.ExpectedInvestmentAmount}
            onChange={onChangeExpectedValue}
          />
        ) : (
          <TextField
            label="Expected Investment"
            onChange={onChangeExpectedValue}
          />
        )}

        {props.item.TradeRep ? (
          <ComboBoxListItemPicker
            listId="850b0332-87cd-43f2-aaa8-345c154cf837"
            label="Trade RepID"
            columnInternalName="Title"
            keyColumnInternalName="Id"
            //defaultSelectedItems=[]
            orderBy="Title asc"
            onSelectedItem={onSelectedItem}
            webUrl={"https://rmrwealth1.sharepoint.com/sites/operationsteam"}
            spHttpClient={props.context.spHttpClient}
          />
        ) : (
          <ComboBoxListItemPicker
            listId="850b0332-87cd-43f2-aaa8-345c154cf837"
            label="Trade RepID"
            columnInternalName="Title"
            keyColumnInternalName="Id"
            //defaultSelectedItems=[]
            orderBy="Title asc"
            onSelectedItem={onSelectedItem}
            webUrl={"https://rmrwealth1.sharepoint.com/sites/operationsteam"}
            spHttpClient={props.context.spHttpClient}
          />
        )}

        {props.item.Advisor ? (
          <PeoplePicker
            context={props.context}
            titleText="Advisor"
            personSelectionLimit={1}
            showtooltip={true}
            required={true}
            disabled={false}
            onChange={_getPeoplePickerItems}
            showHiddenInUI={false}
            principalTypes={[PrincipalType.User]}
            resolveDelay={1000}
            defaultSelectedUsers={props.item.Advisor.EMail}
          />
        ) : (
          <PeoplePicker
            context={props.context}
            titleText="Advisor"
            personSelectionLimit={1}
            showtooltip={true}
            required={false}
            disabled={false}
            onChange={_getPeoplePickerItems}
            showHiddenInUI={false}
            principalTypes={[PrincipalType.User]}
            resolveDelay={1000}
          />
        )}
        {props.item.ItemStatus ? (
          <Dropdown
            placeholder="Select an option"
            label="Item Status"
            options={status}
            //styles={dropdownStyles}
          />
        ) : (
          <Dropdown
            placeholder="Select an option"
            label="Item Status"
            options={status}
            styles={dropdownStyles}
          />
        )}

        {props.item.Repertoire ? (
          <Dropdown
            placeholder="Select an option"
            label="Repertoire"
            options={repertoire}
            styles={dropdownStyles}
          />
        ) : (
          <Dropdown
            placeholder="Select an option"
            label="Repertoire"
            options={repertoire}
            styles={dropdownStyles}
          />
        )}

        {props.item.DSTVisionReporting ? (
          <Dropdown
            placeholder="Select an option"
            label="Direct Reporting"
            options={direct}
            styles={dropdownStyles}
          />
        ) : (
          <Dropdown
            placeholder="Select an option"
            label="Direct Reporting"
            options={direct}
            styles={dropdownStyles}
          />
        )}

        {props.item.EnvestnetReporting ? (
          <Dropdown
            placeholder="Select an option"
            label="BR Reporting"
            options={bd}
            styles={dropdownStyles}
          />
        ) : (
          <Dropdown
            placeholder="Select an option"
            label="BR Reporting"
            options={bd}
            styles={dropdownStyles}
          />
        )}

        {props.item.Commission_x0020_Paid ? (
          <Dropdown
            placeholder="Select an option"
            label="Commission Paid"
            options={comm}
            styles={dropdownStyles}
          />
        ) : (
          <Dropdown
            placeholder="Select an option"
            label="Commission Paid"
            options={comm}
            styles={dropdownStyles}
          />
        )}

        {props.item.Processor ? (
          <PeoplePicker
            context={props.context}
            titleText="Processor"
            personSelectionLimit={1}
            showtooltip={true}
            required={true}
            disabled={false}
            onChange={_getPeoplePickerItems}
            showHiddenInUI={false}
            principalTypes={[PrincipalType.User]}
            resolveDelay={1000}
          />
        ) : (
          <PeoplePicker
            context={props.context}
            titleText="Processor"
            personSelectionLimit={1}
            showtooltip={true}
            required={true}
            disabled={false}
            onChange={_getPeoplePickerItems}
            showHiddenInUI={false}
            principalTypes={[PrincipalType.User]}
            resolveDelay={1000}
          />
        )}

        <PrimaryButton type="submit">Save</PrimaryButton>
      </Stack>
    </form>
  );
}

export default AlternativeInvestmentsModal;

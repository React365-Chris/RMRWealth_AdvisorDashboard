import * as React from "react";
import { Stack, IStackTokens } from "@fluentui/react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { TextField } from "@fluentui/react/lib/TextField";
import {
  DatePicker,
  DayOfWeek,
  mergeStyles,
  defaultDatePickerStrings,
} from "@fluentui/react";
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownStyles,
  IDropdownOption,
} from "@fluentui/react/lib/Dropdown";

const options: IDropdownOption[] = [
  {
    key: "fruitsHeader",
    text: "Fruits",
    itemType: DropdownMenuItemType.Header,
  },
  { key: "apple", text: "Apple" },
  { key: "banana", text: "Banana" },
  { key: "orange", text: "Orange", disabled: true },
  { key: "grape", text: "Grape" },
  { key: "divider_1", text: "-", itemType: DropdownMenuItemType.Divider },
  {
    key: "vegetablesHeader",
    text: "Vegetables",
    itemType: DropdownMenuItemType.Header,
  },
  { key: "broccoli", text: "Broccoli" },
  { key: "carrot", text: "Carrot" },
  { key: "lettuce", text: "Lettuce" },
];

const stackTokens: IStackTokens = { childrenGap: 20 };
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

function AlternativeInvestmentsModal(props: any) {
  function handleSubmit(event) {
    event.preventDefault();
    console.dir(event.target);
    console.log("submitted");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3>Name: {props.item.FileLeafRef}</h3>
      </div>
      <Stack tokens={stackTokens}>
        <TextField
          label="Acount Number"
          defaultValue={props.item.AccountNumber}
        />
        <DatePicker
          firstDayOfWeek={DayOfWeek.Sunday}
          placeholder="Select a date..."
          ariaLabel="Select a date"
          strings={defaultDatePickerStrings}
          label="Date Signed"
          //value={props.item.DateSigned} need to set default value
        />
        <Dropdown
          placeholder="Select an option"
          label="Registration Type"
          options={options}
          styles={dropdownStyles}
        />
        <Dropdown
          placeholder="Select an option"
          label="Product"
          options={options}
          styles={dropdownStyles}
        />
        <Dropdown
          placeholder="Select an option"
          label="Trade RepID"
          options={options}
          styles={dropdownStyles}
        />
        <Dropdown
          placeholder="Select an option"
          label="Advisor"
          options={options}
          styles={dropdownStyles}
        />
        <Dropdown
          placeholder="Select an option"
          label="Item Status"
          options={options}
          styles={dropdownStyles}
        />
           <Dropdown
          placeholder="Select an option"
          label="Repertoire"
          options={options}
          styles={dropdownStyles}
        />
           <Dropdown
          placeholder="Select an option"
          label="Direct Reporting"
          options={options}
          styles={dropdownStyles}
        />
           <Dropdown
          placeholder="Select an option"
          label="BR Reporting"
          options={options}
          styles={dropdownStyles}
        />
           <Dropdown
          placeholder="Select an option"
          label="Commission Paid"
          options={options}
          styles={dropdownStyles}
        />
        <Dropdown
          placeholder="Select an option"
          label="Processor"
          options={options}
          styles={dropdownStyles}
        />
        <PrimaryButton type="submit">Save</PrimaryButton>
      </Stack>
    </form>
  );
}

export default AlternativeInvestmentsModal;

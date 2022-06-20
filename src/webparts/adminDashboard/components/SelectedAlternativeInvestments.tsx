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
} from "@pnp/spfx-controls-react/lib/ListView";
import { ISPHttpClientOptions } from "@microsoft/sp-http";
import { PrimaryButton, TextField } from "office-ui-fabric-react";
import { sp } from "@pnp/sp/presets/all";
import { Web } from "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
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
import {
  DefaultPalette,
  Stack,
  IStackStyles,
  IStackTokens,
  IStackItemStyles,
} from "@fluentui/react";
import { Panel } from "@fluentui/react/lib/Panel";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { useId, useBoolean } from "@fluentui/react-hooks";
import {
  getTheme,
  FontWeights,
  ContextualMenu,
  Toggle,
  Modal,
  IDragOptions,
  IIconProps,
  IStackProps,
} from "@fluentui/react";
import { IconButton, IButtonStyles } from "@fluentui/react/lib/Button";
import { IListItemCollection } from "../../../Services/IListItem";
import AlternativeInvestmentsModal from "./modals/AlternativeInvestmentsModal";
import { FontIcon } from '@fluentui/react/lib/Icon';

const cancelIcon: IIconProps = { iconName: "Cancel" };

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
  },
  header: [
    // eslint-disable-next-line deprecation/deprecation
    theme.fonts.xLargePlus,
    {
      flex: "1 1 auto",
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: "flex",
      alignItems: "center",
      fontWeight: FontWeights.semibold,
      padding: "12px 12px 14px 24px",
    },
  ],
  body: {
    flex: "4 4 auto",
    padding: "0 24px 24px 24px",
    overflowY: "hidden",
    selectors: {
      p: { margin: "14px 0" },
      "p:first-child": { marginTop: 0 },
      "p:last-child": { marginBottom: 0 },
    },
  },
});

const iconButtonStyles: Partial<IButtonStyles> = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: "auto",
    marginTop: "4px",
    marginRight: "2px",
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};

const classNames = mergeStyleSets({
  controlWrapper: {
    display: "block",
    height: "650px",
  },
  listView: {
    height: "310px",
  },
  mainStyle: {
    margin: "20px",
  },
  controlHeader: {
    margin: "0px",
  },
});

const viewFields: IViewField[] = [
  {
    name: "FileLeafRef",
    displayName: "Name",
    isResizable: true,
    sorting: true,
    minWidth: 150,
    maxWidth: 350,
  },
  {
    name: "AccountNumber",
    displayName: "Account Number",
    isResizable: true,
    sorting: true,
    minWidth: 120,
    maxWidth: 250,
  },
  {
    name: "DateSigned",
    displayName: "Date Signed",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 100,
    render: (item) => {
      const d = new Date(item.DateSigned);
      if (item.DateSigned) {
        const noTime =
          d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
        return <span>{noTime}</span>;
      }
    },
  },
  {
    name: "RregistrationType.Title",
    displayName: "Registration Type",
    isResizable: true,
    sorting: true,
    minWidth: 170,
    maxWidth: 250,
  },
  {
    name: "InitialPurchase",
    displayName: "Initial Purchase",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 250,
  },
  {
    name: "Product.Title",
    displayName: "Product",
    isResizable: true,
    sorting: true,
    minWidth: 275,
    maxWidth: 350,
  },
  {
    name: "ExpectedInvestmentAmount",
    displayName: "Exp Inv Amt",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 250,
    render: (item) => {
      let val = item.ExpectedInvestmentAmount;
      if (val) {
        let amt = val.toLocaleString("en-US");
        return <span>${amt}</span>;
      }
    },
  },
  {
    name: "TradeRepID.Title",
    displayName: "TradeRepID",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 250,
  },
  {
    name: "Advisor.Title",
    displayName: "Advisor",
    isResizable: true,
    sorting: true,
    minWidth: 150,
    maxWidth: 350,
  },
  {
    name: "ItemStatus",
    displayName: "Item Status",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 350,
  },
  {
    name: "Repertoire",
    displayName: "Repertoire",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 350,
  },
  {
    name: "DSTVisionReporting",
    displayName: "DST Vision Reporting",
    isResizable: true,
    sorting: true,
    minWidth: 150,
    maxWidth: 350,
  },
  {
    name: "EnvestnetReporting",
    displayName: "BD Reporting",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 250,
  },
  {
    name: "Commission_x0020_Paid",
    displayName: "Commission Paid",
    isResizable: true,
    sorting: true,
    minWidth: 150,
    maxWidth: 250,
  },
  {
    name: "Processor.Title",
    displayName: "Processor",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 200,
  },
  {
    name: "Modified",
    displayName: "Modified",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 100,
    render: (item) => {
      const d = new Date(item.Modified);
      if (d) {
        const noTime =
          d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
        return <span>{noTime}</span>;
      }
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

const iconClass = mergeStyles({
  fontSize: 40,
  height: 40,
  width: 40,
  margin: '0 20px',
});

function SelectedAlternativeInvestments(props: any) {
  /* function setSelectedItem(itemDetails) {
    const [item, setItem] = useState(null);
    const increment = () => setItem(itemDetails);
    return { item, increment };
  } */

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(null);
  const [item, setItem] = useState(null);
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] =
    useBoolean(false);

  function _getItem(id: number): Promise<any> {
    setLoading(true);
    let web = Web("https://rmrwealth1.sharepoint.com/sites/operationsteam");
    return web.lists
      .getByTitle("Alternative Investments")
      .items.getById(id)
      .select(
        "ServerRedirectedEmbedUri",
        "FileLeafRef",
        "Editor/Title",
        "AccountNumber",
        "Modified",
        "DateSigned",
        "RregistrationType/Title",
        "InitialPurchase",
        "Product/Title",
        "ExpectedInvestmentAmount",
        "TradeRepID/Title",
        "Advisor/Title",
        "ItemStatus",
        "Repertoire",
        "DSTVisionReporting",
        "EnvestnetReporting",
        "Commission_x0020_Paid",
        "Processor/Title",
        "ID"
      )
      .expand(
        "Editor",
        "RregistrationType",
        "TradeRepID",
        "Advisor",
        "Processor",
        "Product"
      )
      .get();
  }

  async function _getSelection(selItem: any[]) {
    console.log("ID", selItem["0"].ID);

    const getItem = await _getItem(selItem["0"].ID);
    console.log("getItem", getItem);
    setItem(getItem);
    setLoading(false);
    showModal();
  }

  async function _getDropFiles(files) {
    for (var i = 0; i < files.length; i++) {
      let file = files[i];
      let web = Web("https://rmrwealth1.sharepoint.com/sites/operationsteam");
      const fileUploaded = await web
        .getFolderByServerRelativeUrl(
          "/sites/operationsteam/AlternativeInvestments/"
        )
        .files.add(file.name, file, true);
      const item = await fileUploaded.file.getItem();
      await item.update({
        RelationshipId: props.relationshipId,
        RelationshipName: props.relationship,
      });
    }
    //rerender component
    setLoading(true);
    let web = Web("https://rmrwealth1.sharepoint.com/sites/operationsteam");
    web.lists
      .getByTitle("Alternative Investments")
      .items.select(
        "ServerRedirectedEmbedUri",
        "FileLeafRef",
        "Editor/Title",
        "AccountNumber",
        "Modified",
        "DateSigned",
        "RregistrationType/Title",
        "InitialPurchase",
        "Product/Title",
        "ExpectedInvestmentAmount",
        "TradeRepID/Title",
        "Advisor/Title",
        "ItemStatus",
        "Repertoire",
        "DSTVisionReporting",
        "EnvestnetReporting",
        "Commission_x0020_Paid",
        "Processor/Title"
      )
      .expand(
        "Editor",
        "RregistrationType",
        "TradeRepID",
        "Advisor",
        "Processor",
        "Product"
      )
      .filter(`RelationshipId eq '${props.relationshipId}'`)
      .get()
      .then((response) => {
        setItems(response);
        setLoading(false);
      });
  }

  useEffect(() => {
    let web = Web("https://rmrwealth1.sharepoint.com/sites/operationsteam");
    web.lists
      .getByTitle("Alternative Investments")
      .items.select(
        "ServerRedirectedEmbedUri",
        "FileLeafRef",
        "Editor/Title",
        "AccountNumber",
        "Modified",
        "DateSigned",
        "RregistrationType/Title",
        "InitialPurchase",
        "Product/Title",
        "ExpectedInvestmentAmount",
        "TradeRepID/Title",
        "Advisor/Title",
        "ItemStatus",
        "Repertoire",
        "DSTVisionReporting",
        "EnvestnetReporting",
        "Commission_x0020_Paid",
        "Processor/Title",
        "ID"
      )
      .expand(
        "Editor",
        "RregistrationType",
        "TradeRepID",
        "Advisor",
        "Processor",
        "Product"
      )
      .filter(`RelationshipId eq '${props.relationshipId}'`)
      .get()
      .then((response) => {
        setItems(response);
        setLoading(false);
      });
  }, []);

  const titleId = useId("title");

  return (
    <div className={classNames.mainStyle}>
      {loading === true ? (
        <div>
          <Loader label="Initializing system" size="largest" />
        </div>
      ) : (
        <div>
          <div className={classNames.controlWrapper}>
            <h3 className={classNames.controlHeader}>
              Alternative Investments
            </h3>
            <ListView
              items={items}
              viewFields={viewFields}
              compact={true}
              selectionMode={SelectionMode.single}
              selection={_getSelection}
              showFilter={false}
              dragDropFiles={true}
              onDrop={_getDropFiles}
              stickyHeader={true}
              className={classNames.listView}
            />
          </div>
          <Panel
            headerText="Alternative Investments"
            isOpen={isOpen}
            onDismiss={dismissPanel}
            isLightDismiss
            closeButtonAriaLabel="Close"
            isFooterAtBottom={true}
          ></Panel>
          <div>
            <Modal
              titleAriaId={titleId}
              isOpen={isModalOpen}
              onDismiss={hideModal}
              isBlocking={false}
              containerClassName={contentStyles.container}
            >
              <div className={contentStyles.header}>
              <FontIcon aria-label="Compass" iconName="Edit" className={iconClass} />
                <span id={titleId}>Edit Document</span>
                <IconButton
                  styles={iconButtonStyles}
                  iconProps={cancelIcon}
                  ariaLabel="Close popup modal"
                  onClick={hideModal}
                />
              </div>
              <div className={contentStyles.body}>
                <AlternativeInvestmentsModal item={item} />
              </div>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
}
export default SelectedAlternativeInvestments;

import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
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
import { PrimaryButton, TextField } from "office-ui-fabric-react";
import { useBoolean } from "@fluentui/react-hooks";
import { sp } from "@pnp/sp/presets/all";
import { Web } from "@pnp/sp/webs";
import { padStart } from "lodash";

function SelectedInvPanel(props: any) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(null);

  const fetchSPData = async () => {
    console.log('Getting data on ',props.item);
    let web = Web("https://rmrwealth1.sharepoint.com/sites/operationsteam");
    const results = await web.lists
      .getByTitle("Alternative Investments")
      .items.getById(props.item)
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
        "ID",
        "RelationshipName",
        "RelationshipId"
      )
      .expand(
        "Editor",
        "RregistrationType",
        "TradeRepID",
        "Advisor",
        "Processor",
        "Product"
      );
    console.log("Response:", results);
    setItem(results);
    debugger;
    console.log(item);
  };

  useEffect(() => {
    sp.setup(props.context);
    fetchSPData();

   
    //let query = `RelationshipId eq '${item.relationshipId}'`;
    //console.log(query);
    //setQuery(`RelationshipId eq '${item.relationshipId}'`);
    setLoading(false);
  }, []);

  function onSelectedContactUpload(data: { key: string; name: string }[]) {
    for (const item of data) {
      //setDocU({ ...docU, ContactName: item.name });
    }
  }

  return (
    <div>
      List item details
      <Stack tokens={{ childrenGap: 20 }}>
        <form className="document-form">
          <ListItemPicker
            listId="4aa13b13-11ea-426e-a08c-ea27f5c709c8"
            columnInternalName="Title"
            keyColumnInternalName="ContactId"
            orderBy={"Title asc"}
            itemLimit={1}
            filter={query}
            onSelectedItem={onSelectedContactUpload}
            context={props.context}
            label="Contact Name"
            noResultsFoundText="Please enter text search contacts"
            webUrl="https://rmrwealth1.sharepoint.com/sites/operationsteam"
            enableDefaultSuggestions={true}
          />
        </form>
      </Stack>
    </div>
  );
}

export default SelectedInvPanel;

import * as React from "react";
import { withRouter } from "react-router-dom";
import { Nav } from "@fluentui/react/lib/Nav";
import { INavStyles } from "@fluentui/react/lib/Nav";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Image } from "@fluentui/react-northstar";
import styles from "./AdminDashboard.module.scss";

interface INavProps {
  context: WebPartContext;
}

const navStyles: Partial<INavStyles> = {
  root: {
    width: "auto",
    height: "auto",
    boxSizing: "border-box",
    border: "1px solid #eee",
    overflowY: "auto",
  },
};

const FluentNav = withRouter(({ history }) => (
  <div>
    <Nav
      styles={navStyles}
      onLinkClick={(event, element) => {
        event.preventDefault();
        history.push(element.customUrl);
      }}
      groups={[
        {
          links: [
            {
              name: "Home",
              url: "#",
              expandAriaLabel: "Expand Home section",
              collapseAriaLabel: "Collapse Home section",
              customUrl: "/",
              links: [
                {
                  name: "Dashboard",
                  url: "#",
                  key: "home",
                  icon: "Settings",
                  customUrl: "/",
                },
                {
                  name: "Relationships",
                  url: "#",
                  key: "relationships",
                  icon: "ContactList",
                  customUrl: "/relationships",
                },
                {
                  name: "Rep Codes",
                  url: "#",
                  key: "repcodes",
                  icon: "ContactList",
                  customUrl: "/repcodes",
                },
                {
                  name: "Check Log",
                  url: "#",
                  key: "checklog",
                  icon: "AllCurrency",
                  customUrl: "/checklog",
                  disabled: false,
                },
                {
                  name: "Correspondence Log",
                  url: "#",
                  key: "correspondencelog",
                  icon: "Feedback",
                  customUrl: "/correspondence",
                  disabled: false,
                },
                {
                  name: "Signature Guarantees",
                  url: "#",
                  key: "signatureguarantees",
                  icon: "News",
                  customUrl: "/signatureguarantees",
                  disabled: false,
                },                
                {
                  name: "Complaint Log",
                  url: "#",
                  key: "complaintlog",
                  icon: "ShieldAlert",
                  customUrl: "/complaintlog",
                  disabled: false,
                },
              ],
              isExpanded: true,
            },            
            {
              name: "Support",
              url: "#",
              customUrl: "/marketing",
              expandAriaLabel: "Expand Parent link 2",
              collapseAriaLabel: "Collapse Parent link 2",
              links: [
                {
                  name: "Support Request",
                  url: "http://example.com",
                  target: "_blank",
                },
                {
                  name: "Provide Feedback",
                  url: "http://example.com",
                  target: "_blank",
                },
              ],
              isExpanded: false,
            },
          ],
        },
      ]}
    />
    <div className={styles.navImage}>
      <Image
        src="https://static.fmgsuite.com/media/images/498ae626-a26f-4dab-8494-ffdc20569475.png"
      />
    </div>
  </div>
));

export class LeftNav extends React.Component<INavProps> {
  public render() {
    return (
      <div>
        <FluentNav />
      </div>
    );
  }
}

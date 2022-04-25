import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Nav } from '@fluentui/react/lib/Nav';
import { INavStyles } from '@fluentui/react/lib/Nav';
import { WebPartContext } from "@microsoft/sp-webpart-base";

interface INavProps {
    context: WebPartContext;
}

const navStyles: Partial<INavStyles> = {
    root: {
      width: 'auto',
      height: 'auto',
      boxSizing: 'border-box',
      border: '1px solid #eee',
      overflowY: 'auto',
    },
  };

const FluentNav = withRouter(({ history }) => (
    
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
              name: 'Home',
              url: '#',
              expandAriaLabel: 'Expand Home section',
              collapseAriaLabel: 'Collapse Home section',
              customUrl:'/',
        links: [
          {
            name: 'Dashboard',
            url: '#',
            key: 'home',
            icon: 'Settings',
            customUrl:'/',
          },
          {
            name: 'My Relationships',
            url: '#',
            key: 'myrelationships',
            icon: 'ContactList',
            customUrl:'/myrelationships',
          },
          {
            name: 'My Rep Codes',
            url: '#',
            key: 'repcodes',
            icon: 'ContactList',
            customUrl:'/repcodes',
          },
          {
            name: 'Check Log',
            url: '#',
            key: 'checklog',
            icon: 'AllCurrency',
            customUrl:'/checklog',
            disabled: true,
          },
          {
            name: 'Correspondence Log',
            url: '#',
            key: 'correspondencelog',
            icon: 'Feedback',
            customUrl:'/correspondencelog',
            disabled: true,
          },
          {
            name: 'Signature Guarantees',
            url: '#',
            key: 'signatureguarantees',
            icon: 'News',
            customUrl:'/signatureguarantees',
            disabled: true,
          },
          {
            name: 'Investments',
            url: '#',
            key: 'investments',
            icon: 'News',
            customUrl:'/investments',
            disabled: true,
          },
          {
            name: 'Complaint Log',
            url: '#',
            key: 'complaintlog',
            icon: 'ShieldAlert',
            customUrl:'/complaintlog',
            disabled: true,
          },
        ],
        isExpanded: true,
      },
      {
        name: 'Marketing',
        url: '#',
        customUrl:'/marketing',
        expandAriaLabel: 'Expand Parent link 2',
        collapseAriaLabel: 'Collapse Parent link 2',
        isExpanded: false,   
      },
      {
        name: 'Support',
        url: '#',
        customUrl:'/marketing',
        expandAriaLabel: 'Expand Parent link 2',
        collapseAriaLabel: 'Collapse Parent link 2',
        links: [
          {
            name: 'Support Request',
            url: 'http://example.com',
            target: '_blank',
          },
          {
            name: 'Provide Feedback',
            url: 'http://example.com',
            target: '_blank',
          },
        ],
        isExpanded: false,   
      }
    ]}]}
  />
));

export class LeftNav extends React.Component<INavProps> {

  public render() {
    return (
      <div className="left-nav">       
        <FluentNav />        
      </div>
    );
  }
}
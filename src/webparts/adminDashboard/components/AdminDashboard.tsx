import * as React from "react";
import styles from "./AdminDashboard.module.scss";
import { IAdminDashboardProps } from "./IAdminDashboardProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { HashRouter as Router, Route } from "react-router-dom";
import RepCodes from "../components/RepCodes";
import { LeftNav } from "../components/LeftNav";
import Dashboard from "../components/Dashboard";
import Relationships from '../components/Relationships';
import CheckLog from '../components/CheckLog';
import CorrespondenceLog from "../components/CorrespondenceLog";
import SignatureGuarantees from "../components/SignatureGuarantees";
import Complaints from "./Complaints";

export default class AdminDashboard extends React.Component<
  IAdminDashboardProps,
  {}
> {
 
  public render(): React.ReactElement<IAdminDashboardProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
    } = this.props;

    return (
        <Router>
          <div className={styles.gridContainer}>
           
              <div className={styles.gridItem1}>
                <LeftNav context={this.props.context} />
              </div>
           
            <div className={styles.gridItem2}>
              <Route path="/" sensitive exact>
                <Dashboard context={this.props.context} />
              </Route>

              <Route path="/repcodes">
                <RepCodes context={this.props.context} />
              </Route>

              <Route path="/relationships">
                <Relationships context={this.props.context} />
              </Route>

              <Route path="/checklog">
                <CheckLog context={this.props.context} />
              </Route>

              <Route path="/correspondence">
                <CorrespondenceLog context={this.props.context} />
              </Route>

              <Route path="/signatureguarantees">
                <SignatureGuarantees context={this.props.context} />
              </Route>

              <Route path="/complaintlog">
                <Complaints context={this.props.context} />
              </Route>


            </div>            
          </div>
        </Router>
    );
  }
}

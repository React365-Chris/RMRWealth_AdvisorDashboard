import * as React from "react";
import styles from "./AdvisorDashboard.module.scss";
import { IAdvisorDashboardProps } from "./IAdvisorDashboardProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { HashRouter as Router, Route } from "react-router-dom";
import {
  Grid,
  Loader,
  Provider,
  Segment,
  teamsTheme,
} from "@fluentui/react-northstar";
import CheckLog from "./CheckLog/CheckLog";
import CorrespondenceLog from "./CorrespondenceLog/CorrespondenceLog";
import Dashboard from "./Dashboard/Dashboard";
import ComplaintLog from "./ComplaintLog/ComplaintLog";
import Investments from "./Investments/Investments";
import Marketing from "./Marketing/Marketing";
import MyRelationships from "./MyRelationships/MyRelationships";
import SignatureGuarantees from "./SignatureGuarantees/SignatureGuarantees";
import { Image } from "@fluentui/react-northstar";
import SharePointService from "../../../Services/SharePointService";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { LeftNav } from "./Navigation/Nav";
import RepCodes from "./MyRepCodes/MyRepCodes";
import { arraysEqual } from "office-ui-fabric-react";
import PnPjsExample from "./PnPjsExample";

export default class AdvisorDashboard extends React.Component<
  IAdvisorDashboardProps,
  any
> {
  private _client: SPHttpClient = this.props.context.spHttpClient;
  public repCodeArray = [];
  public relationshipArray = [];

  public state = {
    items: [],
    relItems: 0,
    repCodes: [],
    repCodeAPICall: [],
    repCodeAPIItems: 0,
    checklogs: [],
    error: null,
    loading: false,
  };

  private async _getSPData(client: SPHttpClient, url: string): Promise<any> {
    let resp: SPHttpClientResponse = await client.get(
      url,
      SPHttpClient.configurations.v1
    );
    let json = resp.json();
    return json;
  }

 private addRelationshipToState(item, index) {
  //console.log(item, index);
  
}

private addRepCodetoVar(item, index){
  //console.log(item,index);
  this.repCodeArray.push(item);
}

  public componentDidMount(): void {
    this.setState({
      loading: true,
    });

    // get rep codes first using the logic app. Then pass the rep codes as a parameter for the SP query.
    SharePointService.getRepCodesLogicApp().then((res) => {

      this.setState({
        repCodes: res.results,
      });        

      for (let i = 0; i < res.results.length; i++){
        let obj = res.results[i];
        for (let key in obj){
          let value = obj[key];
          if(key === 'RepCode'){
            this.repCodeArray.push(value);
          }
        }
      }
      //console.log('RepCodeArray: ',this.repCodeArray.length, this.repCodeArray)
      
      SharePointService._getRelationships().then((results) => {
        //console.log('here',this.repCodeArray.length, this.repCodeArray);
        //console.log("Relationships:", results.value);
        Array.from(results.value).forEach(element => {          
          
          const substring = element.RepCode;
          const substringService = element.ServiceRepCode;

          const match = this.repCodeArray.find(element => {
            if (element.startsWith(substring) || element.startsWith(substringService)) {
              return true;
            }
          });         
          
          if (match !== undefined) {
            // array contains substring match
            //console.log('matched**************************', element.RepCode, 'substring', substring);
            this.relationshipArray.push(element);
          }  
        
        });

        this.setState({           
            loading: false,
          });
        //console.log('Relationships',this.relationshipArray.length);
        //console.log(this.relationshipArray);       

      });
      
    });    

  }
  
  public render(): React.ReactElement<IAdvisorDashboardProps> {
    return (
      <Provider theme={teamsTheme}>
        <div className={styles.container}>
          <Router>
            <div className={styles.gridContainer}>
              <div className={styles.menu}>
                <div className={styles.gridItem1}>
                  <LeftNav context={this.props.context} />
                </div>
              </div>
              <div className={styles.gridItem2}>
              
              <Route path="/PnPjsExample" sensitive exact>
                  <PnPjsExample context={this.props.context} />
                </Route>
                <Route path="/" sensitive exact>
                  <Dashboard items={this.state} context={this.props.context} />
                </Route>
                <Route path="/checklog">
                  <CheckLog
                    items={this.state.checklogs}
                    context={this.props.context}
                  />
                </Route>
                <Route path="/repcodes">
                  <RepCodes
                    items={this.state.repCodes}
                    context={this.props.context}
                  />
                </Route>
                <Route
                  path="/correspondencelog"
                  component={CorrespondenceLog}
                />
                <Route path="/marketing" component={Marketing} />
                <Route path="/myrelationships">
                  <MyRelationships items={this.relationshipArray} context={this.props.context} />
                </Route>
                <Route path="/investments" component={Investments} />
                <Route
                  path="/signatureguarantees"
                  component={SignatureGuarantees}
                />
                <Route path="/complaintlog" component={ComplaintLog} />
              </div>
              <div className={styles.gridItem3}>
                <Image
                  src="https://static.fmgsuite.com/media/images/498ae626-a26f-4dab-8494-ffdc20569475.png"
                  styles={{
                    gridColumn: "span 4",
                    margin: "15px",
                  }}
                />
              </div>
            </div>
          </Router>
        </div>
      </Provider>
    );
  }
}

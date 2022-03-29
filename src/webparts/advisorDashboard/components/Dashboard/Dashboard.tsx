import * as React from "react";
import { useState } from "react";
import { mergeStyles } from "@fluentui/react/lib/Styling";
import { Button, Loader } from "@fluentui/react-northstar";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IListItem } from "../../../../Services/IListItem";
import { Person } from '@microsoft/mgt-react/dist/es6/spfx';
import { ViewType } from '@microsoft/mgt-spfx';
import { Doughnut } from "react-chartjs-2"; 
const logStyle = mergeStyles({
  margin: "25px",
  width: "800px",
});

const headerStyle = mergeStyles({
  textAlign: "center",
});

const data = {
  datasets: [{
      data: [10, 20, 30]
  }],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: [
      'Red',
      'Yellow',
      'Blue'
  ]
};

function Dashboard(props: any) {
  return (
    <div className={logStyle}>
      {props.items.loading === true ? (
        <div>
          <Loader label="Initializing system" size="largest" />
        </div>
      ) : (
        <div>
        <h1 className={headerStyle}>Dashboard {props.items.loading}</h1>
        <p>Welcome to the RMR Advisor application. This page will be filled with web parts shortly. Please choose a link on the left to start.</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

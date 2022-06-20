import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import SharePointService from "../../../Services/SharePointService";
import { mergeStyles,mergeStyleSets } from "@fluentui/react/lib/Styling";
import { Loader } from "@fluentui/react-northstar";
import {
    ListView,
    IViewField,
    SelectionMode,
    GroupOrder, IGrouping
  } from "@pnp/spfx-controls-react/lib/ListView";
import {
    FilePicker,
    IFilePickerResult,
  } from "@pnp/spfx-controls-react/lib/FilePicker";
  const classNames = mergeStyleSets({
    controlWrapper: {
      display: 'block',
      marginBottom: '10px',
      height: '650px'
    },
    listView: {
      height: "275px",
    },
    mainStyle: {
      margin: '20px', 
    }
});
const viewFields: IViewField[] = [
  {
    name: "FileLeafRef",
    displayName: "Name",
    isResizable: true,
    sorting: true,
    minWidth: 200,
    maxWidth: 350,
  },
  {
    name: "AdvisorExecuting.Title",
    displayName: "Advisor (executing)",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 150,
  },
  {
    name: "Status",
    displayName: "Status",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 150,
  },
  {
    name: "GroupInsuredBenefitsConsulting",
    displayName: "Group/Insured Benefits Consulting",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 150,
  },
  {
    name: "Pre_x002d_Retirement_x0020_Plan_x0020_Consulting",
    displayName: "Pre-Retirement Plan Consulting",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 150,
  },
  {
    name: "Payroll_x0020__x002f__x0020_Ben_x0020_Admin_x0020_Consulting",
    displayName: "Payroll / Ben Admin Consulting",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 150,
  },
  {
    name: "Additional_x0020_Consulting",
    displayName: "Additional Consulting",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 150,
  },
  {
    name: "Executed_x0020_Date_x0020__x0028_client_x0029_",
    displayName: "Executed Date (client)",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 100,
    render: (item) => {
      const d = new Date(item.Executed_x0020_Date_x0020__x0028_client_x0029_);
      const noTime =
        d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
      return <span>{noTime}</span>;
    },
  },
  {
    name: "Disclosure_x0020_Delivery_x0020_Date",
    displayName: "Disclosure Delivery Date",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 100,
    render: (item) => {
      const d = new Date(item.Disclosure_x0020_Delivery_x0020_Date);
      const noTime =
        d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
      return <span>{noTime}</span>;
    },
  },
  {
    name: "Fees_x0020_for_x0020_Group_x002f_Insured_x0020_Benefits",
    displayName: "Fees for Group/Insured Benefits",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 150,
    render: (item) => {
      let val = item.Fees_x0020_for_x0020_Group_x002f_Insured_x0020_Benefits;
      let amt = 0.00;
      if(val){
        let amt = val.toLocaleString("en-US");
        return <span>${amt}</span>;
      }else{
        return <span>$0.00</span>;
      }
      
    },
  },
  {
    name: "Fees_x0020_for_x0020_Pre_x002d_Retirement_x0020_Plan_x0020_Consulting",
    displayName: "Fees for Pre-Retirement Plan Consulting",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 150,
    render: (item) => {
      let val = item.Fees_x0020_for_x0020_Pre_x002d_Retirement_x0020_Plan_x0020_Consulting;
      let amt = 0.00;
      if(val){
        let amt = val.toLocaleString("en-US");
        return <span>${amt}</span>;
      }else{
        return <span>$0.00</span>;
      }
      
    },
  },
  {
    name: "Fees_x0020_for_x0020_Payroll_x0020__x002f__x0020_Bene_x0020_Admin_x0020_Consulting",
    displayName: "Fees for Payroll / Bene Admin Consulting",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 150,
    render: (item) => {
      let val = item.Fees_x0020_for_x0020_Payroll_x0020__x002f__x0020_Bene_x0020_Admin_x0020_Consulting;
      let amt = 0.00;
      if(val){
        let amt = val.toLocaleString("en-US");
        return <span>${amt}</span>;
      }else{
        return <span>$0.00</span>;
      }
      
    },
  },
  {
    name: "Fees_x0020_for_x0020_Additional_x0020_Consulting",
    displayName: "Fees for Additional Consulting",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 150,
    render: (item) => {
      let val = item.Fees_x0020_for_x0020_Additional_x0020_Consulting;
      let amt = 0.00;
      if(val){
        let amt = val.toLocaleString("en-US");
        return <span>${amt}</span>;
      }else{
        return <span>$0.00</span>;
      }
      
    },
  },
  {
    name: "Total_x0020_Fees",
    displayName: "Total Fees",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 150,
    render: (item) => {
      let val = item.Total_x0020_Fees;
      let amt = 0.00;
      if(val){
        let amt = val.toLocaleString("en-US");
        return <span>${amt}</span>;
      }else{
        return <span>$0.00</span>;
      }
      
    },
  },
  {
    name: "_Comments",
    displayName: "_Comments",
    isResizable: true,
    sorting: true,
    minWidth: 100,
    maxWidth: 150,
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
      const noTime =
        d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
      return <span>{noTime}</span>;
    },
  },
  {
    name: "Editor.Title",
    displayName: "Modified By",
    isResizable: true,
    sorting: true,
    minWidth: 130,
    maxWidth: 170,
  }
];


function _getSelection(item: any[]) {
    console.log('Selected items:', item["0"].ServerRedirectedEmbedUri);
    window.open(item["0"].ServerRedirectedEmbedUri, '_blank');
  }

function SelectedConsultingAgreements(props:any) {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState(null);
    const [filePickerResult, setfilePickerResult] = useState(null);
//&$filter=RelationshipId eq '${props.relationshipId}'
    useEffect(() => {    
      SharePointService.getOperations(`/_api/web/lists/GetById('8cc4d5c8-f3c1-4843-bc2f-113aa3025794')/items?$select=ServerRedirectedEmbedUri,FileLeafRef,AdvisorExecuting/Title,Modified,Editor/Title,Status,GroupInsuredBenefitsConsulting,Pre_x002d_Retirement_x0020_Plan_x0020_Consulting,Payroll_x0020__x002f__x0020_Ben_x0020_Admin_x0020_Consulting,Additional_x0020_Consulting,Disclosure_x0020_Delivery_x0020_Date,Fees_x0020_for_x0020_Group_x002f_Insured_x0020_Benefits,Fees_x0020_for_x0020_Pre_x002d_Retirement_x0020_Plan_x0020_Consulting,Executed_x0020_Date_x0020__x0028_client_x0029_&,Fees_x0020_for_x0020_Payroll_x0020__x002f__x0020_Bene_x0020_Admin_x0020_Consulting,Total_x0020_Fees,_Comments,Fees_x0020_for_x0020_Additional_x0020_Consulting&$expand=Editor,AdvisorExecuting&$filter=RelationshipId eq '${props.relationshipId}'`).then(
            (res) => {
                setItems(res.value);
                setLoading(false);
            }
          );
      },[])

    return ( <div className={classNames.mainStyle}>
        {loading === true ? (
          <div>
            <Loader label="Initializing system" size="largest" />
          </div>
        ) : (
          <div>
          <div className={classNames.controlWrapper}>
          <h3>CS - Consulting Agreements</h3>
             <ListView
              items={items}
              viewFields={viewFields}
              compact={true}
              selectionMode={SelectionMode.single}
              selection={_getSelection}
              showFilter={false}
              dragDropFiles={false}
              stickyHeader={true}
              className={classNames.listView}
            />
          </div>
          </div>
        )}
      </div>  );
}

export default SelectedConsultingAgreements;
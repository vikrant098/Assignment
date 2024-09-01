import { LightningElement, wire, track } from "lwc";
import getInvoice from "@salesforce/apex/CaseController.getInvoicelist";


const COLS = [
  {
    fieldName: "Number",
    label: "Invoice Number",   
  },
  
];

export default class MyTreeGrid extends LightningElement {


  @track myData = [];
  columns = COLS;
  error;

  @wire(getInvoice)
  wiredCases({ error, data }) {
    if (error) {
      // Handle error
      this.error = error;
    } else if (data) {
      // Process record data
      var strData = JSON.parse(JSON.stringify(data));

      strData.map((row, index) => {
        if (row["Contacts"]) {
          row._children = row["Invoice_Line_Item__r"]; 
          delete row.Invoice_Line_Item__r;

          let iconKey = "iconName";
          row[iconKey] = "standard:Invoice_Line_Item__c";
        }
      });
      this.myData = strData;
    }
  }
}

import * as React from 'react';
import { mergeStyles } from '@fluentui/react/lib/Styling';


const logStyle = mergeStyles({
  display: 'block',
  marginLeft: "25px",
  width: '800px',
  minWidth: '400px'
});

const headerStyle = mergeStyles({
  textAlign: 'center',
});

function Marketing() {
  return (
    <div className={logStyle}>
      <h1 className={headerStyle}>Marketing</h1>
      <h3></h3>
      <div>
      <iframe width="700px" height= "980px" src='https://forms.office.com/Pages/ResponsePage.aspx?id=Nz-kV4m43ESIbL7LhSjjMqvNxZ3XY7lAjyybWmdathVUQkxHMDBHT05TOUxSSVpLN1JLRzYxU1RRRiQlQCN0PWcu&embed=true'> </iframe>
      </div>
    </div>
  );
}

export default Marketing;
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
    </div>
  );
}

export default Marketing;
import * as React from 'react';
import { mergeStyles } from '@fluentui/react/lib/Styling';


const headerStyle = mergeStyles({
  textAlign: 'center',
});
function SignatureGuarantees() {
  return (
  
      <h1 className={headerStyle}> Signature Guarantees</h1>
  
  );
}

export default SignatureGuarantees;
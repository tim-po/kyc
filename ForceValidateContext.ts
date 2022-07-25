import React from 'react';

const ForceValidateContext = React.createContext({ setForceValidate: (newForceValidate: boolean)=>{}, forceValidate: false });

export default ForceValidateContext;

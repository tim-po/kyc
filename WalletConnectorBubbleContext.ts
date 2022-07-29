import React from 'react';

const WalletConnectorBubbleContext = React.createContext({ setBubbleValue: (newBubbleValue: string)=>{}, bubbleValue: "", setAccentedControlButton: (index: number) => {} });

export default WalletConnectorBubbleContext;

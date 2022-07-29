import React from 'react';

const WalletConnectorBubbleContext = React.createContext({ setBubbleValue: (newBubbleValue: string)=>{}, bubbleValue: "", setAccentedControlButton: (index: number) => {}, accentedControlButton: -1 });

export default WalletConnectorBubbleContext;

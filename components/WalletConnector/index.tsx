import React, {useContext, useEffect, useState} from "react";
import texts from './localization'
import LocaleContext from "../../LocaleContext";
import {localized} from "../../utils/localized";
import Button from "../Button";
import MetamaskJazzicon from "../MetamaskJazzicon";
import {HidingText} from "../HidingText";
import {useWeb3React} from "@web3-react/core";
import './index.css'
import {injected, switchNetwork, walletconnect} from "../../wallet";

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

type WalletConnectorPropType = {
    // You should declare props like this, delete this if you don't need props
    displayNotification: ()=>void
}

const WalletConnectorDefaultProps = {
    // You should declare default props like this, delete this if you don't need props

}

const WalletConnector = (props: WalletConnectorPropType) => {
    const {displayNotification} = props
    const {locale} = useContext(LocaleContext)
    const {chainId, account, deactivate, activate, active, connector, error} = useWeb3React();

    const [isConnectorOpen, setIsConnectorOpen] = useState(false)
    const [isDisconnectShowing, setIsDisconnectShowing] = useState(false)

    function mainButtonClick(){
        if(!active){
            setIsConnectorOpen(!isConnectorOpen)
        }else{
            // @ts-ignore
            if(connector && connector.walletConnectProvider){
                deactivate();
            }else{
                displayNotification()
            }
        }
    }

    function truncate(str: string) {
        return str.length > 0
            ? str.substr(2, 5) + "..." + str.substr(str.length - 3, str.length - 1)
            : str;
    }


    useEffect(() => {
        const initNetwork = async () => {
            if (56 !== chainId) {
                await switchNetwork();
            }
        };
        initNetwork();
    }, [active, chainId, error]);

    return (
        <div className={'disconnect-button-container'}>
            <div
                onMouseEnter={() => setIsDisconnectShowing(true)}
                onMouseLeave={() => setIsDisconnectShowing(false)}
                style={{zIndex: 2, width: '100%'}}
            >
                {/* @ts-ignore */}
                <Button
                    className={`wallet-button ${active ? 'connected': 'not-connected'} 
                    ${isConnectorOpen ? 'open': ''}`} onClick={mainButtonClick}
                >
                    {active &&
                        <>
                            <MetamaskJazzicon/>
                            <HidingText className={'account-address'} defaultText={truncate(`${account}`)} hidingText={'Disconnect'}
                                        peekOut={isDisconnectShowing}/>
                        </>
                    }
                    {!active &&
                        <div className={'connect-wallet-flex'}>
                            <span className={`connect-title ${isConnectorOpen ? 'open': ''}`}>Connect Wallet</span>
                            <div className={`connector-options ${isConnectorOpen ? 'open': ''}`}>
                                <button
                                    className="connection-button"
                                    onClick={() => {
                                        activate(injected);
                                    }}
                                >
                                    <img
                                        src="/images/wallet/metamask.svg"
                                        alt="metamask"
                                        width="35"
                                        height="35"
                                        style={{marginRight: 10}}
                                    />
                                    <p>MetaMask</p>
                                </button>
                                <button
                                    className="connection-button"
                                    onClick={() => {
                                        activate(walletconnect).then(()=>{
                                            window.location.reload()
                                        });
                                    }}
                                >
                                    <img
                                        src="/images/wallet/trustwallet.svg"
                                        alt="metamask"
                                        width="35"
                                        height="35"
                                        style={{marginRight: 10}}
                                    />
                                    <p>Wallet connect</p>
                                </button>
                            </div>
                        </div>
                    }
                </Button>
            </div>
        </div>
    )
};

WalletConnector.defaultProps = WalletConnectorDefaultProps

export default WalletConnector
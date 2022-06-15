import React, {useEffect, useState} from "react";
import Button from "../Button.js";
import ConnectModal from "../ConnectModal";
import {useWeb3React} from "@web3-react/core";
import './index.css'
// @ts-ignore
import {HidingText} from "../HidingText";
import logo from '../../images/MMProLogo.svg'
import arrowUp from '../../images/arrowUpWhite.svg'
import {LocaleSelector} from "../LocaleSelector";
import MetamaskJazzicon from "../MetamaskJazzicon";
import {Link} from "react-router-dom";

export const Header = (props: {isDark?: boolean, showLocalisationControl?: boolean, pages?: {title: string, url: string}[]}) => {
  const {showLocalisationControl, isDark, pages} = props
  const {account, deactivate, active, connector} = useWeb3React();
  const [isOpen, setIsOpen] = useState(false);
  const [disconnectIsPossible, setDisconnectIsPossible] = useState(false)
  const [isDisplayingMetamaskDisconnectTip, setIsDisplayingMetamaskDisconnectTip] = useState(false)
  const [selectedPage, setSelectedPage] = useState(pages ? pages[0].url: '')

  const disconnect = () => {
    if (disconnectIsPossible) {
      // @ts-ignore
      if(connector && connector.walletConnectProvider){
        deactivate();
      }else{
        setIsDisplayingMetamaskDisconnectTip(true)
        setTimeout(()=>{
          setIsDisplayingMetamaskDisconnectTip(false)
        }, 5000)
      }
    } else {
      setDisconnectIsPossible(true)
      setTimeout(() => {
        setDisconnectIsPossible(false)
      }, 1500)
    }
  };

  function truncate(str: string) {
    return str.length > 0
      ? str.substr(2, 5) + "..." + str.substr(str.length - 3, str.length - 1)
      : str;
  }

  function openModal(){
    setIsOpen(true);
  }

  useEffect(()=>{
    setSelectedPage(window.location.pathname)
  }, [])

  return (
    <>
      <header className="px-4 mx-auto py-4" style={{minWidth: 340}}>
        <div className="flex flex-row justify-between items-center w-full">
          <div className={'logo-and-tabs'}>
            <a href="https://marketmaking.pro/">
              <img
                src={logo}
                width="180"
                className="cursor-pointer"
                alt="mmpro logo"
              />
            </a>
            <div className={'separator'}/>
            <div className={'tabs'}>
            {(pages !== undefined && pages.length > 0) &&
                <>
                  {pages.map(page => (
                    <Link
                        className={`page-tab ${selectedPage === page.url && 'tab-selected'}`}
                        onClick={()=>{
                          setSelectedPage(page.url)
                        }}
                        to={page.url}
                    >
                      {page.title}
                      <div className={'tab-selector'}/>
                    </Link>
                  ))}
                </>
            }
            </div>
          </div>

          <div className={'control-strip'}>
            {showLocalisationControl &&
                <LocaleSelector isDark={isDark}/>
            }
            {isDisplayingMetamaskDisconnectTip &&
              <div className={'flex items-center'}> <img src={arrowUp} className={'mr-2'} alt={'up arrow'}/> Please disconnect using MetaMask</div>
            }
            {!isDisplayingMetamaskDisconnectTip &&
              <>
                <div className={'disconnect-button-container'}>
                  <div style={{zIndex: 2}}>
                    {/* @ts-ignore */}
                    <Button className={`wallet-button ${active ? '': 'not-connected'}`} onClick={active ? disconnect: openModal} bgColor={disconnectIsPossible ? "red-500" : "secondary"}>
                      {active &&
                          <>
                            <MetamaskJazzicon/>
                            <HidingText className={'account-adress'} defaultText={truncate(`${account}`)} hidingText={'Disconnect'}
                            peekOut={disconnectIsPossible}/>
                          </>
                      }
                      {!active &&
                          <>Connect Wallet</>
                      }
                    </Button>
                  </div>
                </div>
              </>
            }
          </div>
        </div>
      </header>
      <ConnectModal
        opened={isOpen}
        closeHandle={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
};
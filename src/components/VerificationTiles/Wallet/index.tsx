import React, {useContext, useEffect, useState} from "react";
import texts from "./localization";
import LocaleContext from "../../../Standard/LocaleContext";
import {localized} from "../../../Standard/utils/localized";
import VerificationTile from "../../VerificationTile";
import Text from "../../Text";
import useValidatedState, {validationFuncs} from "../../../Standard/hooks/useValidatedState";
import SimpleInput from "../../../Standard/components/SimpleInput";
import SimpleLabelContainer from "../../../Standard/components/SimpleLabelContainer";

type WalletVerificationPropType = {
  onChangeData: (data: any) => void,
}

const WalletVerificationDefaultProps = {};

const WalletVerification = (props: WalletVerificationPropType) => {
  const {locale} = useContext(LocaleContext);
  const {onChangeData} = props;

  const [isFirstRender, setIsFirstRender] = useState(true)
  const [[transferAddress, setTransferAddress], transferAddressValid] = useValidatedState<string>("", validationFuncs.isAddress);
  const [localStorageData, setLocalStorageData] = useState({transferAddress: ''})

  useEffect(() => {
    if (!isFirstRender) {
      localStorage.setItem('wallet', JSON.stringify(localStorageData))
    }
  }, [isFirstRender])

  function setWalletInner(wallet: { data: {}, isValid: boolean }) {
    if (!isFirstRender) {
      localStorage.setItem('wallet', JSON.stringify(wallet.data))
      onChangeData(wallet)
    } else {
      setIsFirstRender(false)
    }
  }

  useEffect(() => {
    setWalletInner({data: {transferAddress}, isValid: transferAddressValid});
  }, [transferAddress, transferAddressValid]);

  useEffect(() => {
    const wallet = localStorage.getItem("wallet");
    const parsed = JSON.parse(`${wallet}`)
    if(parsed){
      setLocalStorageData(parsed);
    }
    setTransferAddress(localStorageData.transferAddress)
  }, [isFirstRender, localStorageData.transferAddress])

  console.log(transferAddressValid)
  console.log(transferAddress)

  return (
    <VerificationTile isValid={transferAddressValid}>
      <Text fontSize={24} color={"#000"}>Wallet</Text>
      <SimpleLabelContainer>
        <SimpleInput
          // onlyEmmitOnBlur
          isValid={transferAddressValid}
          onChangeRaw={setTransferAddress}
          errorTooltipText={"Please enter a correct address"}
          didInput={isFirstRender ? transferAddress !== "" : undefined}
          inputProps={{
            className: "w-full",
            placeholder: "Wallet address",
            value: transferAddress
          }}
        />
      </SimpleLabelContainer>
    </VerificationTile>
  );
};

WalletVerification.defaultProps = WalletVerificationDefaultProps;

export default WalletVerification;
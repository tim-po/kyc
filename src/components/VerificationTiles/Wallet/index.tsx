import React, {useContext, useEffect, useState} from "react";
import texts from "./localization";
import LocaleContext from "../../../Standard/LocaleContext";
import {localized} from "../../../Standard/utils/localized";
import VerificationTile from "../../VerificationTile";
import Text from "../../Text";
import useValidatedState, {validationFuncs} from "../../../Standard/hooks/useValidatedState";
import SimpleInput from "../../../Standard/components/SimpleInput";
import SimpleLabelContainer from "../../../Standard/components/SimpleLabelContainer";
import styled from "styled-components";

type WalletVerificationPropType = {
  onChangeData: (data: any) => void,
  isSubmitted: boolean
}

const WalletVerificationDefaultProps = {};

const FlexWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const WalletVerification = (props: WalletVerificationPropType) => {
  const {locale} = useContext(LocaleContext);
  const {onChangeData, isSubmitted} = props;

  const [isFirstRender, setIsFirstRender] = useState(true)
  const [[wallet, setTransferAddress], transferAddressValid] = useValidatedState<string>("", validationFuncs.isAddress);
  const [localStorageData, setLocalStorageData] = useState({wallet: ''})

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
    setWalletInner({data: {wallet}, isValid: transferAddressValid});
  }, [wallet, transferAddressValid]);

  useEffect(() => {
    const wallet = localStorage.getItem("wallet");
    const parsed = JSON.parse(`${wallet}`)
    if(parsed){
      setLocalStorageData(parsed);
    }
    if(localStorageData.wallet) {
      setTransferAddress(localStorageData.wallet)
    }
  }, [isFirstRender, localStorageData.wallet])

  return (
    <VerificationTile isValid={transferAddressValid}>
      <FlexWrapper>
        <Text fontSize={24} color={"#000"}>{localized(texts.tileTitle, locale)}</Text>
      </FlexWrapper>
      <SimpleLabelContainer>
        <SimpleInput
          onlyEmmitOnBlur
          displayAsLabel={isSubmitted}
          required
          isValid={transferAddressValid}
          onChangeRaw={setTransferAddress}
          errorTooltipText={"Please enter a correct address"}
          inputProps={{
            className: "w-full",
            placeholder: `${localized(texts.walletPlaceholder, locale)}`,
            value: wallet
          }}
        />
      </SimpleLabelContainer>
      <Text fontWeight={400} fontSize={14} color={'#000'} marginTop={-20}>{localized(texts.checkBSCNetwork, locale)}</Text>
    </VerificationTile>
  );
};

WalletVerification.defaultProps = WalletVerificationDefaultProps;

export default WalletVerification;
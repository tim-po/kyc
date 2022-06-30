import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import VerificationTile from "../VerificationTile";
import Text from "../Text";
import SimpleValidatedInput from "../../Standard/components/SimpleValidatedInput";
import useValidatedState from "../../Standard/hooks/useValidatedState";

const testAdressRegex = /0x*/g;

type WalletVerificationPropType = {}

const WalletVerificationDefaultProps = {}

const WalletVerification = (props: WalletVerificationPropType) => {
  const {locale} = useContext(LocaleContext)

  const [[transferAddress, setTransferAddress], [transferAddressValid, setTransferAddressValid]] = useValidatedState<string | undefined>(undefined)

  return (
    <VerificationTile>
      <Text fontSize={24} color={'#000'}>Wallet</Text>
      <SimpleValidatedInput
        className="w-full"
        onChange={setTransferAddress}
        onValidationChange={(isValid) => setTransferAddressValid(isValid)}
        validationFunction={(text) => testAdressRegex.test(text)}
        errorTooltipText={'Please enter a correct address'}
        placeholder="Transfer address"
      />
    </VerificationTile>
  )
};

WalletVerification.defaultProps = WalletVerificationDefaultProps

export default WalletVerification
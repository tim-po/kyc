import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import VerificationTile from "../VerificationTile";
import Text from "../Text";

type WalletVerificationPropType = {}

const WalletVerificationDefaultProps = {}

const WalletVerification = (props: WalletVerificationPropType) => {
  const {locale} = useContext(LocaleContext)

  return (
    <VerificationTile>
      <Text fontSize={24} color={'#000'}>Wallet</Text>
    </VerificationTile>
  )
};

WalletVerification.defaultProps = WalletVerificationDefaultProps

export default WalletVerification
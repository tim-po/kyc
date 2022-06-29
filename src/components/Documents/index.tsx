import React, {useContext, useState} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import IosStyleSegmentedControll from "../IosStyleSegmentedControll";
import Text from "../Text";
import VerificationTile from "../VerificationTile";
import './index.css'

type DocumentsPropType = {}

const DocumentsDefaultProps = {}

const Documents = (props: DocumentsPropType) => {
  const {locale} = useContext(LocaleContext)

  const buttonsArray = ['Passport', 'ID card', 'Driver’s License']
  const [activeButton, setActiveButton] = useState<number>()

  const handleActiveButton = (index: number) => {
    setActiveButton(index)
  }

  const handleMainFileChange = () => {

  }

  return (
    <VerificationTile>
      <Text fontSize={24} color={'#000'}>Document</Text>
      <IosStyleSegmentedControll
        width={400}
        buttons={buttonsArray}
        firstSelectedIndex={0}
        onChange={handleActiveButton}
      />
      <label className="file-select">
        <div className="select-button">Upload main page</div>
        <input type="file" />
      </label>
    </VerificationTile>
  )
};

Documents.defaultProps = DocumentsDefaultProps

export default Documents
import React, {useContext, useState} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import IosStyleSegmentedControll from "../IosStyleSegmentedControll";
import Text from "../Text";
import VerificationTile from "../VerificationTile";
import DocumentRulesGallery from "../DocumentRulesGallery";
import './index.css';
import CameraIcon from '../../icons/Camera';
import styled from "styled-components";

type DocumentsPropType = {}

const DocumentsDefaultProps = {}

const FlexWrapper = styled.div`
  display: flex;
  gap: 20px;
`

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
      <DocumentRulesGallery />
      <FlexWrapper>
        <label className="file-select">
          <div className="select-button">
            <CameraIcon />
            Upload main page
          </div>
          <input type="file" />
        </label>
        <label className="file-select">
          <div className="select-button">
            <CameraIcon />
            Upload registration page
          </div>
          <input type="file" />
        </label>
      </FlexWrapper>
    </VerificationTile>
  )
};

Documents.defaultProps = DocumentsDefaultProps

export default Documents
import React, {useContext, useState, useRef, useEffect} from "react";
import texts from './localization'
import LocaleContext from "../../../Standard/LocaleContext";
import {localized} from "../../../Standard/utils/localized";
import IosStyleSegmentedControll from "../../IosStyleSegmentedControll";
import Text from "../../Text";
import VerificationTile from "../../VerificationTile";
import DocumentRulesGallery from "../../DocumentRulesGallery";
import './index.css';
import CameraIcon from '../../../icons/Camera';
import styled from "styled-components";
import useValidatedState, {validationFuncs} from "../../../Standard/hooks/useValidatedState";
import {API_URL} from "../../../api/constants";
import {useCookies} from "react-cookie";
import SimpleLabelContainer from "../../../Standard/components/SimpleLabelContainer";
import SimpleDatePicker from "../../../Standard/components/SimpleDatePicker";
import SimpleInput from "../../../Standard/components/SimpleInput";
import { Link } from "react-router-dom";

type DocumentsPropType = {
  onChangeData: (data: any) => void
  isSubmitted: boolean
}

const DocumentsDefaultProps = {}

const FlexWrapper = styled.div`
  display: flex;
  gap: 20px;
`

const Documents = (props: DocumentsPropType) => {
  const {locale} = useContext(LocaleContext)
  const {onChangeData, isSubmitted} = props

  const buttonsArray = [`${localized(texts.passport, locale)}`]

  const [activeButton, setActiveButton] = useState<number>(0)

  const [isFirstRender, setIsFirstRender] = useState(true)
  const [localStorageData, setLocalStorageData] = useState(undefined)

  const [mainDoc, setMainDoc] = useState<any>(undefined)
  const [mainToken, setMainToken] = useState(undefined)
  const [additionalDoc, setAdditioanlDoc] = useState<any>(undefined)
  const [additionalToken, setAdditionalToken] = useState(undefined)

  const [cookies] = useCookies(['auth']);

  const [[registrationPermit, setRegistrationPermit], registrationPermitValid] = useValidatedState<string>("", validationFuncs.hasValue);

  const isValid = !!(mainDoc || additionalDoc)

  const handleActiveButton = (index: number) => {
    setActiveButton(index)
  }

  async function getUserToken(body: FormData) {
    const userTokenUrl = `${API_URL}/api/validation/upload`;

    const response = await fetch(userTokenUrl, {
      method: 'POST',
      headers: {
        'Authorization': cookies.auth
      },
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body
    })

    return response.json()
  }

  async function uploadFiles(documentImportantType: 'main' | 'additional', file: any) {
    const body = new FormData()
    body.append('attachment', file);
    body.append('type', documentImportantType);

    switch (documentImportantType){
      case "additional":
        if (additionalToken)
          body.append('token', additionalToken);
      case "main":
        if (mainToken)
          body.append('token', mainToken);
    }

    const response = await getUserToken(body)

    if (response && response.data.token)
      return response.data.token
  }

  const handleMainFileChange = (event: any) => {

    if (event.target.files && event.target.files[0]) {
      // @ts-ignore
      uploadFiles('main', event.target.files[0]).then(token => {
        setMainDoc(`${API_URL}/api/images/additional/main/${cookies.auth}?${new Date().getTime()}`)
        setMainToken(token)
      })
    }
  }

  const handleAdditionalFileChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      // @ts-ignore
      uploadFiles('additional', event.target.files[0]).then(token => {
        setAdditioanlDoc(`${API_URL}/api/images/additional/additional/${cookies.auth}?${new Date().getTime()}`)
        setAdditionalToken(token)
      })
    }
  }

  useEffect(() => {
    if (isSubmitted) {
      setMainDoc(`${API_URL}/api/images/additional/main/${cookies.auth}?${new Date().getTime()}`)
      setAdditioanlDoc(`${API_URL}/api/images/additional/additional/${cookies.auth}?${new Date().getTime()}`)
    }
  }, [isSubmitted])

  function setDocumentsInner(documents: { data: {}, isValid: boolean }) {
    if (!isFirstRender) {
      localStorage.setItem('documents', JSON.stringify(documents.data))
      onChangeData(documents)
    } else {
      setIsFirstRender(false)
    }
  }

  useEffect(() => {
    setDocumentsInner({
      data: {mainToken, additionalToken, type: buttonsArray[activeButton]},
      isValid: !!mainToken && (activeButton !== 0 || !!additionalToken)
    });
  }, [mainToken, additionalToken, activeButton]);

  return (
    <VerificationTile isValid={!!mainToken && (activeButton !== 0 || !!additionalToken)}>
      <Text fontSize={24} color={'#000'}>{localized(texts.tileTitle, locale)}</Text>
      <IosStyleSegmentedControll
        width={400}
        buttons={buttonsArray}
        firstSelectedIndex={0}
        onChange={handleActiveButton}
      />
      <DocumentRulesGallery/>
      <FlexWrapper>
        <label className="file-select">
          <div className="select-button">
            {
              mainDoc ?
                <img src={mainDoc} alt="preview image"/>
                :
                <>
                  <CameraIcon/>
                  {localized(texts.uploadMainPage, locale)}
                </>
            }
          </div>
          <input type="file" onChange={handleMainFileChange}/>
        </label>
        {
          activeButton === 0 &&
          <label className="file-select">
            <div className="select-button">
              {
                additionalDoc ?
                  <img src={additionalDoc} alt="preview image"/>
                  :
                  <>
                    <CameraIcon/>
                    {localized(texts.uploadRegistrationPage, locale)}
                  </>
              }
            </div>
            <input type="file" onChange={handleAdditionalFileChange}/>
          </label>
        }
      </FlexWrapper>
    </VerificationTile>
  )
};

Documents.defaultProps = DocumentsDefaultProps

export default Documents
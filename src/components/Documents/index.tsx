import React, {useContext, useState, useRef, useEffect} from "react";
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
import useValidatedState, {validationFuncs} from "../../Standard/hooks/useValidatedState";
import {API_URL} from "../../api/constants";
import {useCookies} from "react-cookie";

type DocumentsPropType = {
  onChangeData: (data: any) => void,
}

const DocumentsDefaultProps = {}

const FlexWrapper = styled.div`
  display: flex;
  gap: 20px;
`

const Documents = (props: DocumentsPropType) => {
  const {locale} = useContext(LocaleContext)
  const {onChangeData} = props

  const buttonsArray = ['Passport', 'ID card', 'Driver’s License']
  const [activeButton, setActiveButton] = useState<number>(0)

  const [isFirstRender, setIsFirstRender] = useState(true)
  const [localStorageData, setLocalStorageData] = useState(undefined)

  const [mainDoc, setMainDoc] = useState(undefined)
  const [additionalDoc, setAdditioanlDoc] = useState(undefined)
  const [token, setToken] = useState(undefined)

  const [cookies] = useCookies(['auth']);

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

    if (token)
      body.append('token', token);

    const response = await getUserToken(body)

    if (response && response.data.token)
      setToken(response.data.token)
  }

  const handleMainFileChange = (event: any) => {

    if (event.target.files && event.target.files[0]) {
      // @ts-ignore
      setMainDoc(event.target.files[0]);
      uploadFiles('main', event.target.files[0])
    }
  }

  const handleAdditionalFileChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      // @ts-ignore
      setAdditioanlDoc(event.target.files[0]);
      uploadFiles('additional', event.target.files[0])
    }
  }

  useEffect(() => {
    if (!isFirstRender) {
      localStorage.setItem('documents', JSON.stringify(localStorageData))
    }
  }, [isFirstRender])

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
      data: {token, type: buttonsArray[activeButton]},
      isValid: !!token
    });
  }, [token, activeButton]);

  return (
    <VerificationTile isValid={!!token}>
      <Text fontSize={24} color={'#000'}>Document</Text>
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
                <img src={URL.createObjectURL(mainDoc)} alt="preview image"/>
                :
                <>
                  <CameraIcon/>
                  Upload main page
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
                  <img src={URL.createObjectURL(additionalDoc)} alt="preview image"/>
                  :
                  <>
                    <CameraIcon/>
                    Upload registration page
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
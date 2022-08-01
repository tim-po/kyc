import React, {useContext, useEffect, useState} from "react";
import texts from './localization'
import './index.css'
import VerificationTile from "../../VerificationTile";
import Text from "../../Text";
import useValidatedState, {validationFuncs} from "../../../Standard/hooks/useValidatedState";
import SimpleInput from "../../../Standard/components/SimpleInput";
import SimpleLabelContainer from "../../../Standard/components/SimpleLabelContainer";

type PassportInformationPropType = {
  onChangeData: (data: any) => void,
}

const PassportInformationDefaultProps = {}

const PassportInformation = (props: PassportInformationPropType) => {
  const {onChangeData} = props

  const [isFirstRender, setIsFirstRender] = useState(true)
  const [localStorageData, setLocalStorageData] = useState({
    seriesAndNumber: "",
    issuedBy: "",
    dateOfIssue: "",
    divisionCode: "",
    registration: ""
  })

  const [[seriesAndNumber, setSeriesAndNumber], seriesAndNumberValid] = useValidatedState<string>("", validationFuncs.hasValue);
  const [[issuedBy, setIssuedBy], issuedByValid] = useValidatedState<string>("", validationFuncs.hasValue)
  const [[dateOfIssue, setDateOfIssue], dateOfIssueValid] = useValidatedState<string>("", validationFuncs.hasValue)
  const [[divisionCode, setDivisionCode], divisionCodeValid] = useValidatedState<string>("", validationFuncs.hasValue)
  const [[registration, setRegistration], registrationValid] = useValidatedState<string>("", validationFuncs.hasValue)

  useEffect(() => {
    if (!isFirstRender) {
      localStorage.setItem('passport', JSON.stringify(localStorageData))
    }
  }, [isFirstRender])

  function setPassportInner(passport: { data: {}, isValid: boolean }) {
    if (!isFirstRender) {
      localStorage.setItem('passport', JSON.stringify(passport.data))
      onChangeData(passport)
    } else {
      setIsFirstRender(false)
    }
  }

  useEffect(() => {
    const passport = localStorage.getItem("passport");
    const parsed = JSON.parse(`${passport}`)
    if(parsed){
      setLocalStorageData(parsed);
    }
    setSeriesAndNumber(localStorageData.seriesAndNumber)
    setIssuedBy(localStorageData.issuedBy)
    setDateOfIssue(localStorageData.dateOfIssue)
    setDivisionCode(localStorageData.divisionCode)
    setRegistration(localStorageData.registration)
  }, [isFirstRender, localStorageData.seriesAndNumber, localStorageData.issuedBy, localStorageData.dateOfIssue, localStorageData.divisionCode, localStorageData.registration])

  useEffect(() => {
    setPassportInner(
      {
        data: {seriesAndNumber, issuedBy, dateOfIssue, divisionCode, registration},
        isValid: seriesAndNumberValid && issuedByValid && dateOfIssueValid && divisionCodeValid && registrationValid
      }
    );
  }, [seriesAndNumber, issuedBy, dateOfIssue, divisionCode, registration, seriesAndNumberValid, issuedByValid, dateOfIssueValid, divisionCodeValid, registrationValid]);

  return (
    <VerificationTile isValid={seriesAndNumberValid && issuedByValid && dateOfIssueValid && divisionCodeValid && registrationValid}>
      <form autoComplete={"on"}>
        <Text fontSize={24} color={"#000"}>Passport</Text>
        <div className={"mb-4"}/>
        <SimpleLabelContainer label={"Series and Number"} id="seriesAndNumber">
          <SimpleInput
            onChangeRaw={setSeriesAndNumber}
            required
            inputProps={{
              placeholder: "Series and Number",
              value: seriesAndNumber
            }}
            autoComplete={"country-name"}
            id="seriesAndNumber"
          />
        </SimpleLabelContainer>
        <SimpleLabelContainer label={"Issued by"} id="issuedBy">
          <SimpleInput
            onChangeRaw={setIssuedBy}
            required
            inputProps={{
              placeholder: "Issued by",
              value: issuedBy
            }}
            autoComplete={"country-name"}
            id="issuedBy"
          />
        </SimpleLabelContainer>
        <SimpleLabelContainer label={"Date of issue"} id="dateOfIssue">
          <SimpleInput
            onChangeRaw={setDateOfIssue}
            required
            inputProps={{
              placeholder: "Date of issue",
              value: dateOfIssue
            }}
            autoComplete={"country-name"}
            id="dateOfIssue"
          />
        </SimpleLabelContainer>
        <SimpleLabelContainer label={"Division code"} id="divisionCode">
          <SimpleInput
            onChangeRaw={setDivisionCode}
            required
            inputProps={{
              placeholder: "Division code",
              value: divisionCode
            }}
            autoComplete={"country-name"}
            id="divisionCode"
          />
        </SimpleLabelContainer>
        <SimpleLabelContainer label={"Registration"} id="registration">
          <SimpleInput
            onChangeRaw={setRegistration}
            required
            inputProps={{
              placeholder: "dd.mm.yyyy",
              value: registration
            }}
            autoComplete={"country-name"}
            id="registration"
          />
        </SimpleLabelContainer>
      </form>
    </VerificationTile>
  )
};

PassportInformation.defaultProps = PassportInformationDefaultProps

export default PassportInformation
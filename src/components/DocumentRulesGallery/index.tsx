import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import './index.css'
import Text from "../Text";
import styled from "styled-components";

import GoodIdIcon from '../../icons/GoodId';
import NotBlurryIcon from '../../icons/NotBlurry';
import NotCutIcon from '../../icons/NotCut';
import NotReflectiveIcon from '../../icons/NotReflective'

const FlexWrapper = styled.div`
  display: flex;
  gap: 20px;
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;
`

const DocumentRulesGallery = () => {
    const {locale} = useContext(LocaleContext)

    return (
      <FlexWrapper>
        <IconWrapper>
          <GoodIdIcon />
          <Text fontWeight={400} color={'#000'} fontSize={12}>{localized(texts.good, locale)}</Text>
        </IconWrapper>
        <IconWrapper>
          <NotCutIcon />
          <Text fontWeight={400} color={'#000'} fontSize={12}>{localized(texts.notCut, locale)}</Text>
        </IconWrapper>
        <IconWrapper>
          <NotBlurryIcon />
          <Text fontWeight={400} color={'#000'} fontSize={12}>{localized(texts.notBlurry, locale)}</Text>
        </IconWrapper>
        <IconWrapper>
          <NotReflectiveIcon />
          <Text fontWeight={400} color={'#000'} fontSize={12}>{localized(texts.notReflective, locale)}</Text>
        </IconWrapper>
      </FlexWrapper>
    )
};

export default DocumentRulesGallery
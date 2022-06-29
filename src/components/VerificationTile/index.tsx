import React, {useContext, ReactNode, useState} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import styled from 'styled-components';

interface StripProps {
  isActive: boolean
}

type VerificationTilePropType = {
  children: ReactNode
}

const VerificationTileDefaultProps = {}

const Tile = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 900px;
  height: max-content;
  padding: 22px 52px;
  background: #fff;
  border-radius: 20px;
  margin-bottom: 50px;
  overflow: hidden;
  gap: 14px;
`

const Strip = styled.div<StripProps>`
  width: 12px;
  height: 100%;
  background: ${p => p.isActive ? '#33CC66' : '#D2D5DA'};
  position: absolute;
  left: 0;
  top: 0;
  transition: background 0.3s ease;
`

const VerificationTile = (props: VerificationTilePropType) => {
  const {locale} = useContext(LocaleContext)

  const [isStripActive, setIsStripActive] = useState(false)

  const {children} = props

  return (
    <Tile>
      <Strip isActive={isStripActive}/>
      {children}
    </Tile>
  )
};

VerificationTile.defaultProps = VerificationTileDefaultProps

export default VerificationTile
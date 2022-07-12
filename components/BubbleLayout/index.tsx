import React from "react";
import './index.css'
import styled from 'styled-components'
import bottomBubbles from '../../images/bottomBubbles.svg';
import topBubbles from '../../images/topBubbles.svg';

type BubbleLayoutPropType = {}

const BubbleLayoutDefaultProps = {}

const BubbleLayoutContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100%;
  z-index: 0;
`

const TopBubblesWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 0;
  width: 180px;
`

const BottomBubblesWrapper = styled.div`
  position: absolute;
  bottom: -90px;
  left: 0;
`

const BubbleLayout = (props: BubbleLayoutPropType) => {
  return (
    <BubbleLayoutContainer>
      <TopBubblesWrapper>
        <img src={topBubbles} alt=""/>
      </TopBubblesWrapper>
      <BottomBubblesWrapper>
        <img src={bottomBubbles} alt=""/>
      </BottomBubblesWrapper>
    </BubbleLayoutContainer>
  )
};

BubbleLayout.defaultProps = BubbleLayoutDefaultProps

export default BubbleLayout
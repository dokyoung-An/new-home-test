import React from 'react';
import styled from 'styled-components';
import { Container, SectionContainer } from '../../../../styles/common';
import { MdOutlineTimer } from 'react-icons/md';
import { BsClockHistory, BsCardChecklist, BsPeople } from 'react-icons/bs';

const AfterInspectionSection = () => {
  return (
    <SectionWrapper>
      <Container>
        <ContentWrapper>
          <TextContent>
            <DividerIcon>
              <MdOutlineTimer />
            </DividerIcon>
            <Title>준공 후에도<br /> 점검 가능합니다</Title>
            <Description>
              입주 전이라면 준공일이 지났더라도<br />
              사전점검을 진행할 수 있습니다.
            </Description>
            <PointList>
              <PointItem>
                <PointIcon>
                  <BsClockHistory />
                </PointIcon>
                <PointContent>
                  <PointTitle>하자담보책임기간 내 점검</PointTitle>
                  <PointText>
                    건설사의 하자담보책임기간 내에는 언제든지 하자점검이 가능합니다.
                  </PointText>
                </PointContent>
              </PointItem>
              <PointItem>
                <PointIcon>
                  <BsCardChecklist />
                </PointIcon>
                <PointContent>
                  <PointTitle>입주 전 상태 기록</PointTitle>
                  <PointText>
                    입주 전 상태를 전문가와 함께 꼼꼼히 기록하여 향후 하자 분쟁 시 입증자료로 활용할 수 있습니다.
                  </PointText>
                </PointContent>
              </PointItem>
              <PointItem>
                <PointIcon>
                  <BsPeople />
                </PointIcon>
                <PointContent>
                  <PointTitle>전문가의 정확한 판단</PointTitle>
                  <PointText>
                    건설사의 하자보수 책임 여부를 전문가가 정확하게 판단하여 불필요한 분쟁을 예방합니다.
                  </PointText>
                </PointContent>
              </PointItem>
            </PointList>
          </TextContent>
          <ImageContent>
            <MainImage src="/img/service/move.png" alt="준공 후 점검" />
          </ImageContent>
        </ContentWrapper>
      </Container>
    </SectionWrapper>
  );
};

const SectionWrapper = styled(SectionContainer)`
  background: linear-gradient(180deg, #F5F7FF 0%, rgba(245, 247, 255, 0.5) 100%);
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const TextContent = styled.div`
  flex: 1;
`;

const DividerIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
  
  &::after {
    content: '';
    position: absolute;
    left: calc(36px + 20px);
    width: 50px;
    height: 1px;
    background-color: #ddd;
  }
  
  svg {
    font-size: 36px;
    color: ${({ theme }) => theme.primaryDark};
  }
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 24px;
  word-break: keep-all;
  width: 100%;
  
  @media (max-width: 768px) {
    font-size: 2.4rem;
    br {
      display: none;
    }
  }
`;

const Description = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 40px;
  word-break: keep-all;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    br {
      display: none;
    }
  }
`;

const PointList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PointIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 48px;
  background: rgba(45, 91, 255, 0.1);
  border-radius: 12px;
  color: ${({ theme }) => theme.primaryDark || '#2D5BFF'};
  flex-shrink: 0;
  margin-top: 4px;

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 768px) {
    min-width: 40px;
    height: 40px;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const PointItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: ${({ theme }) => theme.background};
  padding: 0 10px;
  border-radius: 16px;
  transition: all 0.3s ease;
  width: 80%;
  
  &:hover {
    transform: translateY(-5px);
    ${PointIcon} {
      background: ${({ theme }) => theme.primaryDark || '#2D5BFF'};
      color: white;
    }
  }

  @media (max-width: 768px) {
    padding: 0px;
    width: 100%;
  }
`;


const PointContent = styled.div`
  flex: 1;
`;

const PointTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.primary};
`;

const PointText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.text};
  word-break: keep-all;
  word-wrap: break-word;
`;

const ImageContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainImage = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

export default AfterInspectionSection;
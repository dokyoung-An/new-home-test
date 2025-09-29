import React, { useState } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../../styles/animations';


const PricingSection = () => {
  const [selectedRegion, setSelectedRegion] = useState('경상권');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState(null);

  // 지역별 데이터
  const regionData = {
    '경상권': {
      mapImage: '/img/price/kyengsang.png', // 실제 이미지 경로로 변경 필요
      services: [
        { type: '25평 ~ 27평', price: '24만원' },
        { type: '28평 ~ 30평', price: '26만원' },
        { type: '32평 ~ 35평', price: '28만원' },
        { type: '36평 ~ 39평', price: '32만원' }
      ],
      additional: [
        { price: '출장비 무료' },
        { price: '빠른 대응' },
        { price: '한 세대도 점검 가능 '},
        { price: '공동구매 혜택지원' },
      ]
    },
    '대전/충북': {
      mapImage: '/img/price/daejeon.png', // 실제 이미지 경로로 변경 필요
      services: [
        { type: '25평 ~ 27평', price: '24만원' },
        { type: '28평 ~ 30평', price: '26만원' },
        { type: '32평 ~ 35평', price: '28만원' },
        { type: '36평 ~ 39평', price: '32만원' }
      ],
      additional: [
        { service: '1세대', price: '6만원' },
        { service: '3세대 동시 예약', price: '무료' },
      ]
    },
    '서울/경기': {
      mapImage: '/img/price/seoul.png', // 실제 이미지 경로로 변경 필요
      services: [
        { type: '25평 ~ 27평', price: '24만원' },
        { type: '28평 ~ 30평', price: '26만원' },
        { type: '32평 ~ 35평', price: '28만원' },
        { type: '36평 ~ 39평', price: '32만원' }
      ],
      additional: [        
        { service: '1세대', price: '10만원' },
        { service: '3세대 동시 예약', price: '3만 3천원' },
      ]
    },
    '전라/충남': {
      mapImage: '/img/price/jeonra.png', // 실제 이미지 경로로 변경 필요
      services: [
        { type: '25평 ~ 27평', price: '24만원' },
        { type: '28평 ~ 30평', price: '26만원' },
        { type: '32평 ~ 35평', price: '28만원' },
        { type: '36평 ~ 39평', price: '32만원' }
      ],
      additional: [
        { service: '1세대', price: '15만원' },
        { service: '3세대 동시 예약', price: '4만5천원' },
        { service: '6세대 동시 예약', price: '무료' }
      ]
    },
    '기타지역': {
      mapImage: '/img/price/extra.png', // 실제 이미지 경로로 변경 필요
      services: [
        { type: '25평 ~ 27평', price: '24만원' },
        { type: '28평 ~ 30평', price: '26만원' },
        { type: '32평 ~ 35평', price: '28만원' },
        { type: '36평 ~ 39평', price: '32만원' }
      ],
      additional: [
        { service: '1세대', price: '별도 문의' },
        { service: '3세대 동시 예약', price: '별도 문의' },
        { service: '6세대 동시 예약', price: '별도 문의' }
      ]
    }
  };

  const currentData = regionData[selectedRegion];

  const handleRegionButtonClick = (region) => {
    setSelectedRegion(region);
    // 1024px 이하일 때만 팝업 열기
    if (window.innerWidth <= 1024) {
      setPopupData(regionData[region]);
      setIsPopupOpen(true);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupData(null);
  };

  return (
    <Container>
      <Content>
        <Header>
          <Subtitle>오직 하방에서만 만나보세요!</Subtitle>
          <Title>경상권 전역 출장비 무료혜택</Title>
        </Header>

        <MainContent>
          <MapSection>
            <MapImage src={currentData.mapImage} alt={`${selectedRegion} 지도`} />
          </MapSection>

          <InfoSection>
             <RegionButtons>
               {Object.keys(regionData).map((region) => (
                 <RegionButton
                   key={region}
                   active={selectedRegion === region}
                   region={region}
                   onClick={() => handleRegionButtonClick(region)}
                 >
                   {region}
                 </RegionButton>
               ))}
             </RegionButtons>

            <ServiceInfo>
              <ServiceTitle>서비스 견적</ServiceTitle>
              {/* <ServiceNote>
                출장비는 별도로 부과되지 않습니다.<br />
                차량은 요금과 추가 요금없이(1566-2384)로 문의 바랍니다.
              </ServiceNote> */}

              <DesktopOnly>
                <PricingTable>
                  <TableHeader>
                    <HeaderCell>평형</HeaderCell>
                    <HeaderCell>가격</HeaderCell>
                  </TableHeader>
                  <TableBody>
                    {currentData.services.map((service, index) => (
                      <TableRow key={index}>
                        <TableCell>{service.type}</TableCell>
                        <TableCell>{service.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </PricingTable>

                 <AdditionalSection>
                   <AdditionalTitle>출장비</AdditionalTitle>
                   
                   {selectedRegion === '경상권' ? (
                     // 경상권만 그리드 형태
                     <GridContainer>
                       {currentData.additional.map((item, index) => (
                         <GridItem key={index}>
                           <GridLabel>{item.service}</GridLabel>
                           <GridValue>{item.price}</GridValue>
                         </GridItem>
                       ))}
                     </GridContainer>
                     
                   ) : selectedRegion === '기타지역' ? (
                     // 기타지역은 간단한 텍스트
                     <SimpleTextContainer>
                       <SimpleText>고객센터로 별도 문의 부탁드립니다.</SimpleText>
                       <ContactInfo>
                         - 출장비는 세대별로 부과됩니다.<br />
                         - 자세한 요금 및 조건은 <span>고객센터(📞1566-2384)</span>로 문의 바랍니다.
                       </ContactInfo>
                     </SimpleTextContainer>
                   ) : (
                     // 나머지 지역은 테이블 형태
                     <AdditionalTable>
                       <TableHeader>
                         <HeaderCell>예약 세대 수</HeaderCell>
                         <HeaderCell>출장비(세대별)</HeaderCell>
                       </TableHeader>
                       <TableBody>
                         {currentData.additional.map((item, index) => (
                           <TableRow key={index}>
                             <TableCell>{item.service}</TableCell>
                             <TableCell>{item.price}</TableCell>
                           </TableRow>
                         ))}
                       </TableBody>
                     </AdditionalTable>
                   )}
                   
                   {selectedRegion !== '기타지역' && (
                     <AdditionalNote>
                       - 자세한 요금 및 조건은 <span>고객센터(📞1566-2384)</span>로 문의 바랍니다.
                     </AdditionalNote>
                   )}
                 </AdditionalSection>
              </DesktopOnly>

              <MobileOnly>
                <MobileMessage>지역을 선택하여 가격표를 확인하세요</MobileMessage>
              </MobileOnly>
            </ServiceInfo>
          </InfoSection>
        </MainContent>
      </Content>

      {/* 팝업 */}
      {isPopupOpen && popupData && (
        <PopupOverlay onClick={closePopup}>
          <PopupContainer onClick={(e) => e.stopPropagation()}>
            <PopupHeader>
              <PopupTitle>{selectedRegion} 가격표</PopupTitle>
              <CloseButton onClick={closePopup}>×</CloseButton>
            </PopupHeader>
            
            <PopupContent>
              <PopupSection>
                <PopupSectionTitle>서비스 견적</PopupSectionTitle>
                <PopupTable>
                  <TableHeader>
                    <HeaderCell>평형</HeaderCell>
                    <HeaderCell>가격</HeaderCell>
                  </TableHeader>
                  <TableBody>
                    {popupData.services.map((service, index) => (
                      <TableRow key={index}>
                        <TableCell>{service.type}</TableCell>
                        <TableCell>{service.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </PopupTable>
              </PopupSection>

              <PopupSection>
                <PopupSectionTitle>출장비</PopupSectionTitle>
                {selectedRegion === '경상권' ? (
                  <GridContainer>
                    {popupData.additional.map((item, index) => (
                      <GridItem key={index}>
                        <GridLabel>{item.service}</GridLabel>
                        <GridValue>{item.price}</GridValue>
                      </GridItem>
                    ))}
                  </GridContainer>
                ) : selectedRegion === '기타지역' ? (
                  <SimpleTextContainer>
                    <SimpleText>고객센터로 별도 문의 부탁드립니다.</SimpleText>
                    <ContactInfo>
                    - 출장비는 세대별로 부과됩니다.<br />
                    - 자세한 요금 및 조건은 <span>고객센터(📞1566-2384)</span>로 문의 바랍니다.
                    </ContactInfo>
                  </SimpleTextContainer>
                ) : (
                  <PopupTable>
                    <TableHeader>
                      <HeaderCell>예약 세대 수</HeaderCell>
                      <HeaderCell>출장비(세대별)</HeaderCell>
                    </TableHeader>
                    <TableBody>
                      {popupData.additional.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.service}</TableCell>
                          <TableCell>{item.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </PopupTable>
                )}
              </PopupSection>

              {selectedRegion !== '기타지역' && selectedRegion !== '경상권' && (
                <PopupNote>
                  - 출장비는 세대별로 부과됩니다.<br />
                  - 자세한 요금 및 조건은 <span>고객센터(📞1566-2384)</span>로 문의 바랍니다.
                </PopupNote>
              )}
            </PopupContent>
          </PopupContainer>
        </PopupOverlay>
      )}
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  padding: 120px 0;
  background: #f8f9fa;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 1024px) {
    text-align: center;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 10px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textDark};
  word-break: keep-all;

  @media (max-width: 1200px) {
    font-size: 2.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const MainContent = styled.div`
  display: flex;
  gap: 240px;
  align-items: flex-start;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 40px;
    text-align: center;
  }
`;

const MapSection = styled.div`
  flex: 1;
  max-width: 400px;
  margin-top: 100px;

  @media (max-width: 1024px) {
    max-width: 60%;
    display: flex;
    justify-content: center;
    margin: 0 auto;
  }
`;

const MapImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 20px;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    max-width: 400px;
  }
`;

const InfoSection = styled.div`
  flex: 1;
  min-width: 0;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const RegionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 40px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 8px;
    margin-bottom: 30px;
  }
`;

const RegionButton = styled.button`
  padding: 12px 24px;
  border: 2px solid ${({ theme, active, region }) => {
    if (!active) return '#e0e0e0';
    switch(region) {
      case '경상권': return theme.primaryMiddle;
      case '대전/충북': return '#00f08d';
      case '서울/경기': return '#f000e2';
      case '전라/충남': return '#f0b500';
      case '기타지역': return '#4f00f0';
      default: return theme.primary;
    }
  }};
  background: ${({ theme, active, region }) => {
    if (!active) return 'white';
    switch(region) {
      case '경상권': return theme.primaryMiddle;
      case '대전/충북': return '#00f08d';
      case '서울/경기': return '#f000e2';
      case '전라/충남': return '#f0b500';
      case '기타지역': return '#4f00f0';
      default: return theme.primary;
    }
  }};
  color: ${({ theme, active }) => active ? 'white' : theme.textDark};
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme, region }) => {
      switch(region) {
        case '경상권': return theme.primaryMiddle;
        case '대전/충북': return '#00f08d';
        case '서울/경기': return '#f000e2';
        case '전라/충남': return '#f0b500';
        case '기타지역': return '#4f00f0';
        default: return theme.primary;
      }
    }};
    color: white;
    border-color: ${({ theme, region }) => {
      switch(region) {
        case '경상권': return theme.primaryMiddle;
        case '대전/충북': return '#00f08d';
        case '서울/경기': return '#f000e2';
        case '전라/충남': return '#f0b500';
        case '기타지역': return '#4f00f0';
        default: return theme.primary;
      }
    }};
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 0.9rem;
  }
`;

const ServiceInfo = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;

  @media (max-width: 1024px) {
    max-width: 500px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    padding: 30px 20px;
    max-width: 100%;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textDark};
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 2px solid ${({ theme }) => theme.primary};
`;

const ServiceNote = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 30px;
  line-height: 1.6;
`;

const PricingTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-bottom: 40px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const AdditionalTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;


const TableHeader = styled.thead`
  background: #5278b7;
`;

const HeaderCell = styled.th`
  padding: 18px 20px;
  color: white;
  font-weight: 700;
  text-align: center;
  font-size: 1.1rem;
  border: none;

  &:first-child {
    border-top-left-radius: 12px;
  }

  &:last-child {
    border-top-right-radius: 12px;
  }

  @media (max-width: 768px) {
    padding: 15px 12px;
    font-size: 1rem;
  }
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(odd) {
    background: white;
  }
  
  &:nth-child(even) {
    background: rgba(26, 109, 255, 0.05);
  }

  &:last-child td:first-child {
    border-bottom-left-radius: 12px;
  }

  &:last-child td:last-child {
    border-bottom-right-radius: 12px;
  }

  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(26, 109, 255, 0.08) !important;
  }
`;

const TableCell = styled.td`
  padding: 16px 20px;
  text-align: center;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textDark};

  @media (max-width: 768px) {
    padding: 14px 12px;
    font-size: 0.95rem;
  }
`;

const AdditionalSection = styled.div`
  margin-top: 40px;
`;

const AdditionalTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textDark};
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid ${({ theme }) => theme.primary};
`;

const AdditionalNote = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textLight};
  line-height: 1.6;
  margin-top: 15px;

  span {
    color: ${({ theme }) => theme.primaryMiddle};
    font-weight: 700;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const GridItem = styled.div`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(26, 109, 255, 0.05);
    border-color: rgba(26, 109, 255, 0.2);
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const GridLabel = styled.div`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 8px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const GridValue = styled.div`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textDark};
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SimpleTextContainer = styled.div`
  
 
  text-align: center;
  margin-bottom: 20px;
  

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const SimpleText = styled.div`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textDark};
  font-weight: 600;
  margin-bottom: 15px;
  border: 1px solid #e9ecef;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 30px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ContactInfo = styled.div`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textLight};
  line-height: 1.6;
  text-align: left;
  span {
    color: ${({ theme }) => theme.primaryMiddle};
    font-weight: 700;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const DesktopOnly = styled.div`
  @media (max-width: 1024px) {
    display: none;
  }
`;

const MobileOnly = styled.div`
  display: none;
  
  @media (max-width: 1024px) {
    display: block;
  }
`;

const MobileMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  background: #f8f9fa;
  border-radius: 12px;
  color: ${({ theme }) => theme.textLight};
  font-size: 1rem;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const PopupContainer = styled.div`
  background: white;
  border-radius: 20px;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  border-bottom: 1px solid #e9ecef;
`;

const PopupTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textDark};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  color: ${({ theme }) => theme.textLight};
  cursor: pointer;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f9fa;
    color: ${({ theme }) => theme.textDark};
  }
`;

const PopupContent = styled.div`
  padding: 30px;
`;

const PopupSection = styled.div`
  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const PopupSectionTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textDark};
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 2px solid ${({ theme }) => theme.primary};
`;

const PopupTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const PopupNote = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textLight};
  line-height: 1.6;
  margin-top: 20px;
  text-align: center;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  text-align: left;
  span {
    color: ${({ theme }) => theme.primaryMiddle};
    font-weight: 700;
  }
`;

export default PricingSection;

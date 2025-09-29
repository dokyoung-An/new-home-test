import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { fadeIn } from '../../../../styles/animations';
import { getActiveEvents } from '../../../../lib/activeEventApi';

const ActiveEventBoard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  
  const EVENTS_PER_PAGE = 6;

  useEffect(() => {
    loadEvents();
  }, [currentPage]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 새로운 API를 사용하여 페이지네이션된 데이터 가져오기
      const response = await getActiveEvents(currentPage, EVENTS_PER_PAGE);
      setTotalEvents(response.total);
      setTotalPages(response.totalPages);
      
      // 데이터 형식 변환
      const formattedData = response.data.map(event => {
        let contentUrls = [];
        
        // content_urls 파싱
        if (event.content_urls) {
          try {
            contentUrls = JSON.parse(event.content_urls);
          } catch (e) {
            console.error('content_urls 파싱 오류:', e);
            contentUrls = [];
          }
        }
        
        return {
          id: event.id,
          title: event.title,
          description: event.description,
          contentUrls: contentUrls,
          thumbnailUrl: event.thumbnail_url,
          startDate: new Date(event.start_date).toLocaleDateString('ko-KR'),
          endDate: new Date(event.end_date).toLocaleDateString('ko-KR'),
          eventType: event.event_type,
          maxParticipants: event.max_participants,
          currentParticipants: event.current_participants,
          date: new Date(event.created_at).toLocaleDateString('ko-KR')
        };
      });
      
      setEvents(formattedData);
    } catch (err) {
      setError('진행 중인 이벤트를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleEventClick = (eventId) => {
    navigate(`/active-event/${eventId}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // 페이지 변경 시 스크롤을 섹션 상단으로 이동
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // 이전 페이지 버튼
    if (currentPage > 1) {
      pages.push(
        <PageButton key="prev" onClick={() => handlePageChange(currentPage - 1)}>
          ‹
        </PageButton>
      );
    }

    // 페이지 번호들
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageButton
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PageButton>
      );
    }

    // 다음 페이지 버튼
    if (currentPage < totalPages) {
      pages.push(
        <PageButton key="next" onClick={() => handlePageChange(currentPage + 1)}>
          ›
        </PageButton>
      );
    }

    return <Pagination>{pages}</Pagination>;
  };

  if (loading) {
    return (
      <Container>
        <Content>
          <LoadingMessage>진행 중인 이벤트를 불러오는 중...</LoadingMessage>
        </Content>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Content>
          <ErrorMessage>{error}</ErrorMessage>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <Header>
          <Title>진행중인 이벤트</Title>
        </Header>
        
        {events.length === 0 ? (
          <EmptyMessage>현재 진행중인 이벤트가 없습니다.</EmptyMessage>
        ) : (
          <>
            <EventGrid>
              {events.map((event) => (
                <EventCard key={event.id} onClick={() => handleEventClick(event.id)}>
                  <ImageContainer>
                    {(() => {
                      // 썸네일이 있으면 썸네일 우선, 없으면 첫 번째 content 이미지 사용
                      const displayImage = event.thumbnailUrl || 
                        (event.contentUrls && event.contentUrls.length > 0 ? event.contentUrls[0] : null);
                      
                      return displayImage ? (
                        <EventImage src={displayImage} alt={event.title} />
                      ) : (
                        <PlaceholderImage>
                          <PlaceholderText>이미지 없음</PlaceholderText>
                        </PlaceholderImage>
                      );
                    })()}
                  </ImageContainer>
                  <CardContent>
                    <EventTitle>{event.title}</EventTitle>
                    <EventDescription>{event.description}</EventDescription>
                    <EventInfo>
                      <EventDate>
                        {event.startDate} ~ {event.endDate}
                      </EventDate>
                      {event.maxParticipants && (
                        <ParticipantInfo>
                          참가자: {event.currentParticipants}/{event.maxParticipants}
                        </ParticipantInfo>
                      )}
                    </EventInfo>
                  </CardContent>
                </EventCard>
              ))}
            </EventGrid>
            
            {renderPagination()}
          </>
        )}
      </Content>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  padding: 80px 0;
  background: #ffffff;
  animation: ${fadeIn} 1s ease-out;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const Header = styled.div`
  text-align: left;
  margin-bottom: 60px;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textDark};
  margin-bottom: 20px;
  word-break: keep-all;
  border-bottom: 1px solid ${({ theme }) => theme.primary};
  padding-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;



const LoadingMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textLight};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  font-size: 1.2rem;
  color: #c62828;
  background: #ffebee;
  border-radius: 12px;
  border-left: 4px solid #c62828;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 80px 20px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textLight};
`;

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto 40px auto;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const EventCard = styled.div`
  background: white;
  overflow: hidden; 
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-3px);
  
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EventImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${EventCard}:hover & {
    transform: scale(1.05);
  }
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #adb5bd;
  font-size: 1rem;
  font-weight: 500;
`;

const PlaceholderText = styled.span`
  color: #999;
  font-size: 1rem;
`;

const CardContent = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const EventTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textDark};
  margin-bottom: 8px;
  word-break: keep-all;
  line-height: 1.4;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const EventDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textLight};
  line-height: 1.4;
  margin-bottom: 12px;
  text-align: center;
  word-break: keep-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: auto;
`;

const EventDate = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textLight};
  text-align: center;
  font-weight: 500;
`;

const ParticipantInfo = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.primaryColor};
  text-align: center;
  font-weight: 600;
  background: rgba(67, 56, 202, 0.1);
  padding: 4px 8px;
  border-radius: 8px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
`;

const PageButton = styled.button`
  padding: 10px 14px;
  border: 1px solid ${({ active, theme }) => active ? theme.primaryColor : '#e9ecef'};
  background: ${({ active, theme }) => active ? theme.primaryColor : 'white'};
  color: ${({ active, theme }) => active ? 'white' : theme.textDark};
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  min-width: 40px;

  &:hover {
    background: ${({ active, theme }) => active ? theme.primaryColor : '#f8f9fa'};
    border-color: ${({ theme }) => theme.primaryColor};
    color: ${({ active, theme }) => active ? 'white' : theme.primaryColor};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default ActiveEventBoard;

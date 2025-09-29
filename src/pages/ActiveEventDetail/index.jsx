import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fadeIn } from '../../styles/animations';
import { getActiveEvent } from '../../lib/activeEventApi';

const ActiveEventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEventData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadEventData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const eventData = await getActiveEvent(id);
      
      // content_urls 파싱
      let contentUrls = [];
      if (eventData.content_urls) {
        try {
          contentUrls = typeof eventData.content_urls === 'string' 
            ? JSON.parse(eventData.content_urls) 
            : eventData.content_urls;
        } catch (e) {
          console.error('content_urls 파싱 오류:', e);
          contentUrls = [];
        }
      }
      
      setEvent({
        ...eventData,
        contentUrls,
        startDate: new Date(eventData.start_date).toLocaleDateString('ko-KR'),
        endDate: new Date(eventData.end_date).toLocaleDateString('ko-KR'),
        createdAt: new Date(eventData.created_at).toLocaleDateString('ko-KR')
      });
    } catch (err) {
      setError('이벤트를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };


  const handleBackToList = () => {
    navigate('/event');
  };

  const getEventTypeText = (type) => {
    switch (type) {
      case 'promotion': return '프로모션';
      case 'contest': return '경진대회';
      case 'announcement': return '공지사항';
      default: return '일반';
    }
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'promotion': return { bg: '#e8f5e8', color: '#2e7d32' };
      case 'contest': return { bg: '#fff3e0', color: '#f57c00' };
      case 'announcement': return { bg: '#e3f2fd', color: '#1976d2' };
      default: return { bg: '#f5f5f5', color: '#666' };
    }
  };

  if (loading) {
    return (
      <Container>
        <Content>
          <LoadingMessage>이벤트를 불러오는 중...</LoadingMessage>
        </Content>
      </Container>
    );
  }

  if (error || !event) {
    return (
      <Container>
        <Content>
          <ErrorMessage>
            {error || '이벤트를 찾을 수 없습니다.'}
            <BackButton onClick={handleBackToList}>목록으로 돌아가기</BackButton>
          </ErrorMessage>
        </Content>
      </Container>
    );
  }

  const typeColor = getEventTypeColor(event.event_type);

  return (
    <Container>
      <Content>
        <Header>
          <Wrapper>
          <BackButton onClick={handleBackToList}>← 목록으로</BackButton></Wrapper>
          <EventMeta>
            <MetaRow>
              <EventDate>
                이벤트 기간: {event.startDate} ~ {event.endDate}
              </EventDate>
              <EventType style={{ background: typeColor.bg, color: typeColor.color }}>
                {getEventTypeText(event.event_type)}
              </EventType>
            </MetaRow>
            <StatusRow>
              <EventStatus active={event.is_active}>
                {event.is_active ? '진행 중' : '종료됨'}
              </EventStatus>
              {event.max_participants && (
                <ParticipantCount>
                  참가자: {event.current_participants}/{event.max_participants}
                </ParticipantCount>
              )}
            </StatusRow>
          </EventMeta>
          <EventTitle>{event.title}</EventTitle>
          <EventDescription>{event.description}</EventDescription>
        </Header>

        <EventContent>
          {event.thumbnail_url && (
            <ThumbnailContainer>
              <ThumbnailImage src={event.thumbnail_url} alt={event.title} />
            </ThumbnailContainer>
          )}
          
          {event.contentUrls && event.contentUrls.length > 0 && (
            <ContentImageContainer>
              {event.contentUrls.map((url, index) => (
                <ContentImage key={index} src={url} alt={`${event.title} - 이미지 ${index + 1}`} />
              ))}
            </ContentImageContainer>
          )}
        </EventContent>


      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #fff;
  padding: 40px 0;
  animation: ${fadeIn} 1s ease-out;
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 100px 20px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textLight};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 100px 20px;
  font-size: 1.2rem;
  color: #c62828;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  padding: 40px;
  margin-bottom: 30px;
  
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: right;
  gap: 10px;
`;
const BackButton = styled.button`
  background: ${({ theme }) => theme.primaryMiddle};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    background: ${({ theme }) => theme.primaryDark};
    transform: translateY(-1px);
  }
`;

const EventMeta = styled.div`
  margin-bottom: 20px;
`;

const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const StatusRow = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const EventDate = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.textLight};
  font-weight: 500;
`;

const EventType = styled.span`
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const EventStatus = styled.span`
  background: ${({ active }) => active ? '#e8f5e8' : '#ffebee'};
  color: ${({ active }) => active ? '#2e7d32' : '#c62828'};
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const ParticipantCount = styled.span`
  background: rgba(67, 56, 202, 0.1);
  color: ${({ theme }) => theme.primaryColor};
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const EventTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textDark};
  line-height: 1.3;
  border-bottom: 1px solid ${({ theme }) => theme.primary};
  padding-bottom: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const EventDescription = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textLight};
  line-height: 1.6;
  word-break: keep-all;
  text-align: center;
`;

const EventContent = styled.div`
  padding: 40px;
  margin-bottom: 30px;

`;

const ThumbnailContainer = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

const ThumbnailImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const ContentImageContainer = styled.div`
  text-align: center;
`;

const ContentImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;




export default ActiveEventDetail;


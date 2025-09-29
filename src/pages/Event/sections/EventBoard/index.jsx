import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { fadeIn } from '../../../../styles/animations';
import { getEventPosts } from '../../../../lib/eventApi';

const EventBoard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEventPosts();
      
      // 데이터 형식 변환
      const formattedData = data.map(post => {
        let contentUrls = [];
        
        // content_urls 파싱
        if (post.content_urls) {
          try {
            contentUrls = JSON.parse(post.content_urls);
          } catch (e) {
            console.error('content_urls 파싱 오류:', e);
            contentUrls = [];
          }
        }
        
        return {
          id: post.id,
          title: post.title,
          contentUrls: contentUrls,
          thumbnailUrl: post.thumbnail_url,
          date: new Date(post.created_at).toLocaleDateString('ko-KR')
        };
      });
      
      setPosts(formattedData);
    } catch (err) {
      setError('이벤트를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/event/${postId}`);
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
           <Title>상시 이벤트</Title>
         </Header>
        {posts.length === 0 ? (
          <EmptyMessage>현재 진행중인 이벤트가 없습니다.</EmptyMessage>
        ) : (
          <EventGrid>
            {posts.map((post) => (
               <EventCard key={post.id} onClick={() => handlePostClick(post.id)}>
                 <ImageContainer>
                   {(() => {
                     // 썸네일이 있으면 썸네일 우선, 없으면 첫 번째 content 이미지 사용
                     const displayImage = post.thumbnailUrl || 
                       (post.contentUrls && post.contentUrls.length > 0 ? post.contentUrls[0] : null);
                     
                     return displayImage ? (
                       <EventImage src={displayImage} alt={post.title} />
                     ) : (
                       <PlaceholderImage>
                         <PlaceholderText>이미지 없음</PlaceholderText>
                       </PlaceholderImage>
                     );
                   })()}
                 </ImageContainer>
                <CardContent>
                  <EventTitle>{post.title}</EventTitle>
                  <EventDate>{post.date}</EventDate>
                </CardContent>
              </EventCard>
            ))}
          </EventGrid>
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
  margin: 0 auto;
  
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

const EventDate = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textLight};
  text-align: center;
  margin-top: auto;
`;

export default EventBoard;

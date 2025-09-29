import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fadeIn } from '../../styles/animations';
import { getEventPost, getAdjacentPosts } from '../../lib/eventApi';
import { incrementParticipants } from '../../lib/activeEventApi';
import Sec1Hero from '../Event/sections/Sec1Hero';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [adjacentPosts, setAdjacentPosts] = useState({ prevPost: null, nextPost: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [participating, setParticipating] = useState(false);

  useEffect(() => {
    loadPostData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadPostData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 현재 게시글과 이전/다음 게시글을 병렬로 로드
      const [postData, adjacentData] = await Promise.all([
        getEventPost(id),
        getAdjacentPosts(id)
      ]);
      
      setPost({
        ...postData,
        date: new Date(postData.created_at).toLocaleDateString('ko-KR')
      });
      setAdjacentPosts(adjacentData);
    } catch (err) {
      setError('게시글을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToPost = (postId) => {
    navigate(`/event/${postId}`);
  };

  const handleBackToList = () => {
    navigate('/event');
  };

  const handleParticipate = async () => {
    try {
      setParticipating(true);
      await incrementParticipants(id);
      alert('이벤트 참가가 완료되었습니다!');
    } catch (err) {
      alert(err.message || '참가 처리 중 오류가 발생했습니다.');
    } finally {
      setParticipating(false);
    }
  };

  if (loading) {
    return (
      <>
        <Sec1Hero />
        <Container>
          <Content>
            <LoadingMessage>게시글을 불러오는 중...</LoadingMessage>
          </Content>
        </Container>
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Sec1Hero />
        <Container>
          <Content>
            <ErrorMessage>
              {error || '게시글을 찾을 수 없습니다.'}
              <BackButton onClick={handleBackToList}>목록으로 돌아가기</BackButton>
            </ErrorMessage>
          </Content>
        </Container>
      </>
    );
  }

  return (
    <>
      <Sec1Hero />
      <Container>
        <Content>
          <Header>
            <Wrapper>
            <BackButton onClick={handleBackToList}>← 목록으로</BackButton></Wrapper>
            <PostDate>{post.date}</PostDate>
            <PostTitle>{post.title}</PostTitle>
          </Header>

        <PostContent>
          {post.thumbnail_url && (
            <ThumbnailContainer>
              <ThumbnailImage src={post.thumbnail_url} alt={post.title} />
            </ThumbnailContainer>
          )}
          
          {(() => {
            // content_urls와 기존 content 호환성 처리
            let contentUrls = [];
            
            // 새로운 content_urls가 있으면 우선 사용
            if (post.content_urls) {
              try {
                contentUrls = typeof post.content_urls === 'string' 
                  ? JSON.parse(post.content_urls) 
                  : post.content_urls;
              } catch (e) {
                console.error('content_urls 파싱 오류:', e);
                contentUrls = [];
              }
            }
            
            return contentUrls.length > 0 && (
              <ContentImageContainer>
                {contentUrls.map((url, index) => (
                  <ContentImage key={index} src={url} alt={`${post.title} - 이미지 ${index + 1}`} />
                ))}
              </ContentImageContainer>
            );
          })()}
          
          {/* 기존 content 필드가 있고 이미지가 아닌 텍스트인 경우 표시 */}
          {post.content && !post.content_urls && (
            <ContentText>{post.content}</ContentText>
          )}
        </PostContent>

        {/* <ParticipateSection>
          <ParticipateTitle>이벤트 참가하기</ParticipateTitle>
          <ParticipateDescription>
            지금 참가하여 특별한 혜택을 받아보세요!
          </ParticipateDescription>
          <ParticipateButton 
            onClick={handleParticipate} 
            disabled={participating}
          >
            {participating ? '참가 처리 중...' : '이벤트 참가하기'}
          </ParticipateButton>
        </ParticipateSection> */}

        <Navigation>
          <NavTitle>다른 이벤트 보기</NavTitle>
          <NavButtons>
            {adjacentPosts.prevPost ? (
              <NavButton onClick={() => handleNavigateToPost(adjacentPosts.prevPost.id)}>
                <NavLabel>이전글</NavLabel>
                <NavPostTitle>{adjacentPosts.prevPost.title}</NavPostTitle>
              </NavButton>
            ) : (
              <NavButton disabled>
                <NavLabel>이전글</NavLabel>
                <NavPostTitle>이전글이 없습니다</NavPostTitle>
              </NavButton>
            )}
            
            {adjacentPosts.nextPost ? (
              <NavButton onClick={() => handleNavigateToPost(adjacentPosts.nextPost.id)}>
                <NavLabel>다음글</NavLabel>
                <NavPostTitle>{adjacentPosts.nextPost.title}</NavPostTitle>
              </NavButton>
            ) : (
              <NavButton disabled>
                <NavLabel>다음글</NavLabel>
                <NavPostTitle>다음글이 없습니다</NavPostTitle>
              </NavButton>
            )}
          </NavButtons>
        </Navigation>
        </Content>
      </Container>
    </>
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

const PostDate = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 15px;
  text-align: center;
`;

const PostTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textDark};
  line-height: 1.3;
  word-break: keep-all;
  border-bottom: 1px solid ${({ theme }) => theme.primary};
  padding-bottom: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PostContent = styled.div`
 
  border-radius: 20px;
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
  margin-top: 30px;
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

const ContentText = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.textDark};
  white-space: pre-wrap;
  word-break: break-word;
  margin-top: 30px;
`;

const Navigation = styled.div`
  border-radius: 20px;
  padding: 30px;
 
`;

const ParticipateSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 30px;
  text-align: center;
  color: white;
`;

const ParticipateTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 15px;
`;

const ParticipateDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 25px;
  opacity: 0.9;
`;

const ParticipateButton = styled.button`
  background: ${({ disabled }) => disabled ? '#999' : 'white'};
  color: ${({ disabled }) => disabled ? 'white' : '#667eea'};
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: ${({ disabled }) => disabled ? 'none' : 'translateY(-2px)'};
    box-shadow: ${({ disabled }) => disabled ? '0 5px 15px rgba(0, 0, 0, 0.2)' : '0 8px 25px rgba(0, 0, 0, 0.3)'};
  }
`;

const NavTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textDark};
  margin-bottom: 20px;
  text-align: left;
  border-bottom: 1px solid ${({ theme }) => theme.primary};
  padding-bottom: 20px;
`;

const NavButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const NavButton = styled.button`
  background: ${({ disabled }) => disabled ? '#f5f5f5' : 'white'};
  border: 2px solid ${({ disabled, theme }) => disabled ? '#e0e0e0' : theme.primaryMiddle};
  border-radius: 12px;
  padding: 20px;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  text-align: left;

  &:hover {
    background: ${({ disabled, theme }) => disabled ? '#f5f5f5' : theme.primaryLight};
    transform: ${({ disabled }) => disabled ? 'none' : 'translateY(-2px)'};
  }
`;

const NavLabel = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 8px;
`;

const NavPostTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textDark};
  line-height: 1.4;
  word-break: keep-all;
`;

export default EventDetail;

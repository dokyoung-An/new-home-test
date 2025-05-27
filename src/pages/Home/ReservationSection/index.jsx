import React, { useEffect, useState } from 'react';
import { Container } from '../../../styles/common';
import { supabase } from '../../../lib/supabaseClient';
import {
  ReservationWrapper,
  SectionContainer,
  BoardsContainer,
  BoardColumn,
  BoardTitle,
  BoardListWrapper,
  BoardList,
  BoardListClone,
  BoardItem,
  ItemDate,
  ItemContent,
  ItemStatus,
  ItemLocation,
  StatusText
} from './style';

const ReservationSection = () => {
  const [reservations, setReservations] = useState([]);
  const [vrWorks, setVrWorks] = useState([]);

  useEffect(() => {
    // 예약 현황 데이터 가져오기
    const fetchReservations = async () => {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching reservations:', error);
        return;
      }

      const formattedData = data.map(item => ({
        id: item.id,
        date: new Date(item.created_at).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).replace(/\. /g, '.').slice(0, -1),
        location: item.region || '',
        status: item.inquiry_status || 'new',
        content: item.apartment || ''
      }));

      setReservations(formattedData);
    };

    // VR 작업 현황 데이터 (임시 데이터)
    const vrWorksData = [
      { id: 1, date: '2024.11.18', location: '송파구 잠실동', status: '촬영완료', content: '잠실 엘스' },
      { id: 2, date: '2024.11.14', location: '강남구 대치동', status: '편집중', content: '래미안 대치팰리스' },
      { id: 3, date: '2024.11.13', location: '서초구 반포동', status: '업로드완료', content: '반포 자이' },
      { id: 4, date: '2024.11.11', location: '마포구 상암동', status: '촬영중', content: '상암 월드컵파크' },
      { id: 5, date: '2024.11.04', location: '영등포구', status: '업로드완료', content: '영등포 아크로' },
      { id: 6, date: '2024.11.03', location: '용산구', status: '편집중', content: '용산 파크타워' },
    ];
    setVrWorks(vrWorksData);

    // 실시간 업데이트 구독
    const subscription = supabase
      .channel('inquiries_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'inquiries' 
        }, 
        () => {
          fetchReservations();
        }
      )
      .subscribe();

    // 초기 데이터 로드
    fetchReservations();

    // 클린업
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 예약 상태 변환 함수
  const getReservationStatus = (status) => {
    switch (status?.toLowerCase()) {
      case 'new':
        return '신규문의';
      case 'in-progress':
        return '상담중';
      case 'completed':
        return '예약완료';
      default:
        return '신규문의';
    }
  };

  const renderBoardItems = (items, clone = false) => {
    const ListComponent = clone ? BoardListClone : BoardList;
    return (
      <ListComponent>
        {items.map((item) => (
          <BoardItem key={`${item.id}-${clone ? 'clone' : 'original'}`}>
            <ItemDate>{item.date}</ItemDate>
            <ItemContent>
              <div>{item.content}</div>
              <ItemLocation>{item.location}</ItemLocation>
            </ItemContent>
            <ItemStatus>
              <StatusText status={item.status}>
                {getReservationStatus(item.status)}
              </StatusText>
            </ItemStatus>
          </BoardItem>
        ))}
      </ListComponent>
    );
  };

  return (
    <section id="ReservationSection">
      <ReservationWrapper>
        <Container>
          <SectionContainer>
            <BoardsContainer>
              <BoardColumn>
                <BoardTitle>
                  <h3>예약 현황</h3>
                  <div className="more">더보기</div>
                </BoardTitle>
                <BoardListWrapper>
                  {renderBoardItems(reservations)}
                  {renderBoardItems(reservations, true)}
                </BoardListWrapper>
              </BoardColumn>
              
         
            </BoardsContainer>
          </SectionContainer>
        </Container>
      </ReservationWrapper>
    </section>
  );
};

export default ReservationSection; 
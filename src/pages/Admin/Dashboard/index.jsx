import React, { useState } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../styles/animations';
import EventAdmin from '../EventAdmin';
import ActiveEventAdmin from '../ActiveEventAdmin';
import ReportAdmin from '../ReportAdmin';
import VrAdmin from '../VrAdmin';
import InquiryAdmin from '../InquiryAdmin';
import PopupAdmin from '../PopupAdmin';
import GroupBuyAdmin from '../GroupBuyAdmin';
import ProjectAdmin from '../ProjectAdmin';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('inquiries');

  const menuItems = [
    { id: 'inquiries', label: '문의사항 관리', icon: '💬' },
    { id: 'reports', label: '보고서 관리', icon: '📄' },
    { id: 'vr', label: 'VR 관리', icon: '🥽' },
    { id: 'events', label: '이벤트 관리', icon: '📅' },
    { id: 'active-events', label: '진행중인 이벤트', icon: '🎯' },
    { id: 'projects', label: '공동구매 관리', icon: '🏗️' },
    { id: 'project-section', label: '프로젝트 섹션 관리', icon: '🏢' },
    { id: 'popup', label: '팝업 관리', icon: '🪟' },
   
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'inquiries':
        return <InquiryAdmin />;
      case 'events':
        return <EventAdmin />;
      case 'active-events':
        return <ActiveEventAdmin />;
      case 'reports':
        return <ReportAdmin />;
      case 'vr':
        return <VrAdmin />;   
      case 'popup':
        return <PopupAdmin />;
      case 'projects':
        return <GroupBuyAdmin />;
      case 'project-section':
        return <ProjectAdmin />;
      default:
        return <EventAdmin />;
    }
  };

  return (
    <Container>
      <DashboardLayout>
        <Sidebar>
          <SidebarHeader>
            <Logo>🏠 하방 관리자</Logo>
            <Subtitle>Admin Dashboard</Subtitle>
          </SidebarHeader>
          
          <MenuList>
            {menuItems.map((item) => (
              <MenuItem
                key={item.id}
                active={activeTab === item.id}
                onClick={() => setActiveTab(item.id)}
              >
                <MenuIcon>{item.icon}</MenuIcon>
                <MenuLabel>{item.label}</MenuLabel>
              </MenuItem>
            ))}
          </MenuList>
        </Sidebar>

        <MainContent>
          <ContentHeader>
            <PageTitle>
              {menuItems.find(item => item.id === activeTab)?.label || '관리자 페이지'}
            </PageTitle>
            <PageDescription>
              {getPageDescription(activeTab)}
            </PageDescription>
          </ContentHeader>
          
          <ContentArea>
            {renderContent()}
          </ContentArea>
        </MainContent>
      </DashboardLayout>
    </Container>
  );
};

const getPageDescription = (tab) => {
  switch (tab) {
    case 'events':
      return '일반 이벤트를 관리할 수 있습니다.';
    case 'active-events':
      return '진행중인 이벤트를 관리할 수 있습니다.';
    case 'reports':
      return '점검 보고서를 관리할 수 있습니다.';
    case 'vr':
      return 'VR 콘텐츠를 관리할 수 있습니다.';
    case 'inquiries':
      return '고객 문의사항을 관리할 수 있습니다.';
    case 'popup':
      return '메인 팝업을 설정할 수 있습니다.';
    case 'projects':
      return '프로젝트를 관리할 수 있습니다.';
    default:
      return '관리자 페이지입니다.';
  }
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f8f9fa;
  animation: ${fadeIn} 1s ease-out;
`;

const DashboardLayout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.aside`
  width: 280px;
  background: linear-gradient(135deg, #01061b 0%, #22172e 100%);
  color: white;
  padding: 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  z-index: 1000;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    position: relative;
    padding: 20px;
  }
`;

const SidebarHeader = styled.div`
  padding: 30px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: white;
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 0;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
  background: ${({ active }) => active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  border-left-color: ${({ active }) => active ? 'white' : 'transparent'};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-left-color: white;
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;

const MenuIcon = styled.span`
  font-size: 1.2rem;
  margin-right: 12px;
  width: 24px;
  text-align: center;
`;

const MenuLabel = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 280px;
  padding: 0;
  background: #f8f9fa;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 20px;
  }
`;

const ContentHeader = styled.div`
  background: white;
  padding: 30px 40px;
  border-bottom: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textDark};
  margin: 0 0 8px 0;
`;

const PageDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.textLight};
  margin: 0;
`;

const ContentArea = styled.div`
  padding: 40px;
  min-height: calc(100vh - 200px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export default AdminDashboard;

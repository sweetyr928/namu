import styled from 'styled-components';
import { useState } from 'react';

const TabSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
`;

const TabButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 15%;
  button {
    padding: 10px;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    width: 100%;
    height: 100%;
`;

const TabCotentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const TabMenu = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <TabSection>
      <TabButtonContainer>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={activeTab === index ? 'active' : ''}
          >
            {tab.name}
          </button>
        ))}
      </TabButtonContainer>
      <TabCotentContainer>{tabs[activeTab].content}</TabCotentContainer>
    </TabSection>
  );
};

export default TabMenu;

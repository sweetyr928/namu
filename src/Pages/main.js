import styled from 'styled-components';
import { useState, useEffect } from 'react';
import PostSection from '../Components/UI/postSection';
import ChatSection from '../Components/UI/chatSection';
import Carousel from '../Components/Post/carousel';

const MainPage = () => {
  const [comp, setComp] = useState('list');
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [tagList, setTagList] = useState(['React.js', 'Vue.js']);

  const handleCompAndIdx = (newComp, idx) => {
    setComp(newComp);
    setSelectedIdx(idx);
  };

  useEffect(() => {
    console.log(selectedIdx);
    console.log(comp);
  }, [selectedIdx, comp]);

  return (
    <>
      <PostSection>
        {comp === 'list' && (
          <>
            <Carousel handleCompAndIdx={handleCompAndIdx} tagList={tagList} />
          </>
        )}
      </PostSection>
      <ChatSection></ChatSection>
    </>
  );
};

export default MainPage;

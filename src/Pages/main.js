import styled from 'styled-components';
import { useState, useEffect } from 'react';
import PostSection from '../Components/UI/postSection';
import ChatSection from '../Components/UI/chatSection';
import Carousel from '../Components/Post/carousel';
import PostDetail from '../Components/Post/postDetail';
import EditTag from '../Components/Tag/editTag';

const MainPage = () => {
  const [comp, setComp] = useState('list');
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [category, setCategory] = useState('');
  const [tagList, setTagList] = useState(['React.js', 'Vue.js']);

  const handlePostDetail = (newComp, newCategory, newIdx) => {
    setComp(newComp);
    setCategory(newCategory);
    setSelectedIdx(newIdx);
  };

  const handleComp = (newComp) => {
    setComp(newComp);
  };

  return (
    <>
      <PostSection>
        {comp === 'list' && (
          <Carousel
            handlePostDetail={handlePostDetail}
            tagList={tagList}
            handleComp={handleComp}
          />
        )}
        {comp === 'detail' && <PostDetail handleComp={handleComp} />}
        {comp === 'tag' && <EditTag handleComp={handleComp} />}
      </PostSection>
      <ChatSection></ChatSection>
    </>
  );
};

export default MainPage;

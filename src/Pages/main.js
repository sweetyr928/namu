import styled from 'styled-components';
import { useState, useEffect } from 'react';
import PostSection from '../Components/UI/postSection';
import Carousel from '../Components/Post/carousel';
import PostDetail from '../Components/Post/postDetail';

const Main = () => {
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
          <Carousel handlePostDetail={handlePostDetail} tagList={tagList} />
        )}
        {comp === 'detail' && <PostDetail handleComp={handleComp} />}
      </PostSection>
    </>
  );
};

export default Main;

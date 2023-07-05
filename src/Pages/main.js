import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PostSection from '../Components/UI/postSection';
import Carousel from '../Components/Post/carousel';
import PostDetail from '../Components/Post/postDetail';
import EditTag from '../Components/Tag/editTag';

const Main = () => {
  const [comp, setComp] = useState('list');
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [category, setCategory] = useState('');
  const [tagList, setTagList] = useState(['React.js', 'Vue.js']);
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      setComp(state.comp);
      setCategory(state.category);
      setSelectedIdx(state.idx);
    }
  }, [state]);

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
        {comp === 'detail' && (
          <PostDetail
            handleComp={handleComp}
            category={category}
            idx={selectedIdx}
          />
        )}
        {comp === 'tag' && <EditTag handleComp={handleComp} />}
      </PostSection>
    </>
  );
};

export default Main;

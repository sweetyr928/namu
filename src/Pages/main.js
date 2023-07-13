import styled from 'styled-components';
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import PostSection from '../Components/UI/postSection';
import Carousel from '../Components/Post/carousel';
import PostDetail from '../Components/Post/postDetail';
import EditTag from '../Components/Tag/editTag';

const Main = () => {
  const [comp, setComp] = useState('list');
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [category, setCategory] = useState('');
  const [tagList, setTagList] = useState(['리액트', '뷰']);
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      setComp(state.comp);
      setCategory(state.category);
      setSelectedIdx(state.idx);
    }
  }, [state]);

  const setPostDetail = useCallback(
    (newComp, newCategory, newIdx) => {
      setComp(newComp);
      setCategory(newCategory);
      setSelectedIdx(newIdx);
    },
    [comp, category, selectedIdx]
  );

  return (
    <>
      <PostSection>
        {comp === 'list' && (
          <Carousel
            setComp={setComp}
            setSelectedIdx={setSelectedIdx}
            tagList={tagList}
          />
        )}
        {comp === 'detail' && (
          <PostDetail setComp={setComp} selectedIdx={selectedIdx} />
        )}
        {comp === 'tag' && <EditTag setComp={setComp} />}
      </PostSection>
    </>
  );
};

export default Main;

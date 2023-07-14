import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PostSection from '../Components/UI/postSection';
import Carousel from '../Components/Post/carousel';
import PostDetail from '../Components/Post/postDetail';
import EditTag from '../Components/Tag/editTag';

const Main = () => {
  const [comp, setComp] = useState('list');
  const [selectedId, setSelectedId] = useState('');
  const [tagList, setTagList] = useState(['리액트', '뷰']);
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      setComp(state.comp);
      if (state.id) setSelectedId(state.id);
    }
  }, [state]);

  return (
    <>
      <PostSection>
        {comp === 'list' && (
          <Carousel
            setComp={setComp}
            setSelectedId={setSelectedId}
            tagList={tagList}
          />
        )}
        {comp === 'detail' && (
          <PostDetail
            setComp={setComp}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        )}
        {comp === 'tag' && <EditTag setComp={setComp} />}
      </PostSection>
    </>
  );
};

export default Main;

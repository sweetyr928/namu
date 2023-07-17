import { useState } from 'react';
import PostSection from '../Components/UI/postSection';
import Carousel from '../Components/Post/carousel';

const Main = () => {
  const [tagList, setTagList] = useState(['리액트', '뷰']);

  return (
    <PostSection>
      <Carousel tagList={tagList} />
    </PostSection>
  );
};

export default Main;

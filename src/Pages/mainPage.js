import { useQuery } from 'react-query';
import { getUserTag } from '../Components/API/Tag/fetchTag';

import PostSection from '../Components/UI/postSection';
import Carousel from '../Components/Post/carousel';
import { GreenLoading } from '../Components/UI/loading';

const MainPage = ({ uid }) => {
  const { data: tagList, isLoading } = useQuery(
    ['userData', uid],
    () => getUserTag(uid),
    {
      enabled: !!uid
    }
  );

  return (
    <PostSection>
      {isLoading && <GreenLoading />}
      {!isLoading && tagList && <Carousel tagList={tagList} uid={uid} />}
    </PostSection>
  );
};

export default MainPage;

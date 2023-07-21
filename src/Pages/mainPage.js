import { useQuery } from 'react-query';
import { getUserTags } from '../Components/API/Tag/fetchTag';
import PostSection from '../Components/UI/postSection';
import Carousel from '../Components/Post/carousel';
import { GreenLoading } from '../Components/UI/loading';

const MainPage = ({ uid }) => {
  const { data: tagList, isLoading } = useQuery(
    ['userData', uid],
    () => getUserTags(uid),
    {
      enabled: !!uid
    }
  );

  return (
    <PostSection>
      {isLoading && <GreenLoading />}
      {!isLoading && tagList && <Carousel tagList={tagList} />}
    </PostSection>
  );
};

export default MainPage;

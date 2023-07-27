import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { getUserTags } from '../Components/API/Tag/fetchTag';
import { userData } from '../Recoil/atoms';
import PostSection from '../Components/UI/postSection';
import Carousel from '../Components/Post/carousel';
import { SkeletonCarousel } from '../Components/UI/skeletonCarousel';

const MainPage = () => {
  const currentUserData = useRecoilValue(userData);

  const { data: tagList, isLoading } = useQuery(
    ['userData', currentUserData.uuid],
    () => getUserTags(currentUserData.uuid),
    {
      enabled: !!currentUserData.uuid
    }
  );

  return (
    <PostSection>
      {isLoading && <SkeletonCarousel />}
      {!isLoading && tagList && <Carousel tagList={tagList} />}
    </PostSection>
  );
};

export default MainPage;

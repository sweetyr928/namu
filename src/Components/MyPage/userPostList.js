import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';
import { WhiteLoading } from '../UI/loading';
import { userData } from '../../Recoil/atoms';
import { getPostById } from '../API/Post/fetchPost';

const UserPostContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  border-radius: 0px 0px 30px 30px;
  background-color: #c7d36f;
  padding: 10px;
  section {
    width: 90%;
    background-color: #ffffff;
    margin: 10px;
    padding: 18px;
    border-radius: 30px;
  }
`;

const UserPostList = () => {
  const currentUserData = useRecoilValue(userData);
  const posts = currentUserData.userPosts;

  const { data: userPostsData, isLoading } = useQuery(
    'userPostsData',
    async () => {
      const postPromises = posts.map((id) => getPostById(id));
      const postList = await Promise.all(postPromises);
      return postList;
    }
  );

  return (
    <UserPostContainer>
      {isLoading ? (
        <WhiteLoading />
      ) : (
        <>
          {userPostsData.map((data, idx) => (
            <section key={idx}>
              <div>{data.title}</div>
              <div>
                {data.content.length > 30
                  ? `${data.content.slice(0, 30)}…`
                  : data.content}
              </div>
              <div>
                {' '}
                {`${new Date(
                  data.createdAt.seconds * 1000
                ).getHours()}:${new Date(
                  data.createdAt.seconds * 1000
                ).getMinutes()}`}
              </div>
            </section>
          ))}
        </>
      )}
    </UserPostContainer>
  );
};

export default UserPostList;

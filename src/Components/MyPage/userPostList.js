import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
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
    padding: 20px;
    border-radius: 30px;
    cursor: pointer;
  }
  .title {
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 20px;
  }
  .time {
    text-align: right;
    font-size: 15px;
  }
`;

const UserPostList = () => {
  const currentUserData = useRecoilValue(userData);
  const posts = currentUserData.userPosts;

  const navigate = useNavigate();

  const options = {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };

  const stripHTMLTags = useCallback((html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;

    return tmp.textContent || tmp.innerText || '';
  }, []);

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
      ) : Array.isArray(userPostsData) ? (
        <>
          {userPostsData.map((data, idx) => (
            <section
              key={idx}
              onClick={() => {
                navigate(`/posts/${data.postId}`);
              }}
            >
              <div className="title">{data.title}</div>
              <div>
                {stripHTMLTags(data.content.replace(/\n/g, '')).length > 30
                  ? `${stripHTMLTags(data.content.replace(/\n/g, '')).slice(
                      0,
                      30
                    )}…`
                  : stripHTMLTags(data.content.replace(/\n/g, ''))}
              </div>
              <div className="time">
                {new Date(data.createdAt.seconds * 1000).toLocaleString(
                  'ko-KR',
                  options
                )}
              </div>
            </section>
          ))}
        </>
      ) : null}
    </UserPostContainer>
  );
};

export default UserPostList;

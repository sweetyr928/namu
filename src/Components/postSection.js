import styled from 'styled-components';

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: calc(60% - 10px);
  height: calc(85%);
  background-color: #ffffff;
  margin: 0px 40px 50px 0px;
`;

const PostSection = () => <PostContainer></PostContainer>;

export default PostSection;

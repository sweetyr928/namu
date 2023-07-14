import styled from 'styled-components';

const UserPostContainer = styled.section`
display: flex;
width: 100%;
height: 100%;
justify-content: center;
align-items: center;
border-radius: 0px 0px 30px 30px;
background-color: #C7D36F;
`

const UserPostList = () => <UserPostContainer>나의 질문들</UserPostContainer>;

export default UserPostList;

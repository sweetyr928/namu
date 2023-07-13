import styled from 'styled-components';

const UserRequestContainer = styled.section`
display: flex;
width: 100%;
height: 100%;
justify-content: center;
align-items: center;
border-radius: 0px 0px 30px 30px;
background-color: #C7D36F;
`

const UserRequestList = () => <UserRequestContainer>나의 요청들</UserRequestContainer>;

export default UserRequestList;

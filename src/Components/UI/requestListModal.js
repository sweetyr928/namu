import styled from 'styled-components';
import Modal from './modal';

const TimeSection = styled.section``;
const ContentSection = styled.section``;

const RequestListModal = () => (
  <Modal>
    <TimeSection>나무의 시간 : 30분</TimeSection>
    <ContentSection>나무의 한마디 : 도와드리겠습니다!</ContentSection>
  </Modal>
);

export default RequestListModal;

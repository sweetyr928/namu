import styled from 'styled-components';
import Modal from './modal';

const TimeSection = styled.section``;
const ContentSection = styled.section``;

const RequestListModal = ({ requestDetail }) => (
  <Modal>
    <TimeSection>나무의 시간 : {requestDetail.selectedTime}</TimeSection>
    <ContentSection>나무의 한마디 : {requestDetail.message}</ContentSection>
  </Modal>
);

export default RequestListModal;

import React from 'react';
import styled from 'styled-components';

const ModalContent = styled.article`
  width: 40vw;
  height: 43vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fcf9c6;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 15px 20px 15px;
  border-radius: 20px;
  z-index: 1;
`;

const Modal = (props) => <ModalContent>{props.children}</ModalContent>;

export default Modal;

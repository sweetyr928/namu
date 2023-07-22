import { atom } from 'recoil';

export const userData = atom({
  key: 'userData',
  default: {}
});

export const isLoginState = atom({
  key: 'isLoginState',
  default: false
});

export const isStarted = atom({
  key: 'isStarted',
  default: false
});

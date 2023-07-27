import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'recoil-session',
  storage: sessionStorage
});

export const userData = atom({
  key: 'userData',
  default: {},
  effects_UNSTABLE: [persistAtom]
});

export const roomsData = atom({
  key: 'chatroomData',
  default: {},
  effects_UNSTABLE: [persistAtom]
});

export const isLoginState = atom({
  key: 'isLoginState',
  default: false
});

export const isStarted = atom({
  key: 'isStarted',
  default: false
});

export const currentBadge = atom({
  key: 'currentBadge',
  default: ''
});

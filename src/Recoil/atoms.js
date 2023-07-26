import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

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

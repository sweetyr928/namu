import { setDoc } from 'firebase/firestore';
import {
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence
} from 'firebase/auth';
import { auth } from '../../../firebase';

export const addUser = async (ref, data) => {
  try {
    await setDoc(
      ref,
      {
        uuid: data.uid,
        name: data.displayName,
        email: data.email,
        userPosts: [],
        userTags: [],
        userRequests: [],
        userChatrooms: [],
        receivedRequests: [],
        userBadges: ['나무 심기'],
        currentBadge: '나무 심기',
        userLevel: 1,
        userPoint: 0
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
};

export const handleGoogleLogin = () => {
  const provider = new GoogleAuthProvider();

  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      signInWithPopup(auth, provider)
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

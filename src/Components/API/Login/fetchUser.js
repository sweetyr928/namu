import { setDoc, doc, getDoc, onSnapshot } from 'firebase/firestore';
import {
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence
} from 'firebase/auth';
import { db, auth } from '../../../firebase';

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

export const getUserData = async (userId) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      return userData;
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (e) {
    console.error('Error fetching user data:', e);
    throw new Error('Failed to fetch user data');
  }
};

export const getUserBadges = async (uid) => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      const { userBadges } = userData;

      return userBadges;
    } else {
      console.log('No such document!');
    }
  } catch (e) {
    console.error('Error fetching user badges:', e);
    throw e;
  }
};

export const getCurrentBadge = async (uid) => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      const { currentBadge } = userData;

      return currentBadge;
    } else {
      console.log('No such document!');
    }
  } catch (e) {
    console.error('Error fetching current user badges:', e);
    throw e;
  }
};

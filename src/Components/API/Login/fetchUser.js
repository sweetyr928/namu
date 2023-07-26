import { setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
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

export const updateUserCurrentBadge = async (uid, badge) => {
  try {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      currentBadge: badge
    });

    return true;
  } catch (e) {
    console.error('Error updating user tags: ', e);
    throw e;
  }
};

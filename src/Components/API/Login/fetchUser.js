import { setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import {
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence
} from 'firebase/auth';
import { db, auth } from '../../../firebase';

export const badges = [
  { title: '나무 심기', description: '나무 첫 걸음' },
  { title: '첫 번째 나무', description: '첫 번째 질문 글 작성 ' },
  { title: '친절의 씨앗', description: '첫 번째 나무 요청' },
  {
    title: '나눔의 즐거움',
    description: '5번 이상 나무 요청 & 매칭 성공 기록 3회 이상'
  },
  {
    title: '성장의 열정',
    description: '5번 이상 질문 글 작성 & 매칭 성공 기록 3회 이상'
  },
  {
    title: '배움의 매력',
    description: '15번 이상 질문 글 작성 & 매칭 성공 기록 10회 이상'
  },
  {
    title: '품앗이 대장',
    description: '나무 평가 평점 6.5점 이상 & 매칭 성공 기록 15회 이상'
  },
  {
    title: '나는야 고수',
    description: '나무 평가 평점 8.5점 이상 & 매칭 성공 기록 25회 이상'
  },
  {
    title: '미니 수목원',
    description: '25번 이상 질문 글 작성 & 매칭 성공 기록 20회 이상'
  }
];

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

export const updateUserBadges = async (uid, newBadges) => {
  try {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      userBadges: newBadges
    });

    return true;
  } catch (e) {
    console.error('Error updating user tags: ', e);
    throw e;
  }
};

export const updateUserCurrentBadge = async (uid, newBadge) => {
  try {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      currentBadge: newBadge
    });

    return true;
  } catch (e) {
    console.error('Error updating user tags: ', e);
    throw e;
  }
};

export const updateUserLevel = async (uid, newLevel) => {
  try {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      userLevel: newLevel
    });

    return true;
  } catch (e) {
    console.error('Error updating user tags: ', e);
    throw e;
  }
};

import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs
} from 'firebase/firestore';
import { db } from '../../../firebase';

export const getUserTags = async (uid) => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      const { userTags } = userData;

      return userTags;
    } else {
      console.log('No such document!');
    }
  } catch (e) {
    console.error('Error fetching user tags:', e);
    throw e;
  }
};

export const updateUserTags = async (uid, updatedTags) => {
  try {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      userTags: updatedTags
    });

    return true;
  } catch (e) {
    console.error('Error updating user tags: ', e);
    throw e;
  }
};

export const getSearchedTags = async (text) => {
  const tagsRef = collection(db, 'tags');

  try {
    const querySnapshot = await getDocs(tagsRef);

    const results = querySnapshot.docs
      .filter((doc) => doc.id.includes(text))
      .map((doc) => {
        const tagData = doc.data();
        const postCount = Object.keys(tagData).length || 0;
        return {
          id: doc.id,
          postCount
        };
      });

    return results;
  } catch (error) {
    console.error('Error searching tags: ', error);
    throw error;
  }
};

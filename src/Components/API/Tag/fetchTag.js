import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

export const getUserTag = async (id) => {
  try {
    const docRef = doc(db, 'users', id);
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
    throw new Error('Failed to fetch user tags');
  }
};

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

export const createRequest = async (docId, requestData) => {
  try {
    const docRef = doc(db, 'requests', docId);
    await setDoc(docRef, requestData);

    return docId;
  } catch (e) {
    console.error('Error adding request: ', e);
    throw e;
  }
};

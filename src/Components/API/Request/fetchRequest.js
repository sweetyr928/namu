import { doc, setDoc, updateDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';

export const createRequest = async (
  docId,
  helperId,
  requesterId,
  requestData
) => {
  try {
    const docRef = doc(db, 'requests', docId);
    await setDoc(docRef, requestData);

    const helperDocRef = doc(db, 'users', helperId);
    const helperDoc = await getDoc(helperDocRef);
    if (helperDoc.exists()) {
      const userData = helperDoc.data();
      const { userRequests } = userData;

      const updatedUserRequests = userRequests.length
        ? [...userRequests, docId]
        : [docId];

      await updateDoc(helperDocRef, { userRequests: updatedUserRequests });
    }

    const requesterDocRef = doc(db, 'users', requesterId);
    const requesterDoc = await getDoc(requesterDocRef);
    if (requesterDoc.exists()) {
      const userData = requesterDoc.data();
      const { receivedRequests } = userData;

      const updatedReceivedRequests = receivedRequests.length
        ? [...receivedRequests, docId]
        : [docId];

      await updateDoc(requesterDocRef, {
        receivedRequests: updatedReceivedRequests
      });
    }

    return docId;
  } catch (e) {
    console.error('Error adding request: ', e);
    throw e;
  }
};

export const getRequestById = (id) => {
  const docRef = doc(db, 'requests', id);

  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const requestData = docSnap.data();
        resolve(requestData);
      } else {
        reject(new Error('No such document!'));
      }
    });

    return () => unsubscribe();
  });
};

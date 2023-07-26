import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../../../firebase';

export const createChat = async (
  userId,
  helperId,
  helperLevel,
  postId,
  title
) => {
  const id = `${userId}${helperId}${postId}`;
  const docRef = doc(db, 'chatrooms', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    await setDoc(
      docRef,
      {
        chats: [],
        lastChat: '',
        title,
        helperId,
        helperLevel,
        lastCreatedAt: serverTimestamp()
      },
      { merge: true }
    );
    await updateDoc(doc(db, 'users', `${userId}`), {
      userChatrooms: arrayUnion(id)
    });
    await updateDoc(doc(db, 'users', `${helperId}`), {
      userChatrooms: arrayUnion(id)
    });
  }
};

export const getChatroomById = async (id) => {
  try {
    const docRef = doc(db, 'chatrooms', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const chatroomData = docSnap.data();
      return chatroomData;
    } else {
      console.log('No such document!');
    }
  } catch (e) {
    console.error('Error fetching chatroom data:', e);
    throw new Error('Failed to fetch chatroom data');
  }
};

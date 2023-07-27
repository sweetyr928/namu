import {
  doc,
  setDoc,
  addDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  increment,
  collection
} from 'firebase/firestore';
import { db } from '../../../firebase';

export const createChatRoom = async (
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
        chatId: id,
        chats: [],
        lastChat: '',
        postId,
        title,
        helperId,
        helperLevel,
        isChecked: false,
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

export const givePoint = async (chatId, helperId, point, checked) => {
  try {
    if (checked) {
      await updateDoc(doc(db, 'chatrooms', chatId), {
        isChecked: true
      });
    }
    await updateDoc(doc(db, 'users', `${helperId}`), {
      userPoint: increment(point)
    });
  } catch (e) {
    console.error('Error fetching chatroom data:', e);
    throw new Error('Failed to fetch chatroom data');
  }
};

export const handleSendChat = async (content, user, chatroom) => {
  if (content.trim() !== '') {
    const docRef = await addDoc(collection(db, 'chats'), {
      content,
      createdAt: serverTimestamp(),
      user
    });
    await updateDoc(doc(db, 'chatrooms', chatroom), {
      chats: arrayUnion(docRef.id),
      lastChat: content,
      lastCreatedAt: serverTimestamp()
    });
  }
};

export const getChatById = async (id) => {
  try {
    const docRef = doc(db, 'chats', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const chatData = docSnap.data();
      return chatData;
    } else {
      console.log('No such document!');
    }
  } catch (e) {
    console.error('Error fetching chat data:', e);
    throw new Error('Failed to fetch chat data');
  }
};

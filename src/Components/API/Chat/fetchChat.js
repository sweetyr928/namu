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
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../../firebase';

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
  if (!id) {
    return null;
  }

  try {
    const docRef = doc(db, 'chatrooms', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const chatroomData = docSnap.data();
      return chatroomData;
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (e) {
    console.error('Error fetching chatroom data:', e);
    throw new Error('Failed to fetch chatroom data');
  }
};

export const givePoint = async (chatId, postId, helperId, point, checked) => {
  try {
    if (checked) {
      await updateDoc(doc(db, 'chatrooms', chatId), {
        isChecked: true
      });
      await updateDoc(doc(db, 'posts', `${postId}`), {
        isSolved: true
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

export const handleSendChat = async (user, chatroom, content, img) => {
  if (content.trim() === '') {
    return;
  }

  try {
    if (img) {
      const storageRef = ref(storage, `chats/images/${img.name}`);
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is${progress}% done`);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const docRef = await addDoc(collection(db, 'chats'), {
              content,
              createdAt: serverTimestamp(),
              user,
              photoURL: downloadURL
            });
            await updateDoc(doc(db, 'chatrooms', chatroom), {
              chats: arrayUnion(docRef.id),
              lastChat: content,
              lastCreatedAt: serverTimestamp()
            });
          });
        }
      );
    } else {
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
  } catch (error) {
    console.error(`에러가 발생했습니다! : ${error}`);
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

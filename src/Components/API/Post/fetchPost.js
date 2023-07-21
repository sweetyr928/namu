import {
  collection,
  addDoc,
  doc,
  getDoc,
  writeBatch,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  getDocs,
  onSnapshot,
  where,
  runTransaction
} from 'firebase/firestore';
import { db } from '../../../firebase';

export const createPost = async (uid, postData) => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      author: postData.author,
      title: postData.title,
      content: postData.content,
      tags: postData.tags,
      isSolved: postData.isSolved,
      createdAt: postData.createdAt
    });
    const newPostId = docRef.id;

    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const { userPosts } = userData;

      const updatedUserPosts = userPosts
        ? [...userPosts, newPostId]
        : [newPostId];

      await updateDoc(userDocRef, { userPosts: updatedUserPosts });
    }

    const tagsRef = collection(db, 'tags');
    const batch = writeBatch(db);

    for (const tag of postData.tags) {
      const tagDocRef = doc(tagsRef, tag);
      const tagDoc = await getDoc(tagDocRef);

      if (tagDoc.exists()) {
        batch.update(tagDocRef, { [docRef.id]: true });
      } else {
        const initialTagData = {
          [docRef.id]: true
        };
        batch.set(tagDocRef, initialTagData);
      }
    }

    await batch.commit();

    return newPostId;
  } catch (e) {
    console.error('error adding document: ', e);
    throw e;
  }
};

export const getPost = async (pid) => {
  try {
    const docRef = doc(db, 'posts', pid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const postData = docSnap.data();
      return postData;
    } else {
      console.log('No such document!');
    }
  } catch (e) {
    console.error('error fetching post data: ', e);
    throw e;
  }
};

export const getPostsByTags = async (selectedTagIdx, carouselData, tagList) => {
  try {
    const updatedCarouselData = carouselData
      ? JSON.parse(JSON.stringify(carouselData))
      : {};

    const tagRef = doc(db, 'tags', tagList[selectedTagIdx]);
    const tagSnapshot = await getDoc(tagRef);

    if (tagSnapshot.exists()) {
      const q = query(
        collection(db, 'posts'),
        where('tags', 'array-contains', tagList[selectedTagIdx]),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await new Promise((resolve) => {
        const unsubscribe = onSnapshot(q, (snapshot) => {
          resolve(snapshot);
        });
      });

      const tagPosts = [];
      snapshot.forEach((d) => {
        const postData = d.data();
        tagPosts.push({ id: d.id, ...postData });
      });

      updatedCarouselData[tagList[selectedTagIdx]] = tagPosts;
    }

    return updatedCarouselData;
  } catch (e) {
    console.error('Error fetching posts by tags: ', e);
    return carouselData;
  }
};

export const updatePost = async (postData) => {
  try {
    const postRef = doc(db, 'posts', postData.id);

    const updatedData = {
      title: postData.title,
      content: postData.content,
      tags: postData.tagList
    };

    await updateDoc(postRef, updatedData);

    return true;
  } catch (e) {
    console.error('Error updating post:', e);
    throw e;
  }
};

export const deletePost = async (uid, pid) => {
  try {
    const postRef = doc(db, 'posts', pid);
    const postDoc = await getDoc(postRef);

    if (!postDoc.exists()) {
      console.error('Post document not found.');
      return;
    }

    const postData = postDoc.data();
    const tagsRef = collection(db, 'tags');

    await runTransaction(db, async (transaction) => {
      for (const tag of postData.tags) {
        const tagRef = doc(tagsRef, tag);
        const tagDoc = await transaction.get(tagRef);
        if (tagDoc.exists()) {
          const tagData = tagDoc.data();
          delete tagData[pid];

          transaction.set(tagRef, tagData);

          if (Object.keys(tagData).length === 0) {
            transaction.delete(tagRef);
          }
        }
      }
    });

    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const { userPosts } = userData;

      if (userPosts && userPosts.includes(pid)) {
        const updatedUserPosts = userPosts.filter((postId) => postId !== pid);
        await updateDoc(userDocRef, { userPosts: updatedUserPosts });
      }
    }

    await deleteDoc(postRef);
  } catch (e) {
    console.error('Error deleting post: ', e);
    throw e;
  }
};

export const searchPosts = async (keyword) => {
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, orderBy('createdAt', 'desc'));

  const stripHTMLTags = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;

    const textContent = tmp.textContent || tmp.innerText || '';
    return textContent.trim() !== '' ? textContent : '';
  };

  try {
    const querySnapshot = await getDocs(q);
    const results = [];

    querySnapshot.forEach((doc) => {
      const post = doc.data();
      const sanitizedContent = stripHTMLTags(post.content);

      if (
        post.title.indexOf(keyword) !== -1 ||
        (sanitizedContent && sanitizedContent.indexOf(keyword) !== -1)
      ) {
        results.push({ id: doc.id, ...post });
      }
    });

    return results;
  } catch (e) {
    console.error('Error searching posts: ', e);
    throw e;
  }
};

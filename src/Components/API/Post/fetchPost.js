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
  where
} from 'firebase/firestore';
import { db } from '../../../firebase';

export const createPost = async (postData) => {
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
  }
};

export const getPost = async (id) => {
  try {
    const docRef = doc(db, 'posts', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const postData = docSnap.data();
      return postData;
    } else {
      console.log('No such document!');
    }
  } catch (e) {
    console.error('error fetching post data: ', e);
  }
};

export const getPostsByTags = async (selectedTagIdx, carouselData, tagList) => {
  try {
    const updatedCarouselData = JSON.parse(JSON.stringify(carouselData));

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

export const updatePost = async (id, title, content, tagList) => {
  try {
    const postRef = doc(db, 'posts', id);

    const updatedData = {
      title,
      content,
      tags: tagList
    };

    await updateDoc(postRef, updatedData);

    return true;
  } catch (e) {
    console.error('Error updating post:', e);
  }
};

export const deletePost = async (id) => {
  try {
    deleteDoc(doc(db, 'posts', id));

    return true;
  } catch (e) {
    console.error('error deleting post data: ', e);
  }
};

export const searchPosts = async (text) => {
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
        post.title.indexOf(text) !== -1 ||
        (sanitizedContent && sanitizedContent.indexOf(text) !== -1)
      ) {
        results.push({ id: doc.id, ...post });
      }
    });

    return results;
  } catch (e) {
    console.error('Error searching posts: ', e);
  }
};

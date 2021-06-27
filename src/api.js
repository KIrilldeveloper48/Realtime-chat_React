import firebase from 'firebase/app';


export const submitMessage = async ({uid, displayName, photoURL}, message, messageId, store) => {
  store.collection(`messages`).add({
    userId: uid,
    userName: displayName,
    userAvatar: photoURL,
    userMessage: message,
    messageId,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
};

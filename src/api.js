import firebase from 'firebase/app';

/**
 * Ассинхронная функция для добавления сообщения в коллекцию на сервере
 * @function
 * @async
 * @param {Object} userData Данные пользователя в формате объекта
 * @param {string} userData.uid id пользователя
 * @param {string} userData.displayName Имя пользователя
 * @param {string} userData.photoURL Ссылка на аватар пользователя
 * @param {string} message Текст сообщения
 * @param {string} messageId Уникальный id сообщения
 * @param {Object} store Хранилище с данными (firestore)
 * @return {Promise}
 */

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

/**
 * Ассинхронная функция для авторизации через Google
 * @function
 * @async
 * @param {Object} auth Объект из которого нужен метод signInWithPopup для авторизации
 * @return {Promise}
 */

export const authorization = async (auth) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  // eslint-disable-next-line no-unused-vars
  const {user} = await auth.signInWithPopup(provider);
};

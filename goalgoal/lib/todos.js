import firestore from '@react-native-firebase/firestore';

export const todosCollection = firestore().collection('todos');

export function createTodo({user, todos}) {
  return todosCollection.add({
    user,
    todos,
    date: new Date().toISOString
  });
}

export async function getTodos(userId) {
  let query = todosCollection.orderBy('createdAt', 'desc').limit(PAGE_SIZE)
  if (userId) {
      query = query.where('user.id', '==', userId);
  }
  const snapshot = await query.get();

  const todos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
  }));
  return todos;
}

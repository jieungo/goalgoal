import firestore from '@react-native-firebase/firestore';

export const todosCollection = firestore().collection('todos');

export function createTodo({todos}) {
  return usersCollection.add({
    todos,
  });
}

export async function getTodos() {
  const doc = await todosCollection.get();
  return doc.data();
}

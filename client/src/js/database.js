import { openDB } from 'idb';
import { v4 as uuidv4 } from 'uuid';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const id = uuidv4(); // Generate a unique key
  console.log('PUT to the database');
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id, content }); // Store the content with the generated key
  const result = await request;
  console.log('Data saved to database',result, content); // Log only the content
  await tx.done;
}

export const getDb = async () => {
  console.log('GET from the database');
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('🚀 - data retrieved from the database', result);
}

initdb();

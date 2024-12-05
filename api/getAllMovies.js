import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Firestore 초기화 파일 import

export const getAllMovies = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'movies'));
    const moviesList = snapshot.docs.map((doc) => ({
      id: doc.id, // 문서 ID 포함
      ...doc.data(), // 문서 데이터 포함
    }));
    return moviesList; // 데이터를 반환
  } catch (error) {
    console.error('Error fetching movies:', error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};

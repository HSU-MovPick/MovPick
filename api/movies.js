import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase'; // Firestore 초기화 파일 import

// 모든 영화 검색
export const getAllMovies = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'movies'));
    const moviesList = snapshot.docs.map((doc) => ({
      id: doc.id, // 문서 ID 포함
      ...doc.data(), // 문서 데이터 포함
    }));
    return moviesList; // 데이터를 반환
    //error 
  } catch (error) {
    console.error('Error fetching movies:', error);
    return []; // 에러 발생 시 -> 빈 배열 반환
  }
};

// 제목으로 영화 검색
export const getMoviesByTitle = async (title) => {
  try {
    const q = query(collection(db, 'movies'), where('title', '==', title));
    const snapshot = await getDocs(q);

    const moviesList = snapshot.docs.map((doc) => ({
      id: doc.id, // 문서 ID 포함
      ...doc.data(), // 문서 데이터 포함
    }));

    return moviesList; // 결과 반환
  } catch (error) {
    console.error('Error fetching movies by title:', error);
    throw error; // 에러를 호출한 곳으로 전달
  }
};

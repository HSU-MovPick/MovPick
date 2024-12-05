import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase'; // Firestore 초기화 파일 import

export const getMoviesByTitle = async (title) => {
  try {
    // Firestore 쿼리 생성
    const q = query(collection(db, 'movies'), where('title', '==', title)); //title 같으면 반환
    const snapshot = await getDocs(q);

    // 결과 매핑
    const moviesList = snapshot.docs.map((doc) => ({ // 리스트로
      id: doc.id, 
      ...doc.data(), // 문서 데이터 포함
    }));

    return moviesList; // 데이터를 반환
    // error
  } catch (error) {
    console.error('Error fetching movies by title:', error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};
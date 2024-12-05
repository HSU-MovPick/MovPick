import { collection, getDocs, query, where, writeBatch, doc} from 'firebase/firestore';
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


// 장르로 영화 검색 
export const getMoviesByGenre = async (genre) => {
  try {
    // genre가 비어있거나 유효하지 않으면 빈 배열 반환
    if (!genre || typeof genre !== 'string') {
      return []; // 빈 배열 반환
    }

    // Firestore 쿼리: 배열 내 문자열 포함 여부 확인
    const q = query(
      collection(db, 'movies'),
      where('genre', 'array-contains', genre) // 배열에 해당 문자열 포함 여부
    );
    const snapshot = await getDocs(q);

    const moviesList = snapshot.docs.map((doc) => ({
      id: doc.id, // 문서 ID 포함
      ...doc.data(), // 문서 데이터 포함
    }));

    return moviesList; // 결과 반환
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw error; // 에러를 호출한 곳으로 전달
  }
};


// DB에 데이터 추가 (json으로 받아서)
export const addMoviesToDB = async (moviesData) => {
  if (!Array.isArray(moviesData)) {
    console.error('Invalid data format: Expected an array of movies.');
    return;
  }

  const batch = writeBatch(db); // Firestore 배치 초기화

  try {
    moviesData.forEach((movie) => {
      const movieRef = doc(collection(db, 'movies')); // movies 컬렉션의 새 문서 참조
      batch.set(movieRef, movie); // 영화 데이터를 문서로 추가
    });

    await batch.commit(); // 모든 작업 커밋
    console.log('Movies added successfully!');
  } catch (error) {
    console.error('Error adding movies to Firestore:', error);
  }
};
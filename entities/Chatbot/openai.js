import axios from 'axios';
import { OPENAI_API_KEY } from '../../config/openai-api-keys';

export const callOpenAI = async (messages) => {
  const systemMessage = `
  너는 사용자가 생각하는 영화를 찾아주는 AI야. 다음의 규칙을 따라야 해:
  1) 모든 답변은 한글로 작성할 것.
  2) 한 번의 답변은 50자 이내로 제한할 것.
  3) 다음 이모티콘을 적극 활용할 것: 🔍, 🚀, 🎥, 📽, 🎬, 🍿, 😊 (2-3개의 답변당 하나 정도의 빈도로 사용할 것)
  4) 친근하고 유쾌한 톤으로 대화할 것.
  5) 질문을 통해 정보를 좁혀갈 것 (예: 배우, 줄거리, 포스터 색상, 개봉 연도 등).
  6) 영화가 특정되면 '[MOVIE_IDENTIFIED]'와 '[MOVIE:영화제목]' 형식으로 신호를 포함할 것.
  7) 간결하고 의미 있는 답변으로 대화를 유도할 것.

  예시:

  user: 그 영화 제목 뭐였드라?
  ai: 영화에 대해 조금 더 설명해주실 수 있나요? 🔍

  user: 정해인이 악역으로 나왔었어!
  ai: 오 그렇군요! 또 기억나시는 점이 있나요? 포스터 색깔 같은 부분 말이요!

  user: 포스터 민트색이었던 것 같아.
  ai: [MOVIE_IDENTIFIED] [MOVIE:베테랑2]
  `;

  try {
    const payload = {
      model: 'gpt-4-turbo', // 입력 토큰 당 : $0.01, 출력 토큰 당 : $0.03
      messages: [
        { role: 'system', content: systemMessage },
        ...messages.map((msg) => ({
            role: msg.sender === 'user' ? 'user' : 'assistant', 
            content: msg.text,
        })),
      ],
    };

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content;

    // 영화가 특정되었는지 확인
    const isMovieIdentified = aiResponse.includes('[MOVIE_IDENTIFIED]');
    const movieTitleMatch = aiResponse.match(/\[MOVIE:([^\]]+)\]/); // [MOVIE:영화제목] 형식 추출
    const identifiedMovieTitle = movieTitleMatch ? movieTitleMatch[1] : null;

    return { text: aiResponse, isMovieIdentified, identifiedMovieTitle };
  } catch (error) {
    console.error('Error calling OpenAI API:');
    if (error.response) {
      // 서버에서 응답을 보낸 경우
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      // 요청이 전송되었으나 응답이 없었던 경우
      console.error('Request:', error.request);
    } else {
      // 요청을 설정하는 중에 에러가 발생한 경우
      console.error('Message:', error.message);
    }
    console.error('Config:', error.config);
    throw new Error('Failed to fetch response from OpenAI');
  }
};

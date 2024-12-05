import React, { useState } from 'react';
import styled from 'styled-components/native';
import Background from '../shared/components/StandardBackground';
import { Alert, Linking, ActivityIndicator, Image } from 'react-native';
import FooterNavigationBar from '../shared/components/FooterNavigationBar';
import RecommendMainButton from '../entities/RecommendMain/ui/RecommendMainButton';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { GOOGLE_CLOUD_API_KEY } from '../config/google-cloud-api-key';
import { useNavigation } from '@react-navigation/native';

export default function EmotionRecommendPic() {
  const navigation=useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emotionResult, setEmotionResult] = useState('');
  const defaultImageUri = require('../assets/facetest2.jpeg'); // 기본 이미지 경로

  const requestPermissions = async () => {
    let permissionGranted = false;

    while (!permissionGranted) {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status === 'granted') {
        Alert.alert('권한이 허용되었습니다!');
        permissionGranted = true;
      } else if (status === 'denied') {
        Alert.alert(
          '권한이 필요합니다.',
          '앱에서 사진을 선택하려면 권한이 필요합니다.',
          [
            {
              text: '취소',
              onPress: () => {
                permissionGranted = true; // 반복 종료
              },
              style: 'cancel',
            },
            {
              text: '다시 시도',
              onPress: () => {}, // 아무 작업도 하지 않고 반복 계속
            },
          ]
        );
      } else if (status === 'blocked') {
        Alert.alert(
          '권한이 차단되었습니다.',
          '설정에서 권한을 활성화하세요.',
          [
            {
              text: '취소',
              onPress: () => {
                permissionGranted = true; // 반복 종료
              },
              style: 'cancel',
            },
            {
              text: '설정으로 이동',
              onPress: () => {
                Linking.openSettings();
                permissionGranted = true;
              },
            },
          ]
        );
      }
    }
  };

  const selectImage = async () => {
    await requestPermissions();

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      Alert.alert('이미지 선택이 취소되었습니다.');
    }
  };

  const analyzeEmotion = async () => {
    if (!selectedImage) {
      Alert.alert('이미지를 먼저 선택하세요.');
      return;
    }

    setLoading(true);
    setEmotionResult('');

    try {
      const base64Image = await convertToBase64(selectedImage);

      const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_CLOUD_API_KEY}`,
        {
          requests: [
            {
              image: { content: base64Image },
              features: [{ type: 'FACE_DETECTION', maxResults: 1 }],
            },
          ],
        }
      );

      const emotion = parseEmotion(response.data);
      setEmotionResult(emotion);
      navigation.navigate('EmotionRecommendResult', { emotion });
    } catch (error) {
      console.error(error);
      Alert.alert('오류 발생', '감정 분석 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const analyzeWithDefaultImage = async () => {
    setLoading(true);
    setEmotionResult('');
  
    try {
      const defaultImagePath = Image.resolveAssetSource(defaultImageUri).uri;
      const base64Image = await convertToBase64(defaultImagePath);
  
      // 요청 데이터 디버깅
      const requestData = {
        requests: [
          {
            image: { content: base64Image },
            features: [{ type: 'FACE_DETECTION', maxResults: 1 }],
          },
        ],
      };
      console.log('Request Data:', JSON.stringify(requestData, null, 2)); // 요청 데이터 출력
  
      const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_CLOUD_API_KEY}`,
        requestData
      );
  
      console.log('Response Data:', response.data); // 응답 데이터 출력
      const emotion = parseEmotion(response.data);
      setEmotionResult(emotion);
      navigation.navigate('EmotionRecommendResult', { emotion }); // 감정 데이터 전달
    } catch (error) {
      // 에러 디버깅
      console.error('Error Response:', error.response?.data || error.message);
      Alert.alert('오류 발생', '기본 이미지 분석 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };
  
  
  

  const convertToBase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const base64Data = reader.result.split(',')[1];
        console.log('Base64 Data Length:', base64Data.length); // Base64 데이터 길이 확인
        console.log('Base64 Data Sample:', base64Data.slice(0, 100)); // Base64 데이터 일부 출력
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  
  

  const parseEmotion = (data) => {
    const faceAnnotations = data.responses[0]?.faceAnnotations?.[0];
    if (faceAnnotations) {
      const emotions = [
        { type: '기쁨', value: faceAnnotations.joyLikelihood },
        { type: '슬픔', value: faceAnnotations.sorrowLikelihood },
        { type: '분노', value: faceAnnotations.angerLikelihood },
        { type: '놀람', value: faceAnnotations.surpriseLikelihood },
      ];
      return emotions
        .sort((a, b) => likelihoodToValue(b.value) - likelihoodToValue(a.value))[0]
        .type;
    }
    return '감정을 분석할 수 없습니다.';
  };

  const likelihoodToValue = (likelihood) => {
    const map = {
      VERY_UNLIKELY: 1,
      UNLIKELY: 2,
      POSSIBLE: 3,
      LIKELY: 4,
      VERY_LIKELY: 5,
    };
    return map[likelihood] || 0;
  };

  return (
    <>
      <Background>
        <RecommendMainLayout>
          <RecommnedFrame>
            <Intro>감정 기반 영화 추천을{'\n'}받아보세요</Intro>
            <EmoticonWrapper>
              {selectedImage && <Emoticon source={{ uri: selectedImage }} />}
              <RecommendMainButton text="사진 업로드" onPress={selectImage} />
            </EmoticonWrapper>
            <ButtonWrapper>
              <RecommendMainButton text="감정 분석하기" onPress={analyzeEmotion} />
              <RecommendMainButton text="기본 이미지로 테스트하기" onPress={analyzeWithDefaultImage} />
            </ButtonWrapper>
          </RecommnedFrame>
        </RecommendMainLayout>
      </Background>
      <FooterNavigationBar />
    </>
  );
}

const RecommendMainLayout = styled.View`
  padding: 80px 3px;
  gap: 60px;
`;

const RecommnedFrame = styled.View`
  gap: 5px;
`;

const EmoticonWrapper = styled.View`
  align-items: center;
  margin: 20px 0;
`;

const ButtonWrapper = styled.View`
  align-items: center;
  gap:30px;
`;

const Intro = styled.Text`
  font-size: 30px;
  color: #FFFFFF;
  font-weight: 900;
  text-align: left;
`;

const Emoticon = styled.Image`
  width: 250px;
  height: 250px;
  margin: 10px;
  border-radius: 10px;
`;

const EmotionResult = styled.Text`
  font-size: 20px;
  color: #FFFFFF;
  margin-top: 20px;
`;

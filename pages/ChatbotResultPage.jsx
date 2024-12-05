import React, { useState } from "react";
import styled from "styled-components/native";
import FooterNavigationBar from "../shared/components/FooterNavigationBar";
import StandardBackground from "../shared/components/StandardBackground";
import { useNavigation } from "@react-navigation/native";
import StandardMovieCard from "../shared/components/StandardMovieCard";
import ResultMessage from "../entities/Chatbot/ui/ResultMessage";
import { View, Modal, Text, TouchableOpacity } from "react-native";

export default function ChatbotResultPage({ route }) {
  const navigation = useNavigation();
  const { movie } = route.params; // 전달받은 영화 정보
  const [isModalVisible, setModalVisible] = useState(false); // 모달 상태

  // 모달 닫기 함수
  const closeModal = () => setModalVisible(false);

  // 모달에서 "다시 해보기" 클릭 시 동작
  const handleRetry = () => {
    closeModal();
    navigation.navigate("ChatbotChattingPage");
  };

  // 모달에서 "근처 영화관 가기" 클릭 시 동작
  const handleNearbyTheaters = () => {
    closeModal();
    navigation.navigate("MapPage");
  };

  return (
    <>
      <StandardBackground>
        <Container>
          {/* 결과 영화 카드 */}
          {movie ? (
            <StandardMovieCard
              key={movie.id}
              moviePoster={movie.poster}
              movieTitle={movie.title}
              movieCategory={movie.genre.join(" #")} // 배열을 문자열로 변환
              movieReleaseDate={movie.release_date}
            />
          ) : (
            <MessageText>영화 정보를 가져올 수 없습니다.</MessageText>
          )}
          {/* 결과 멘트 */}
          <ResultMessage UserName="해핑" MovieTitle="베테랑" />
          
          {/* 맞아요 & 아니에요 버튼 */}
          <ButtonContainer>
            <ActionButton onPress={() => setModalVisible(true)}>
              <ButtonText>맞아요!</ButtonText>
            </ActionButton>
            <ActionButton onPress={() => setModalVisible(true)}>
              <ButtonText>아니에요!</ButtonText>
            </ActionButton>
          </ButtonContainer>
        </Container>
      </StandardBackground>

      {/* 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal} // 안드로이드에서 뒤로 가기 버튼 누를 때
      >
        <ModalOverlay>
          <ModalContent>
            <ModalText>무엇을 하시겠습니까?</ModalText>
            <ModalButtonContainer>
              <ModalButton onPress={handleRetry}>
                <ModalButtonText>다시 해보기</ModalButtonText>
              </ModalButton>
              <ModalButton onPress={handleNearbyTheaters}>
                <ModalButtonText>근처 영화관 가기</ModalButtonText>
              </ModalButton>
            </ModalButtonContainer>
          </ModalContent>
        </ModalOverlay>
      </Modal>

      {/* 하단 네비게이션 바 */}
      <FooterNavigationBar />
    </>
  );
}

// 스타일링 정의
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const MessageText = styled.Text`
  font-size: 18px;
  color: gray;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
`;

const ActionButton = styled.TouchableOpacity`
  flex: 1;
  background-color: #a91d3a;
  margin: 5px;
  padding: 15px;
  border-radius: 30px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;

const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.View`
  width: 80%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
`;

const ModalText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
`;

const ModalButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const ModalButton = styled.TouchableOpacity`
  flex: 1;
  background-color: #a91d3a;
  padding: 15px;
  margin: 5px;
  border-radius: 10px;
  align-items: center;
`;

const ModalButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;

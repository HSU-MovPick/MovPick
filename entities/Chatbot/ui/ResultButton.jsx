import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import ChatbotActionModal from "./ChatbotActionModal"; // 모달 컴포넌트 가져오기
import { useNavigation } from "@react-navigation/native";

export default function ResultButton() {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  // 모달 닫기
  const closeModal = () => setModalVisible(false);

  // "다시 해보기" 버튼 동작
  const handleRetry = () => {
    closeModal();
    navigation.navigate("ChatbotChattingPage");
  };

  // "근처 영화관 가기" 버튼 동작
  const handleNearbyTheaters = () => {
    closeModal();
    navigation.navigate("MapPage");
  };

  return (
    <View style={styles.container}>
      {/* "맞아요" 버튼 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>맞아요!</Text>
      </TouchableOpacity>

      {/* "아니에요" 버튼 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>아니에요!</Text>
      </TouchableOpacity>

      {/* ChatbotActionModal 호출 */}
      <ChatbotActionModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onRetry={handleRetry}
        onNearbyTheaters={handleNearbyTheaters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    width:150,
    backgroundColor: "#A91D3A",
    marginHorizontal: 7,
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

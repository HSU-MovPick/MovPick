import React from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // X 아이콘 

export default function ChatbotActionModal({
  isVisible,
  onClose,
  onRetry,
  onNearbyTheaters,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
            {/* 우측 상단 닫기 버튼 */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={24} color="rgba(0, 0, 0, 0.4)" />
            </TouchableOpacity>

            {/* 모달 텍스트 */}
            <Text style={styles.modalText}>무엇을 하시겠습니까?</Text>
            <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={onRetry}>
              <Text style={styles.modalButtonText}>다시 해보기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={onNearbyTheaters}
            >
              <Text style={styles.modalButtonText}>근처 영화관 가기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    // backgroundColor: "rgba(0, 0, 0, 0.4)", //뒤에 어둡게
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    height:150,
    backgroundColor: "rgba(255, 255, 255, 0.7)", // 모달 본체 불투명도 40%
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent:"center",
    position: "relative", // 닫기 버튼 위치 조정을 위해 필요
  },
  modalText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    // backgroundColor: "#A91D3A",
    backgroundColor: "rgba(169, 29, 58, 0.8)",
    marginBlockStart:10,
    paddingVertical: 16,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

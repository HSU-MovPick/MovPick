import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MovPick2 from "../assets/MovPick2.png";
import Emoticon4 from "../assets/emoticon4.png";
import Emoticon5 from "../assets/emoticon5.png";
import Emoticon3 from "../assets/emoticon3.png";
import Background from "../shared/components/StandardBackground";
import { useNavigation } from "@react-navigation/native";
import FooterNavigationBar from "../shared/components/FooterNavigationBar";
import { ScrollView, Image, TouchableOpacity, ActivityIndicator, Linking } from "react-native";
import axios from "axios";
import { GOOGLE_CLOUD_API_KEY } from "../config/google-cloud-api-key";

const YOUTUBE_API_KEY = GOOGLE_CLOUD_API_KEY;
const MOVIE_TITLE = "영화 예고편";

export default function Main() {
  const navigation = useNavigation();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchYouTubeVideos();
  }, []);

  const fetchYouTubeVideos = async () => {
    try {
      const query = encodeURIComponent(`${MOVIE_TITLE} trailer`);
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&type=video&key=${YOUTUBE_API_KEY}`
      );
      setVideos(response.data.items);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
      setLoading(false);
    }
  };

  const renderVideoItem = (item) => (
    <TouchableOpacity
      key={item.id.videoId}
      style={{
        flexDirection: "row",
        marginBottom: 10,
        backgroundColor: "#C74659",
        padding: 10,
        borderRadius: 10,
        alignSelf: "center",
        width: "90%",
      }}
      onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${item.id.videoId}`)}
    >
      <Image
        source={{ uri: item.snippet.thumbnails.medium.url }}
        style={{ width: 120, height: 90, marginRight: 10, borderRadius: 5 }}
      />
      <VideoInfo>
        <VideoTitle numberOfLines={2}>{item.snippet.title}</VideoTitle>
        <VideoChannel>{item.snippet.channelTitle}</VideoChannel>
      </VideoInfo>
    </TouchableOpacity>
  );

  return (
    <>
      <Background>
        <MainWrapper>
        <MovPickImg2 source={MovPick2} />
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <MainLayout>
            <EmoticonImg1 source={Emoticon4} />
            <MainLayout2>
              <Text>궁금한 영화 제목이 있나요?</Text>
              <Text>'뭅에게 질문하기'를 사용해보세요!</Text>
              <Button onPress={() => navigation.navigate("ChatbotWelcomePage")}>
                <ButtonText>챗봇 페이지로 이동</ButtonText>
              </Button>
            </MainLayout2>
          </MainLayout>

          <MainLayout>
            <MainLayout2>
              <Text>어떤 영화를 볼 지 모르겠나요?</Text>
              <Text>뭅이 영화를 추천해드려요!</Text>
              <Button onPress={() => navigation.navigate("RecommendMain")}>
                <Text>영화 추천 받으러 가기</Text>
              </Button>
            </MainLayout2>
            <EmoticonImg2 source={Emoticon5} />
          </MainLayout>

          <MainLayout>
            <EmoticonImg3 source={Emoticon3} />
            <MainLayout2>
              <Text>근처 영화관 정보가 궁금하신가요?</Text>
              <Text>뭅에게 맡겨주세요~</Text>
              <Button onPress={() => navigation.navigate("MapPage")}>
                <Text>근처 영화관 보러 가기</Text>
              </Button>
            </MainLayout2>
          </MainLayout>

          <SectionTitle>최신 영화 예고편</SectionTitle>
          {loading ? (
            <ActivityIndicator size="large" color="#FFFFFF" />
          ) : (
            videos.map(renderVideoItem)
          )}
        </ScrollView>
        </MainWrapper>
      </Background>
      <FooterNavigationBar />
    </>
  );
}

const MainWrapper=styled.View`
padding : 0px 20px;
margin-top:15px;
align-items: center;
`;

const MovPickImg2 = styled.Image`
  width: 100px;
  height: 130px;
  padding-top: 35px;
  margin-bottom: 2px;
`;
const EmoticonImg1 = styled.Image`
  width: 121px;
  height: 121px;
  margin-bottom: 80px;
  margin-top: 15%;
`;
const EmoticonImg2 = styled.Image`
  width: 118px;
  height: 118px;
  margin-bottom: 80px;
  margin-top: 15%;
`;
const EmoticonImg3 = styled.Image`
  width: 118px;
  height: 118px;
  margin-bottom: 80px;
  margin-top: 20%;
`;
const Button = styled.TouchableOpacity`
  width: 182px;
  height: 47px;
  background-color: #a91d3a;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;
const MainLayout = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
const MainLayout2 = styled.View`
  justify-content: center;
`;
const Text = styled.Text`
  color: white;
  font-weight: 700;
`;
const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
`;
const SectionTitle = styled.Text`
  font-size: 18px;
  color: #ffffff;
  padding: 0px 20px;
  font-weight: 900;
  text-align: left;
  margin: 0px 0px 20px 10px;
`;
const VideoInfo = styled.View`
  flex: 1;
  justify-content: center;
`;
const VideoTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
`;
const VideoChannel = styled.Text`
  font-size: 14px;
  color: #ffffff;
`;

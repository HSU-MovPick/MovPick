import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import Background from '../shared/components/StandardBackground';
import { Image, FlatList, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import RecommendMainButton from '../entities/RecommendMain/ui/RecommendMainButton';
import { useNavigation, Linking } from '@react-navigation/native';
import FooterNavigationBar from '../shared/components/FooterNavigationBar';
import axios from 'axios';
import { GOOGLE_CLOUD_API_KEY } from '../config/google-cloud-api-key';
const YOUTUBE_API_KEY = GOOGLE_CLOUD_API_KEY;
const MOVIE_TITLE = "영화 예고편"; // 검색할 영화 제목

export default function VideoPage() {
  const navigation = useNavigation();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchYouTubeVideos();
  }, []);

  const fetchYouTubeVideos = async () => {
    try {
      const query = encodeURIComponent(`${MOVIE_TITLE} trailer`);
      console.log("API Key:", YOUTUBE_API_KEY);

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

  const renderVideoItem = ({ item }) => (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        marginBottom: 10,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
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
        {loading ? (
          <ActivityIndicator size="large" color="#FFFFFF" />
        ) : (
          <FlatList
            data={videos}
            renderItem={renderVideoItem}
            keyExtractor={(item) => item.id.videoId}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
            ListHeaderComponent={
              <>
                <Intro>최신 영화 예고편을 확인해보세요!</Intro>
              </>
            }
          />
        )}
      </Background>
      <FooterNavigationBar />
    </>
  );
}

const ButtonWrapper = styled.View`
  align-items: center;
  margin-top: 20px;
`;
const Intro = styled.Text`
  font-size: 20px;
  color: #FFFFFF;
  font-weight: 900;
  text-align: left;
  margin-bottom: 20px;
`;
const VideoInfo = styled.View`
  flex: 1;
  justify-content: center;
`;
const VideoTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;
const VideoChannel = styled.Text`
  font-size: 14px;
  color: gray;
`;

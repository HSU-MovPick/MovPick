import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Image, FlatList, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width; // 화면 너비 가져오기

export default function VideoList({ apiKey, query, onVideoPress }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchYouTubeVideos();
  }, [query]);

  const fetchYouTubeVideos = async () => {
    try {
      const encodedQuery = encodeURIComponent(query);
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${encodedQuery}&type=video&key=${apiKey}`
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
        backgroundColor: "#C74659",
        padding: 10,
        borderRadius: 10,
        width: screenWidth * 0.8,
        alignSelf: "center",
      }}
      onPress={() => onVideoPress(item.id.videoId)}
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
      {loading ? (
        <ActivityIndicator size="large" color="#FFFFFF" />
      ) : (
        <FlatList
          data={videos}
          renderItem={renderVideoItem}
          keyExtractor={(item) => item.id.videoId}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </>
  );
}

const VideoInfo = styled.View`
  flex: 1;
  justify-content: center;
`;
const VideoTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF;
`;
const VideoChannel = styled.Text`
  font-size: 14px;
  color: #FFFFFF;
`;

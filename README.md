# MovPick
![image](https://github.com/user-attachments/assets/aeaa3814-836f-49e8-8053-bb52b29b4bee)

## 👋 프로젝트에 오신 것을 환영합니다 👋

뭅픽은 단순한 영화 정보 제공을 넘어, 개인화된 응답을 제공하는 **감정 기반 영화 추천 시스템**입니다.


<p align="center">
    <img src="https://img.shields.io/github/stars/HSU-MovPick/MovPick?style=social" alt="GitHub stars">
    <img src="https://img.shields.io/github/license/HSU-MovPick/MovPick" alt="GitHub license">
</p>

---
## ✨ 주요 기능 ✨  

1. **유튜브 연결을 통한 추천 예고편 보기**  
   메인 페이지에서 최신 인기 영화의 예고편을 확인하고, 클릭 시 유튜브로 연결됩니다.

2. **감정/상황 기반 영화 추천**  
   사용자가 업로드한 얼굴 사진을 분석하여 기쁨, 놀람, 슬픔, 분노의 감정에 맞는 영화를 추천합니다.  
   Google Cloud Vision API를 사용하여 구현되었습니다.  
   또한 "누구와", "언제", "무슨 목적으로" 영화를 보는지를 입력하면 해당 상황에 적합한 영화를 추천합니다.  

3. **영화 검색 기능 및 정보 제공**  
   사용자가 카테고리별로 영화를 검색하고, 필터링을 통해 세부 정보를 확인할 수 있습니다.  
   Firebase 데이터베이스와 연동하여 구현되었습니다.  

4. **AI 챗봇을 통한 영화 찾기**  
   대화형 스무고개 방식의 챗봇을 통해 영화를 추론하고 정보를 제공합니다.  
   OpenAI API와 Firebase를 연동하여 구현되었습니다.  

5. **근처 영화관 찾기 및 상영 정보 제공**  
   사용자의 위치를 기반으로 가까운 영화관과 상영 중인 영화 정보를 제공합니다.  
   Google Maps API를 사용하여 구현되었습니다.
   
## 👥 팀원 소개 (Team Members) 👥  

<table align="center">
  <tr>
    <th>김정은</th>
    <th>김혜진</th>
    <th>임혜정</th>
    <th>한지운</th>
  </tr>
  <tr>
    <td><img src="https://github.com/jungeun-e.png" width="100"></td>
    <td><img src="https://github.com/khyaejin.png" width="100"></td>
    <td><img src="https://github.com/frombunny.png" width="100"></td>
    <td><img src="https://github.com/Hjwoon.png" width="100"></td>
  </tr>
  <tr>
    <td><a href="https://github.com/jungeun-e">@jungeun-e</a></td>
    <td><a href="https://github.com/khyaejin">@khyaejin</a></td>
    <td><a href="https://github.com/frombunny">@frombunny</a></td>
    <td><a href="https://github.com/Hjwoon">@Hjwoon</a></td>
  </tr>
</table>

## 🎨 역할 분담 🎨
![역할분담](https://github.com/user-attachments/assets/bdedd6b9-c021-44c9-9bc6-2547d5e6ffa2)


## 📽️ 데모 영상 📽️

[![Movpic Demo](https://img.youtube.com/vi/nCiwxNnZM9E/0.jpg)](https://youtu.be/nCiwxNnZM9E?si=LpiVlLBhLSf4Y1E2)

---

## 📚 기술 스택 📚

<p align="center">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">
    <img src="https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=React&logoColor=white">
    <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white">
</p>

- 💻 **React Native**  
   하나의 코드베이스로 iOS와 Android 앱을 모두 개발할 수 있는 강력한 크로스 플랫폼 프레임워크입니다.  
   핫 리로딩 기능과 풍부한 라이브러리를 제공하여 빠르고 효율적인 개발을 지원합니다.

- ☁️ **Firebase**  
   Google이 제공하는 클라우드 백엔드 플랫폼으로, 실시간 데이터베이스, 사용자 인증, 파일 저장소, 서버리스 컴퓨팅 등 다양한 서비스를 지원합니다.  
   React Native와의 연동이 쉬워 개발 생산성을 높이고, 안정적인 서비스를 제공합니다.

---

## 📂 프로젝트 구조 📂

- **📁 android**: 안드로이드 플랫폼 관련 파일
- **📁 ios**: iOS 플랫폼 관련 파일
- **📁 api**: Firebase 및 외부 API와의 상호작용을 위한 코드
- **📁 assets**: 이미지, 폰트 등 정적 자원
- **📁 components**: 재사용 가능한 React Native 컴포넌트
- **📁 config**: 환경 설정 파일
- **📁 data**: 앱에서 사용하는 데이터 구조 관리
- **📁 screens**: 화면 및 UI 구성 요소

---

## 🚀 시작하기 🚀

1. **레포지토리 클론하기:**  
   `git clone https://github.com/HSU-MovPick/MovPick.git`

2. **프로젝트 디렉토리로 이동:**  
   `cd MovPick`

3. **의존성 설치:**  
   `npm install`

4. **애플리케이션 실행:**  
   - **안드로이드 에뮬레이터:**  
     `npx react-native run-android`
   - **iOS 시뮬레이터:**  
     `npx react-native run-ios`


---

## ⭐ README 소개 ⭐

이 README는 MovPick 프로젝트의 주요 기능, 기술 스택, 설정 방법에 대한 간결한 개요를 제공합니다.  

✨ **Special Thanks** ✨  
Special thanks to the **P-ND team** for their continuous support! 🚀  
For more details, check out the [GitHub repository](https://github.com/PND-Gamjakkang).

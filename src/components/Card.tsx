import { useEffect } from "react";
import styled from "styled-components";
import { instance } from "../api";
import { VideoData } from "../pages/Home";
import { Link } from "react-router-dom";
import { nFormatter } from "../utils/nFormatter";
import { videoTime } from "../utils/videoTime";
import { displayedAt } from "../utils/displayedAt";

export interface MovieData {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: Item[];
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface Item {
  kind: string;
  etag: string;
  id: Id;
  snippet: Snippet;
}

export interface Id {
  kind: string;
  videoId: string;
}

export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

export interface Thumbnails {
  default: Default;
  medium: Medium;
  high: High;
}

export interface Default {
  url: string;
  width: number;
  height: number;
}

export interface Medium {
  url: string;
  width: number;
  height: number;
}

export interface High {
  url: string;
  width: number;
  height: number;
}

// 조회수, 게시일을 위한 상세 데이터
const dummyData = {
  kind: "youtube#videoListResponse",
  etag: "IHp-zgLVuOwAUjDjfn5lnEhYmEI",
  items: [
    {
      kind: "youtube#video",
      etag: "52s0cPF9y3dnUnoxY7kAUMQ9wgg",
      id: "SYq8msTK-7M",
      snippet: {
        publishedAt: "2023-01-14T10:01:00Z",
        channelId: "UCHbT1KmTlkocMT0z5VB4bUg",
        title: "방은 이렇게 꾸몄습니다.",
        description:
          "정신없어 보이지만, 다 질서가 있어요. ^^\n\n#아오니 #방소개 \n\n🌟‍인스타그램 : aonioni_\n🌟‍팬카페 : https://cafe.naver.com/aonioni\n\n[BGM 출처]\n🎵Music provided by 브금대통령\n🎵Track : 나는야 장난꾸러기 - https://youtu.be/MYLjqNApdTE\n🎵Track : 웃기고있네 - https://youtu.be/aY7VLF71pNM\n🎵Track : 귀여운 BGM 모음 2 - https://youtu.be/Gkh-wz-cHyg \n🎵Track : 도둑의 계획 - https://youtu.be/CKuI-6-Izhc\n🎵Track : Chicken Nuggets - https://youtu.be/oh8Urfxn3nE",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/SYq8msTK-7M/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/SYq8msTK-7M/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/SYq8msTK-7M/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/SYq8msTK-7M/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/SYq8msTK-7M/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "아오니 AONI",
        tags: ["방 공개", "아오니", "방 소개", "방꾸", "모동숲"],
        categoryId: "20",
        liveBroadcastContent: "none",
        localized: {
          title: "방은 이렇게 꾸몄습니다.",
          description:
            "정신없어 보이지만, 다 질서가 있어요. ^^\n\n#아오니 #방소개 \n\n🌟‍인스타그램 : aonioni_\n🌟‍팬카페 : https://cafe.naver.com/aonioni\n\n[BGM 출처]\n🎵Music provided by 브금대통령\n🎵Track : 나는야 장난꾸러기 - https://youtu.be/MYLjqNApdTE\n🎵Track : 웃기고있네 - https://youtu.be/aY7VLF71pNM\n🎵Track : 귀여운 BGM 모음 2 - https://youtu.be/Gkh-wz-cHyg \n🎵Track : 도둑의 계획 - https://youtu.be/CKuI-6-Izhc\n🎵Track : Chicken Nuggets - https://youtu.be/oh8Urfxn3nE",
        },
        defaultAudioLanguage: "ko",
      },
      contentDetails: {
        duration: "PT8M58S",
        dimension: "2d",
        definition: "hd",
        caption: "false",
        licensedContent: true,
        contentRating: {},
        projection: "rectangular",
      },
      statistics: {
        viewCount: "275103",
        likeCount: "9067",
        favoriteCount: "0",
        commentCount: "883",
      },
      player: {
        embedHtml:
          '<iframe width="480" height="270" src="//www.youtube.com/embed/SYq8msTK-7M" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
      },
    },
  ],
  pageInfo: { totalResults: 1, resultsPerPage: 1 },
};

const Card = ({ item }: { item: VideoData }) => {
  // const date: number = new Date(item.snippet.publishTime).getTime();
  const videoId = item.id.videoId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await instance.get(
          `/videos?part=snippet&part=contentDetails&part=player&part=statistics&id=${videoId}`,
        );
        localStorage.setItem(`${videoId}`, JSON.stringify(data));
      } catch (e) {
        console.log((e as Error).message);
      }
    };
    //  fetchData();
  }, []);

  // dummy data 로컬에 저장
  localStorage.setItem("videoId", JSON.stringify(dummyData));

  // dummy data 로컬에서 가져오기
  const localDetailData = JSON.parse(localStorage.getItem("videoId") || "");

  return (
    <Wrap>
      <MainImage>
        <Link to={"/watch/" + videoId}>
          <img
            src={item.snippet.thumbnails.medium.url}
            alt="Channel-thumbnails"
          />
        </Link>
        <Duration>
          <span>
            {videoTime(localDetailData.items[0].contentDetails.duration)}
          </span>
        </Duration>
      </MainImage>
      <Info>
        <Image>
          <img src={item.snippet.thumbnails.medium.url} alt="" />
        </Image>
        <Text>
          <Link to={"/watch/" + videoId}>
            <Title>{item.snippet.title}</Title>
          </Link>
          <ChannelTitle>{item.snippet.channelTitle}</ChannelTitle>
          <Detail>
            <ViewCount>
              조회수 {nFormatter(localDetailData.items[0].statistics.viewCount)}
            </ViewCount>
            <Time>
              &nbsp; &middot; {displayedAt(item.snippet.publishTime)}{" "}
            </Time>
          </Detail>
        </Text>
      </Info>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  margin-bottom: 20px;
  padding: 10px;
  box-sizing: border-box;
`;
const MainImage = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 15px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 15px;
  }
`;
const Duration = styled.div`
  z-index: 10;
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 5px;
  font-size: 11px;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 5px;
  margin: 5px;
`;
const Info = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-content: flex-start;
`;
const Text = styled.div`
  width: 75%;
  line-height: 1.2rem;
  font-weight: 500;
  margin-top: 12px;
`;
const Title = styled.p`
  font-size: 1em;
  font-weight: 500;
  margin-bottom: 6px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const ChannelTitle = styled.div`
  font-size: 0.8em;
  color: #606060;
  height: auto;
`;
const Image = styled.div`
  width: 36px;
  height: 36px;
  background-color: skyblue;
  margin: 12px 12px 0 0;
  border-radius: 100px;
  overflow: hidden;
  img {
    height: 36px;
  }
`;
const Detail = styled.div`
  display: flex;
`;
const ViewCount = styled(ChannelTitle)``;
const Time = styled(ChannelTitle)``;

export default Card;

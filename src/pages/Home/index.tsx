import { instance } from "../../api/index";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../../components/Card";
import { mainVideoDummyData } from "../../data/data";

export interface VideoData {
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

const Home = ({ open }: { open: boolean }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(
          "/search?part=snippet&maxResults=10&q={동물의숲}",
        );
        const MovieData = response.data;
        localStorage.setItem("동물의숲", JSON.stringify(response.data));
      } catch (e) {
        console.log((e as Error).message);
      }
    };
    //  fetchData();
  }, []);

  // dummyData 로컬에 저장
  localStorage.setItem("동물의숲", JSON.stringify(mainVideoDummyData));

  // dummyData 로컬에서 가져오기
  const localData = JSON.parse(localStorage.getItem("동물의숲") || "");

  return (
    <Container open={open}>
      {localData.items.map((item: VideoData) => {
        return <Card key={item.id.videoId} item={item} />;
      })}
    </Container>
  );
};

const Container = styled.div<{ open: boolean }>`
  /* flex-wrap: wrap; */
  width: ${(props) => (props.open ? "calc(100% - 240)" : "calc(100% - 72)")}px;
  height: auto;
  padding: 100px 33px 0 33px;
  margin-left: ${(props) => (props.open ? "240" : "72")}px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  @media (max-width: 1450px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
  @media (max-width: 1120px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
`;

export default Home;

import { instance } from "../../api/index";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MainCard from "../../components/home/MainCard";
import { mainVideoDummyData } from "../../data/data";
import { VideoSearchData } from "../../types/videoSearchTypes";
import { getSearchData } from "../../api/api";

const Home = ({ open }: { open: boolean }) => {
  const [videoResult, setVideoResult] = useState(mainVideoDummyData);
  const [isError, setIsError] = useState<string>("");
  const searchWord = "검색어";

  useEffect(() => {
    document.title = "YouTube";
  }, []);

  useEffect(() => {
    getSearchData(searchWord, setVideoResult, setIsError);
  }, [searchWord]);

  // dummyData 로컬에 저장
  localStorage.setItem(
    "mainVideoDummyData",
    JSON.stringify(mainVideoDummyData),
  );

  // dummyData 로컬에서 가져오기
  const localData = JSON.parse(
    localStorage.getItem("mainVideoDummyData") || "",
  );

  return (
    <Container open={open}>
      {localData.items.map((item: VideoSearchData, i: number) => {
        return <MainCard key={item.id.videoId} item={item} i={i} />;
      })}
    </Container>
  );
};

const Container = styled.div<{ open: boolean }>`
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

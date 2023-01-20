import { useEffect, useState } from "react";
import styled from "styled-components";
import { instance } from "../../api";
import { Link } from "react-router-dom";
import { nFormatter } from "../../utils/nFormatter";
import { videoTime } from "../../utils/videoTime";
import { displayedAt } from "../../utils/displayedAt";
import { VideoSearchData } from "../../types/videoSearchTypes";
import { mainVideoDetailDummyData } from "../../data/data";
import { getVideoDetail } from "../../api/api";

const MainCard = ({ item, i }: { item: VideoSearchData; i: number }) => {
  const videoId = item.id.videoId;
  const [videoResult, setVideoResult] = useState(mainVideoDetailDummyData);
  const [isError, setIsError] = useState<string>("");

  useEffect(() => {
    getVideoDetail(videoId, setVideoResult, setIsError);
  }, []);

  // // dummy data 로컬에 저장
  localStorage.setItem(
    "mainVideoDetailDummyData",
    JSON.stringify(mainVideoDetailDummyData),
  );

  // // dummy data 로컬에서 가져오기
  const localDetailData = JSON.parse(
    localStorage.getItem("mainVideoDetailDummyData") || "",
  );

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
            {videoTime(localDetailData[i].items[0].contentDetails.duration)}
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
              조회수{" "}
              {nFormatter(localDetailData[i].items[0].statistics.viewCount)}
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
  z-index: 9;
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
  margin: 12px 12px 0 0;
  border-radius: 100px;
  overflow: hidden;
  position: relative;
  img {
    height: 36px;
    position: absolute;
    left: -15px;
    margin: auto;
  }
`;
const Detail = styled.div`
  display: flex;
`;
const ViewCount = styled(ChannelTitle)``;
const Time = styled(ChannelTitle)``;

export default MainCard;

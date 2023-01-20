import React, { useState, useEffect } from "react";
import { instance } from "../../api";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { displayedAt } from "../../utils/displayedAt";
import { nFormatter } from "../../utils/nFormatter";
import { videoTime } from "../../utils/videoTime";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiListCheck, BiDotsVerticalRounded } from "react-icons/bi";
import { getVideoDetail } from "../../api/api";
import { videoDetailDummyData } from "../../data/data";
import type { RelatedItem } from "../../types/relatedItemType";
import type { Video } from "../../types/relatedCardTypes";

type Props = { item: RelatedItem };

function RelatedCard({ item }: Props) {
  localStorage.setItem("relatedCard", JSON.stringify(item));

  const videoDate: number = new Date(item.snippet.publishTime).getTime();
  const [videoResult, setVideoResult] = useState<Video>(videoDetailDummyData);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>("");
  // useEffect(() => {
  //   // getVideoDetail(item.id.videoId, setVideoResult, setIsError);
  // }, [item]);
  const watchLink = `/watch/${item.id.videoId}`;
  return (
    <Link to={watchLink}>
      <VideoCard
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      >
        <PreviewBox>
          <Thumbnail src={item.snippet.thumbnails.medium.url} />
          <VideoTime>
            {videoTime(videoResult?.items[0]?.contentDetails?.duration || "")}
          </VideoTime>
          {isHovering ? (
            <HoverBox>
              <AiOutlineClockCircle />
              <BiListCheck />
            </HoverBox>
          ) : null}
        </PreviewBox>
        <DetailBox>
          <RelatedTitle>{item.snippet.title}</RelatedTitle>
          {isHovering ? (
            <MoreInfoBtn>
              <BiDotsVerticalRounded />
            </MoreInfoBtn>
          ) : null}
          <RelatedChannel>{item.snippet.channelTitle}</RelatedChannel>
          <InfoBox>
            <p>
              조회수{" "}
              {nFormatter(Number(videoResult?.items[0]?.statistics?.viewCount))}
            </p>
            <InfoDot> • </InfoDot>
            <p>{displayedAt(item.snippet.publishTime)}</p>
          </InfoBox>
        </DetailBox>
      </VideoCard>
    </Link>
  );
}
const PreviewBox = styled.div`
  position: relative;
  width: 160px;
  height: 90px;
  cursor: pointer;
`;
const VideoTime = styled.span`
  position: absolute;
  background-color: #000000c0;
  padding: 4px;
  right: 5px;
  bottom: 5px;
  font-size: 12px;
  border-radius: 3px;
  color: #fff;
`;

const Thumbnail = styled.img`
  width: 100%;
  border-radius: 5px;
`;
const VideoCard = styled.div`
  max-width: 400px;
  min-width: 300px;
  display: flex;
  height: 90px;
  margin-bottom: 10px;
  :hover h3 {
    font-weight: 500;
  }
`;
const RelatedTitle = styled.h3`
  width: 90%;
  font-size: 14px;
  text-overflow: ellipsis;
  font-weight: 400;
  overflow: hidden;
  word-break: break-word;
  line-height: 1.1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  cursor: pointer;
`;
const RelatedChannel = styled.p`
  font-size: 12px;
  font-weight: 300;
  cursor: pointer;
  :hover {
    font-weight: 500;
  }
`;
const DetailBox = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-around;
  width: calc(100% - 160px);
  padding-left: 12px;
`;

const InfoBox = styled.div`
  display: flex;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
`;
const InfoDot = styled.span`
  margin: 0 3px;
`;

const HoverBox = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  gap: 3px;
  top: 5px;
  right: 5px;
  svg {
    font-size: 16px;
    background-color: #000000c0;
    border-radius: 3px;
    padding: 3px;
    color: #fff;
    cursor: pointer;
  }
`;
const MoreInfoBtn = styled.div`
  position: absolute;
  right: 0px;
  top: 5px;
  cursor: pointer;
  svg {
    font-size: 20px;
  }
`;

export default RelatedCard;

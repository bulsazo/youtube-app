import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getComments, getRelated, getVideoDetail } from "../../api/api";
import Comments from "../../components/watch/Comments";
import Description from "../../components/watch/Description";
import MainVideo from "../../components/watch/MainVideo";
import RelatedVideo from "../../components/watch/RelatedVideo";
import {
  commentsDummyData,
  videoDetailDummyData,
  relatedVideoDummyData,
} from "../../data/data";
import type { IComment } from "../../types/commentsTypes";

import { VideoDetailData } from "../../types/videoDetailTypes";
import type { RelatedType } from "../../types/relatedTypes";

interface WatchProps {
  open: boolean;
}

const Watch = ({ open }: WatchProps) => {
  // type assertion
  const { id } = useParams() as { id: string };
  const [videoDetailData, setVideoDetailData] =
    useState<VideoDetailData>(videoDetailDummyData);
  const [comments, setComments] = useState<IComment[]>(commentsDummyData);
  const [isError, setIsError] = useState("");
  const [relatedData, setRelatedData] = useState<RelatedType>(
    relatedVideoDummyData,
  );
  useEffect(() => {
    axios
      .all([
        getVideoDetail(id, setVideoDetailData, setIsError),
        getComments(id, setComments, setIsError),
        getRelated(id, setRelatedData, setIsError),
      ])
      .catch((error) => setIsError(error.message));
  }, [id]);

  useEffect(() => {
    document.title = videoDetailData.items[0].snippet.title;
  });

  return (
    <WatchContainer open={open}>
      <WatchPageWrapper>
        <MainVideo videoDetailData={videoDetailData} />
        <Description channelId={videoDetailData.items[0].snippet.channelId} />
        <Comments comments={comments} />
      </WatchPageWrapper>
      <RelatedVideo relatedData={relatedData} />
    </WatchContainer>
  );
};

const WatchPageWrapper = styled.div`
  width: 1000px;
  min-width: 500px;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;
const WatchContainer = styled.div<{ open: boolean }>`
  display: flex;
  gap: 40px;
  padding: 5rem 3.5rem;
  margin-left: ${(props) => (props.open ? "240" : "0")}px;
  justify-content: center;
  @media screen and (max-width: 1000px) {
    display: block;
  }
`;

export default Watch;

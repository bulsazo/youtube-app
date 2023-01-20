import { useState, useEffect } from "react";
import styled from "styled-components";
import { Search } from "../pages/Search";
import { nFormatter } from "../utils/nFormatter";
import { videoTime } from "../utils/videoTime";
import { Link } from "react-router-dom";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiListCheck, BiDotsVerticalRounded } from "react-icons/bi";
import { displayedAt } from "./../utils/displayedAt";
import { getVideoDetail, getDescription } from "../api/api";

const SearchCard = ({ data }: { data: Search }) => {
  const [videoResult, setVideoResult] = useState<Video>();
  const [channelResult, setChannelResult] = useState<Channel>();
  const [isHovering, setIsHovering] = useState<boolean>(false);
  // const date: number = new Date(data.snippet.publishTime).getTime();
  const [isError, setIsError] = useState<string>("");
  useEffect(() => {
    getVideoDetail(data.id.videoId, setVideoResult, setIsError);
    getDescription(data.snippet.channelId, setChannelResult, setIsError);
  }, [data]);

  // const videoDetail = JSON.parse(localStorage.getItem("video"));

  return (
    <>
      {videoResult && channelResult && videoResult.items.length > 0 ? (
        <Section
          onMouseOver={() => setIsHovering(true)}
          onMouseOut={() => setIsHovering(false)}
        >
          <Card>
            <Video>
              <Link to={`/watch/${data.id.videoId}`}>
                <img src={data.snippet.thumbnails.medium.url} alt="video" />
              </Link>
              <Duration>
                <span>
                  {videoTime(videoResult?.items[0]?.contentDetails?.duration)}
                </span>
              </Duration>
              {isHovering ? (
                <HoverBox>
                  <AiOutlineClockCircle />
                  <BiListCheck />
                </HoverBox>
              ) : (
                ""
              )}
            </Video>
          </Card>
          <Info>
            <TitleBox>
              <Link to={`/watch/${data.id.videoId}`}>
                <Title>{data.snippet.title}</Title>
              </Link>
              {isHovering ? (
                <MoreInfoBtn>
                  <BiDotsVerticalRounded />
                </MoreInfoBtn>
              ) : (
                ""
              )}
            </TitleBox>
            <Views>
              <span>
                조회수{" "}
                {nFormatter(
                  Number(videoResult?.items[0]?.statistics?.viewCount),
                )}
              </span>
              {" • "}
              <span>{displayedAt(data.snippet.publishTime)}</span>
            </Views>
            <Name>
              <img
                src={channelResult?.items[0]?.snippet?.thumbnails?.medium.url}
              ></img>

              <span>{data.snippet.channelTitle}</span>
            </Name>
            <Descript>{data.snippet.description}</Descript>
          </Info>
        </Section>
      ) : null}
    </>
  );
};

const Section = styled.section`
  max-height: 200px;
  padding: 1rem 8rem 0 2rem;
  display: flex;
`;

const Card = styled.div`
  width: 360px;
  height: 200px;
  color: #fff;
  font-size: 15px;
  letter-spacing: 0.2px;
  position: relative;
`;

const Video = styled.div`
  max-width: 100%;
  height: 200px;
  margin-right: 20px;
  cursor: pointer;
  img {
    aspect-ratio: 16 / 9;
    /* width: fit-content; */
    height: 100%;
    border-radius: 10px;
  }
`;

const HoverBox = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  gap: 3px;
  top: 5px;
  right: 5px;
  svg {
    font-size: 22px;
    background-color: #000000c0;
    border-radius: 3px;
    padding: 3px;
    color: #fff;
    cursor: pointer;
  }
`;

const TitleBox = styled.div`
  display: flex;
  align-items: flex-start;
  cursor: pointer;
`;

const MoreInfoBtn = styled.div`
  position: absolute;
  right: 130px;
  cursor: pointer;
  svg {
    font-size: 20px;
  }
`;

const Duration = styled.div`
  padding: 3px 4px;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  bottom: 0;
  right: 5px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 12px;
  margin-bottom: 3px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

const Title = styled.h3`
  margin-bottom: 0.5rem;
  line-height: 150%;
  font-size: 18px;
`;

const Views = styled.div`
  font-size: 12px;
  color: rgb(96, 96, 96);
  cursor: pointer;
`;

const Name = styled(Views)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 0;
  img {
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;

const Descript = styled(Views)``;

export interface Video {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  contentDetails: ContentDetails;
  statistics: Statistics;
  player: Player;
  items: Item[];
}

export interface Item {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  contentDetails: ContentDetails;
  statistics: Statistics;
  player: Player;
}

export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: Localized;
}

export interface Thumbnails {
  default: Default;
  medium: Medium;
  high: High;
  standard: Standard;
  maxres: Maxres;
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

export interface Standard {
  url: string;
  width: number;
  height: number;
}

export interface Maxres {
  url: string;
  width: number;
  height: number;
}

export interface Localized {
  title: string;
  description: string;
}

export interface ContentDetails {
  duration: string;
  dimension: string;
  definition: string;
  caption: string;
  licensedContent: boolean;
  contentRating: ContentRating;
  projection: string;
}

export interface ContentRating {}

export interface Statistics {
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
}

export interface Player {
  embedHtml: string;
}
export interface Channel {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  contentDetails: ContentDetails;
  statistics: Statistics;
  items: Item[];
}

export interface Snippet {
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
  thumbnails: Thumbnails;
  localized: Localized;
  country: string;
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

export interface Localized {
  title: string;
  description: string;
}

export interface ContentDetails {
  relatedPlaylists: RelatedPlaylists;
}

export interface RelatedPlaylists {
  likes: string;
  uploads: string;
}

export interface Statistics {
  viewCount: string;
  subscriberCount: string;
  hiddenSubscriberCount: boolean;
  videoCount: string;
}

export default SearchCard;

import styled from "styled-components";
import { VideoDetailData } from "../../types/videoDetailTypes";
import { displayedAt } from "../../utils/displayedAt";
import { nFormatter } from "../../utils/nFormatter";

interface MainVideoProps {
  videoDetailData: VideoDetailData;
}

const MainVideo = ({ videoDetailData }: MainVideoProps) => {
  const tags = videoDetailData?.items[0]?.snippet?.tags?.map((tag, index) => {
    if (index < 4) return <Tag key={index}>#{tag}</Tag>;
  });

  return (
    <VideoContainer>
      <VideoPlayer>
        <Iframe
          src={`https://www.youtube.com/embed/${videoDetailData?.items[0].id}?autoplay=1&mute=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></Iframe>
      </VideoPlayer>
      <Tags>{tags}</Tags>
      <Title>{videoDetailData?.items[0]?.snippet?.title}</Title>
      <ViewDateInfo>
        {"조회수 "}
        {nFormatter(Number(videoDetailData?.items[0]?.statistics?.viewCount))}
        {"회 "} &nbsp;
        {displayedAt(videoDetailData?.items[0]?.snippet?.publishedAt || "")}
      </ViewDateInfo>
      <ButtonWrapper>
        <LikeContainer>
          <Button>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="25"
              width="25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7v1.819z"></path>
            </svg>
            <span>
              {nFormatter(
                Number(videoDetailData?.items[0].statistics.likeCount),
              ) || ""}
            </span>
          </Button>
          <Button>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="25"
              width="25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 3H6.693A2.01 2.01 0 0 0 4.82 4.298l-2.757 7.351A1 1 0 0 0 2 12v2c0 1.103.897 2 2 2h5.612L8.49 19.367a2.004 2.004 0 0 0 .274 1.802c.376.52.982.831 1.624.831H12c.297 0 .578-.132.769-.36l4.7-5.64H20c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm-8.469 17h-1.145l1.562-4.684A1 1 0 0 0 11 14H4v-1.819L6.693 5H16v9.638L11.531 20zM18 14V5h2l.001 9H18z"></path>
            </svg>
          </Button>
        </LikeContainer>
        <Button>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="25"
            width="25"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M13 14h-2a8.999 8.999 0 0 0-7.968 4.81A10.136 10.136 0 0 1 3 18C3 12.477 7.477 8 13 8V2.5L23.5 11 13 19.5V14zm-2-2h4v3.308L20.321 11 15 6.692V10h-2a7.982 7.982 0 0 0-6.057 2.773A10.988 10.988 0 0 1 11 12z"></path>
            </g>
          </svg>
          <span>공유</span>
        </Button>
        <Button>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="25"
            width="25"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M14 10H3v2h11v-2zm0-4H3v2h11V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM3 16h7v-2H3v2z"></path>
          </svg>
          <span>저장</span>
        </Button>
        <Button>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="25"
            width="25"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M5 16v6H3V3h9.382a1 1 0 0 1 .894.553L14 5h6a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-6.382a1 1 0 0 1-.894-.553L12 16H5zM5 5v9h8.236l1 2H19V7h-6.236l-1-2H5z"></path>
            </g>
          </svg>
        </Button>
      </ButtonWrapper>
    </VideoContainer>
  );
};

const VideoContainer = styled.div`
  border-bottom: 1px solid rgba(90, 90, 90, 0.55);
`;

const VideoPlayer = styled.div`
  position: relative;
  padding-top: 56.25%;
`;

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Tags = styled.div`
  display: flex;
  color: #09f;
  margin-top: 20px;
  font-size: 12px;
`;

const Tag = styled.div`
  margin-right: 0.5rem;
  cursor: pointer;
`;

const Title = styled.div`
  word-break: break-word;
  font-size: 20px;
  font-weight: 600;
  margin: 12px 0;
`;

const ViewDateInfo = styled.div`
  color: #aaaaaa;
  font-size: 14px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  padding: 1.2rem;
  padding-top: 0;
  cursor: pointer;
  span {
    font-weight: 600;
    margin-left: 0.5rem;
  }
`;

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid;
`;

export default MainVideo;

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { instance } from "../../api";
import styled from "styled-components";
import SearchCard from "../../components/SearchCard";
import { getSearchData } from "../../api/api";

const Search = ({ open }: { open: boolean }) => {
  const [result, setResult] = useState<Search[]>([]);
  const [isError, setIsError] = useState<string>("");
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const searchWord = query.get("q") || "";

  useEffect(() => {
    getSearchData(searchWord, setResult, setIsError);
  }, [searchWord]);

  // localStorage.setItem("item", JSON.stringify(result));

  return (
    <Container open={open}>
      <Filter>
        <div className="box">
          <svg
            viewBox="0 0 24 24"
            preserveAspectRatio="xMidYMid meet"
            focusable="false"
            className="style-scope yt-icon"
          >
            <g className="style-scope yt-icon">
              <path
                d="M15,17h6v1h-6V17z M11,17H3v1h8v2h1v-2v-1v-2h-1V17z M14,8h1V6V5V3h-1v2H3v1h11V8z M18,5v1h3V5H18z M6,14h1v-2v-1V9H6v2H3v1 h3V14z M10,12h11v-1H10V12z"
                className="style-scope yt-icon"
              ></path>
            </g>
          </svg>{" "}
          <span>필터</span>
        </div>
      </Filter>
      {result.map((data: Search) => {
        return <SearchCard data={data} key={data.id.videoId}></SearchCard>;
      })}
    </Container>
  );
};

const Container = styled.div<{ open: boolean }>`
  box-sizing: border-box;
  width: ${(props) => (props.open ? "calc(100% - 72)" : "calc(100% - 240)")}px;
  margin-left: ${(props) => (props.open ? "280" : "200")}px;
  padding: 70px 24px 16px 0px;
  overflow-y: hidden;
`;

const Filter = styled.div`
  width: 90%;
  margin-left: 32px;
  font-size: 14px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  .box {
    display: flex;
    align-items: center;
    width: fit-content;
    padding: 7px 10px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 20px;
    }
  }

  svg {
    pointer-events: none;
    display: block;
    width: 24px;
    height: 24px;
    margin-right: 6px;
  }
`;
export interface Search {
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

export default Search;

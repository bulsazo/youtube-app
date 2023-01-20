import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import styled from "styled-components";
import type { ISnippet } from "../../types/commentsTypes";
import { displayedAt } from "../../utils/displayedAt";
import { Profile } from "./Description";

const Comment = ({ comment }: { comment: ISnippet }) => {
  return (
    <CommentList key={comment.authorDisplayName}>
      <Profile>
        <img
          src={comment.authorProfileImageUrl}
          alt={comment.authorDisplayName}
        />
      </Profile>
      <CommentWrapper>
        <StyledComment>
          <Author>{comment.authorDisplayName}</Author>
          <time dateTime={comment.publishedAt}>
            {displayedAt(comment.publishedAt)}
          </time>
        </StyledComment>
        <StyledComment>
          <span>{comment.textOriginal || comment.textDisplay}</span>
        </StyledComment>
        <StyledComment>
          <Btn type="button">
            <AiOutlineLike /> <span>{comment.likeCount}</span>
          </Btn>
          <Btn type="button">
            <AiOutlineDislike />
          </Btn>
          <Reply>답글</Reply>
        </StyledComment>
      </CommentWrapper>
    </CommentList>
  );
};
export default Comment;
const CommentList = styled.li`
  display: flex;
  gap: 1.25rem;
  margin-bottom: 1.25rem;
`;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: 1rem;
  font-weight: 300;
`;

const StyledComment = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  line-height: 1.4;
  font-size: 14px;
  font-weight: 400;

  span {
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 3;
  }

  time {
    font-weight: 400;
    font-size: 12px;
  }
`;

const Author = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Reply = styled.span`
  font-size: 12px;
  font-weight: 500;
`;

const Btn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem;

  span {
    font-size: 12px;
    color: #0f0f0f;

    @media (prefers-color-scheme: dark) {
      color: #f1f1f1;
    }
  }

  svg {
    @media (prefers-color-scheme: dark) {
      color: #f1f1f1;
    }
  }
`;

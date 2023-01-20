import { useEffect, useState } from "react";
import styled from "styled-components";
import { getComments } from "../../api/api";
import { commentsDummyData } from "../../data/data";
import type { CommentsProp, IComment } from "../../types/commentsTypes";
import Comment from "./Comment";

const Comments = ({ comments }: CommentsProp) => {
  const commentsData = comments.map(
    (comment) => comment.snippet.topLevelComment.snippet,
  );

  return (
    <CommentSection>
      <H4>댓글 {commentsData.length}개</H4>
      {
        <ul>
          {commentsData.map((comment) => (
            <Comment comment={comment} key={comment.textDisplay} />
          ))}
        </ul>
      }
    </CommentSection>
  );
};
export default Comments;

const CommentSection = styled.section`
  padding: 1.5rem;
`;

const H4 = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

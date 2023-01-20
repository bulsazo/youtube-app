// 댓글 타입

export interface ISnippet {
  videoId: string;
  textDisplay: string;
  textOriginal: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  authorChannelUrl: string;
  authorChannelId: {
    value: string;
  };
  canRate: boolean;
  viewerRating: string;
  likeCount: number;
  publishedAt: string;
  updatedAt: string;
}

export interface IComment {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    videoId: string;
    topLevelComment: {
      kind: string;
      etag: string;
      id: string;
      snippet: ISnippet;
    };
    canReply: boolean;
    totalReplyCount: number;
    isPublic: boolean;
  };
}

export interface CommentsProp {
  comments: IComment[];
}


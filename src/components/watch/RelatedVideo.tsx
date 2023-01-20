import { useEffect, useState } from "react";
import RelatedCard from "./RelatedCard";
import styled from "styled-components";
import { relatedVideoDummyData } from "../../data/data";
import type { RelatedType } from "../../types/relatedTypes"

type Props = { relatedData: RelatedType };

function RelatedVideo({ relatedData }: Props) {
  return (
    <RelatedList>
      {relatedData?.map((item: any) => (
        <RelatedCard key={item.id.videoId} item={item} />
      ))}
    </RelatedList>
  );
}

const RelatedList = styled.div`
  max-width: 400px;
`;

export default RelatedVideo;

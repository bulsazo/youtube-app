import { useEffect, useState } from "react";
import styled from "styled-components";
import { getDescription } from "../../api/api";
import { descriptionDummyData } from "../../data/data";
import type {
  IDescription,
  IDescriptionProps,
} from "../../types/descriptionTypes";
import { nFormatter } from "../../utils/nFormatter";

const Description = ({ channelId }: IDescriptionProps) => {
  const [isError, setIsError] = useState<string>("");

  const [description, setDescription] =
    useState<IDescription>(descriptionDummyData);

  useEffect(() => {
    getDescription(channelId, setDescription, setIsError);
  }, [channelId]);

  const desc = description?.items[0];

  return (
    <DescContainer>
      <div>
        <ProfileWrapper>
          <Profile>
            <img src={desc?.snippet.thumbnails.default.url} alt="avatar" />
          </Profile>
          <div>
            <h4>{desc?.snippet.title}</h4>
            <Follower>
              구독자 {nFormatter(Number(desc?.statistics.subscriberCount))}
            </Follower>
          </div>
        </ProfileWrapper>
        <DescWrapper>
          <Desc>{desc?.snippet.description}</Desc>
        </DescWrapper>
      </div>
      <SubscribeWrapper>
        <Subscribe>구독하기</Subscribe>
      </SubscribeWrapper>
    </DescContainer>
  );
};
export default Description;

const DescContainer = styled.section`
  position: relative;
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid rgba(90, 90, 90, 0.55);
  padding: 1.5rem;
`;

const ProfileWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const Profile = styled.div`
  border-radius: 50%;
  width: 32px;
  height: 32px;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DescWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h4 {
    font-weight: 600;
    line-height: 1.4;
  }
`;

const Follower = styled.p`
  font-size: 0.875rem;
  color: gray;
  margin-top: 0.25rem;
`;

const Desc = styled.p`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.4;
`;

const SubscribeWrapper = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
`;

const Subscribe = styled.button`
  padding: 10px 15px;
  background-color: red;
  color: #fff;
  font-weight: 700;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
`;

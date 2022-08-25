import { useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import Line from "../../../components/utilities/Line";
import { FEEDS } from "../../../graphql/feed";
import { useJwt } from "../../../hooks/useJwt";
import CreatePost from "./post/CreatePost";
import Feed from "./Feed";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

function Feeds() {
  const { sub } = useJwt();
  const { loading, data, fetchMore } = useQuery(FEEDS, {
    variables: {
      userId: sub,
      offset: 0,
      limit: 10,
    },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <Wrapper>
      <CreatePost />
      <Line />
      {data && (
        <Feed
          entries={data.postFeeds}
          onLoadMore={() =>
            fetchMore({ variables: { offset: data.postFeeds.length } })
          }
        />
      )}
      {loading && <>Loading</>}
    </Wrapper>
  );
}

export default Feeds;

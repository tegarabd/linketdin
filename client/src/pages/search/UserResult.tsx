import { useQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Content from "../../components/utilities/Content";
import { SEARCH_USER } from "../../graphql/user";
import { User } from "../../types/user";
import ProfileCard from "../mynetwork/main/ProfileCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
`;

function UserResult() {
  const [searchParams] = useSearchParams();
  const { data } = useQuery(SEARCH_USER, {
    variables: {
      query: searchParams.get("query"),
      limit: 8,
      offset: 0,
    },
  });

  return (
    <Content>
      <h3>People</h3>
      <Grid>
        {data &&
          data.searchUser.map((user: User) => (
            <ProfileCard
              key={user.id}
              user={user}
            />
          ))}
      </Grid>
    </Content>
  );
}

export default UserResult;

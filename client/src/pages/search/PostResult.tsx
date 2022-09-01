import { useQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import Content from "../../components/utilities/Content";
import { SEARCH_POST } from "../../graphql/post";
import { Post as PostType } from "../../types/post";
import Post from "../feed/feed/post/Post";

function PostResult() {
  const [searchParams] = useSearchParams();
  const { data } = useQuery(SEARCH_POST, {
    variables: {
      query: searchParams.get("query"),
      limit: 5,
      offset: 0,
    },
  });

  return (
    <Content>
      <h3>Post</h3>
      {data &&
        data.searchPost.map((post: PostType) => (
          <Post
            key={post.id}
            post={post}
          />
        ))}
    </Content>
  );
}

export default PostResult;

import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import ProfileName from "../../components/profile/ProfileName";
import { USER_PROFILE, USER_THREADS } from "../../graphql/user";
import { useJwt } from "../../hooks/useJwt";
import { Thread } from "../../types/thread";

function Item({ thread }: { thread: Thread }) {
  const { sub } = useJwt();
  const receiverId = thread.user.id === sub ? thread.with.id : thread.user.id;
  const { data } = useQuery(USER_PROFILE, { variables: { id: receiverId } });

  return (
    <Link to={`thread/${thread.id}`}>
      {data && <ProfileName user={data.user} />}
    </Link>
  );
}

function Threads() {
  const { sub } = useJwt();
  const { data } = useQuery(USER_THREADS, { variables: { id: sub } });

  return (
    <div>
      <h3>Messaging</h3>
      {data &&
        data.user.threads.map((thread: Thread) => (
          <Item
            key={thread.id}
            thread={thread}
          />
        ))}
    </div>
  );
}

export default Threads;

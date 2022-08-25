import { useEffect } from "react";
import Post from "./post/Post";

function Feed({
  entries,
  onLoadMore,
}: {
  entries: Array<any>;
  onLoadMore: VoidFunction;
}) {
  useEffect(() => {
    const onScroll: EventListener = (event: Event) => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        onLoadMore();
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {entries.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}

export default Feed;

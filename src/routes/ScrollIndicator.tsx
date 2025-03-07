/*
1. Create a navbar scroll indicator such that when the user scrolls through the page, the scroll bar shows the progress of the user's scroll.
*/

import { memo, useCallback, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

interface Post {
  id: number;
  body: string;
  title: string;
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = memo(({ posts }) => {
  return (
    <ul role='postslist' aria-label='post list'>
      {posts?.map((post) => {
        return (
          <li key={post.id} className='list-disc' role='post' aria-label='post'>
            {post.title}
          </li>
        );
      })}
    </ul>
  );
});

const ScrollIndicator: React.FC = memo(() => {
  const [scrollPercent, setScrollPercent] = useState<number>();
  const { data, isLoading } = useFetch<Post[]>("https://jsonplaceholder.typicode.com/posts");

  const handleScroll = useCallback(() => {
    const scrolled = document.body.scrollTop || document.documentElement.scrollTop;

    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    setScrollPercent((scrolled / height) * 100);
  }, [data, scrollPercent, setScrollPercent]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className='flex flex-col justify-center items-center gap-6'>
      <nav className='w-full bg-white border h-4 flex items-start sticky top-0 z-10 flex-col'>
        <div className={`h-full   bg-green-500`} style={{ width: `${scrollPercent}%` }}></div>
      </nav>

      <h1 className='heading-2'>Scroll Indicator</h1>

      {isLoading ? <p>Loading...</p> : data && <PostList posts={data} />}
    </div>
  );
});

PostList.displayName = "PostList";
ScrollIndicator.displayName = "ScrollIndicator";

export default ScrollIndicator;

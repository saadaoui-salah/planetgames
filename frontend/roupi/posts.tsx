"use client";
import { useEffect, useState } from "react";
import { useGET } from "./utils";

interface Post {
  id: number,
  description: string,
  media: string,
  is_video: boolean,
  created_at: string
}

interface PostsResponse {
  count:number,
  next: string | null,
  previous: string | null,
  results: Post[],
}

export const useGetPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    useGET('post/posts/', {}).then((res: PostsResponse) => {
      if (res.results) {
        setPosts(res.results);
      }
      setLoading(false);
    });
  }, []);
  return { posts, loading };
};

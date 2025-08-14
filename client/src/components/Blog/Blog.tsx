"use client";
import { use } from "react";

export function Blog({ blog, }: {
  blog: Promise<[] | {
    [key: string]: string | number;
  }>
}) {
  const blogContent = use(blog);

  if (!Array.isArray(blogContent)) {
    return (
      <div className="blog-container mt-8 flex flex-col gap-3 items-center w-full max-w-4xl mx-auto px-4">
        <p className="text-gray-400">{new Date(blogContent.publishedAt).toLocaleDateString()}</p>
        <p className="text-3xl text-center">{blogContent.Title}</p>
        <div className="blog-content text-lg md:text-2xl mt-5" dangerouslySetInnerHTML={{__html: blogContent.Content}}></div>
      </div>
    );
  }

  return <div className="text-center text-gray-500">No blogs available.</div>;
}

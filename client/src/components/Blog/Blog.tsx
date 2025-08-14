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
      <div className="blog-container mt-8 flex flex-col gap-4 items-center w-full max-w-4xl mx-auto px-2">
        <p>{new Date(blogContent.publishedAt).toLocaleDateString()}</p>
        <p>{blogContent.Title}</p>
        <div className="blog-content" dangerouslySetInnerHTML={{__html: blogContent.Content}}></div>
      </div>
    );
  }

  return <div className="text-center text-gray-500">No blogs available.</div>;
}

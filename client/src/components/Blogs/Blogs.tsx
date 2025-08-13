"use client";
import { use } from "react";

export function Blogs({ blogs, }: {
  blogs: Promise<[] | {
    [key: string]: string | number;
  }[]>
}) {
  const allBlogs = use(blogs);

  if (allBlogs.length === 0) {
    return <div className="text-center text-gray-500">No blogs available.</div>;
  }

  return <div className="blogs-container mt-8 flex flex-col gap-4 items-center w-full max-w-4xl mx-auto px-2">
    {
      allBlogs.map((blog, index) => (
        <div key={index} className="w-full max-w-full blog-tile p-3 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
          <p className="text-sm text-gray-400 mb-4">{new Date(blog.publishedAt).toLocaleDateString()}</p>
          <h2 className="text-xl font-bold text-white mb-2 text-center break-words">{blog.Title}</h2>
          <p className="text-gray-200 line-clamp-3 max-w-full">{(blog.Content as string).substring(0, 500) + "...."}</p>
          <a
            href="#"
            className="mt-4 text-blue-400 hover:underline border rounded px-2 py-1 border-blue-200"
          >
            Read more
          </a>
        </div>
      ))}
  </div>

}

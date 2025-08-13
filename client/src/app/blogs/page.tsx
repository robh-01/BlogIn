import Image from "next/image";
import { Dancing_Script } from "next/font/google";

const dancing_script = Dancing_Script({
  weight: "variable",
  subsets: ["latin"]
})

import { Suspense } from "react";

import styles from './blogs.module.css';

import { Blogs } from "@/components/Blogs/Blogs";

import { getBlogs } from "@/lib/blog";

export default function BlogsPage() {
  const blogs = getBlogs();

  return (
    <div
      className={
        styles["blogs-page"] +
        " w-full text-white min-h-screen flex flex-col items-center px-4"
      }
    >
      <div className="author-intro-container flex flex-col items-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={60}
            height={60}
            className="
            w-10
            h-10"
          />
          <p
            className={
              dancing_script.className + " text-2xl font-black text-white"
            }
          >
            BlogIn
          </p>
        </div>
        <div className="text-center">
          Made by robh. Yup, that&apos;s me. I am a CS student trying to learn a
          lot of things &quot;one at a time&quot;, ofc. I also try to stay
          up-to-date with JS mushrooms. checkout my{" "}
          <a
            href="https://github.com/robh-01"
            target="_blank"
            className="text-blue-300 underline"
          >
            github.
          </a>
        </div>
        <hr className="w-3xs" />
      </div>
      <Suspense fallback={<div className="loading">Loading blogs...</div>}>
        <Blogs blogs={blogs} />
      </Suspense>
    </div>
  );
} 

import Image from 'next/image';

import { getBlog } from '@/lib/blog';
import styles from '../blogs.module.css';
import { Suspense } from 'react';
import { Blog } from '@/components/Blog/Blog';

export default function BlogPage({ params }: { params: { blogid: string } }) {
  const blog = getBlog(params.blogid);

  return <div className={styles["blogs-page"] + " w-full text-white py-0.5"}>

    <div className="author-intro-container flex flex-col items-center gap-4 mt-4">
      <Image
        src="/images/author-image.jpeg"
        alt="Logo"
        width={60}
        height={60}
        className="
            w-20
            h-20 rounded-full"
      />
      <p className="text-center">
        Roshan Bhusal (robh-01)
      </p>
      <hr className="w-3xs" />
    </div>
    <Suspense fallback={<div className="loading">Loading blog...</div>}>
      <Blog blog={blog} />
    </Suspense>
  </div>;
}

import { remark } from 'remark';
import html from 'remark-html';

export async function getBlogs(): Promise<[] | {
  [key: string]: string | number;
}[]> {
  try {
    console.log("🔍 Fetching blogs from Strapi...");
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}/api/blogs?sort=publishedAt:desc`);


    if (!res.ok) {
      const errorText = await res.text();
      console.log("❌ Failed to fetch blogs. Error response:", errorText);
      return [];
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log("❌ Exception during fetching blogs:", error);
    return [];
  }
}

export async function getBlog(blogId: string): Promise<[] | {
  [key: string]: string | number;
}> {
  try {
    console.log("🔍 Fetching blog from Strapi...");
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}/api/blogs/${blogId}`);


    if (!res.ok) {
      const errorText = await res.text();
      console.log("❌ Failed to fetch blogs. Error response:", errorText);
      return [];
    }

    const data = await res.json();
    const processedBlogContent = await remark().use(html).process(data.data.Content);
    const blogContentHtml = processedBlogContent.toString();
    const processedData = { ...data.data, Content: blogContentHtml };

    console.log(processedData);
    return processedData;
  } catch (error) {
    console.log("❌ Exception during fetching blogs:", error);
    return [];
  }
}

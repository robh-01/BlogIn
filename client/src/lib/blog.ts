export async function getBlogs(): Promise<[] | {
  [key: string]: string | number;
}[]> {
  try {
    console.log("🔍 Fetching blogs from Strapi...");
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}/api/blogs`);


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

// src/lib/auth.

interface StrapiUser {
  id: number;
  username: string;
  email: string;
  // Add any other fields your Strapi user returns
  [key: string]: unknown;
}

export async function verifyUser(): Promise<StrapiUser | null> {
  const jwt = localStorage.getItem("authentication_token");

  if (!jwt) {
    console.log("❌ No JWT found in cookies");
    return null;
  }

  try {
    console.log("🔍 Verifying JWT with Strapi...");
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      cache: "no-store",
    });

    console.log("Strapi verification response status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.log("❌ Failed to verify user. Status:", res.status);
      console.log("❌ Error response:", errorText);
      return null;
    }

    const user = await res.json();
    console.log("✅ User verified successfully:", user);
    return user;
  } catch (error) {
    console.log("❌ Exception during user verification:", error);
    return null;
  }
}


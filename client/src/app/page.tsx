"use client";
import { verifyUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    (async () => {

      const user = await verifyUser();

      if (user) {
        redirect("/blogs");
      } else {
        redirect("/login");
      }
    })();
  }, []);

  return null;
}
